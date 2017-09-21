import Immutable from 'immutable';
import fields from './db/fields.json';

import {
    THROW_DICE,
    PAY_PLAYER,
    PAY_BANK,
    BUY_CARD,
    BUY_TOKENS,
    END_TURN,
    START_BET,
    payBank,
    payPlayer
} from './actions';

import {
    STATE_BEFORE_THROW,
    STATE_AFTER_THROW,
    STATE_BEFORE_PAYMENT,
    STATE_AFTER_PAYMENT,
    STATE_BETTING_SELECT
} from './states';

import { getRandomThrow, getOwner, countPayAmount } from '../utils/utils';
import initialState from "./initialState";

/**
 * Checks action which should be triggered based on field type.
 *
 * @param {Object} state current state.
 * @param {Object} player target player.
 * @param {Object} field field which triggers the action.
 * @param {Number} distanceCovered number of fields travelled on last turn.
 *
 * @return {Object}
 */
function resolveActionRequired (state, player, field, distanceCovered = 0) {

    const claimable = ['HORSE', 'TRAINER', 'STABLES', 'TRANSPORT'];
    if (claimable.indexOf(field.get('type')) !== -1) {
        const owner = getOwner(field, state.get('players'));
        if (owner && owner.get('index') !== player.get('index')) {
            return payPlayer(countPayAmount(field, owner), player, owner, field, distanceCovered);
        }
    }

    if (field.get('type') === 'VET') {
        if (field.get('id') == 5) {
            return payBank(500, player, field);
        }
        if (field.get('id') == 39) {
            return payBank(1000, player, field);
        }
    }

}

export const gameStateReducer = function (state = initialState, action) {
    return state
};

export const playerActionsReducer = function (state = initialState, action) {

    switch (action.type) {

        case THROW_DICE: {

            const currentPlayer = state.getIn(['players', state.get('playerOnTurn')]);
            const currentPosition = currentPlayer.get('field');
            let money = currentPlayer.get('money');
            let parkingMoney = state.get('parkingMoney');
            let distancRounds = currentPlayer.get('distancRounds') || 0;
            let stoppedRounds = currentPlayer.get('stoppedRounds') || 0;
            let dopingRounds = currentPlayer.get('dopingRounds') || 0;
            let logs = [];
            let number1 = 0;
            let number2 = 0;
            let number3 = 0;

            // get throw results
            const throws = state.get('diceThrows').toJS();
            number1 = getRandomThrow();
            throws.push(number1);
            logs.push({
                type: 'throw',
                player: currentPlayer,
                roll: number1
            });
            if (number1 === 6) {
                number2 = getRandomThrow();
                throws.push(number2);
                logs.push({
                    type: 'throw',
                    player: currentPlayer,
                    roll: number2
                });
            }

            let newPosition;
            if (currentPosition === 10 && distancRounds > 0) {
                // DISTANCE
                if (number1 !== 6) {
                    newPosition = currentPosition;
                    distancRounds--;
                    logs.push(`Stopped for next ${distancRounds} rounds.`);
                } else {
                    logs.push(`Distance cleared!`);
                    if (number2 === 6) {
                        number3 = getRandomThrow();
                        logs.push({
                            type: 'throw',
                            player: currentPlayer,
                            roll: number3
                        });
                        if (number3 === 6) {
                            newPosition = currentPosition;
                            distancRounds = 3;
                            logs.push(`DISTANCE!`);
                        } else {
                            newPosition = currentPosition + number2 + number3;
                        }
                    } else {
                        newPosition = currentPosition + number2;
                    }
                }
            } else {
                if (number1 === 6 && number2 === 6) {
                    newPosition = 10;
                    distancRounds = 3;
                } else {
                    newPosition = currentPosition + number1 + number2;
                }
            }

            if (newPosition === 10 && currentPlayer.get('field') !== 10) {
                logs.push(`DISTANCE!`);
                distancRounds = 3;
            }

            if (newPosition >= 40) {
                newPosition -= 40;
                money += 4000;
                logs.push({
                    type: 'crossStart',
                    player: currentPlayer
                });
            }

            const field = state.getIn(['fields', newPosition]);
            const distanceCovered = number3 ? number2 + number3 : number1 + number2;
            let actionRequired = resolveActionRequired(state, currentPlayer, field, distanceCovered);


            if (field.get('type') === 'PARKING') {
                money += parkingMoney;
                logs.push({
                    type: 'parkingIncome',
                    player: state.getIn(['players', state.get('playerOnTurn')]),
                    amount: parkingMoney
                });
                parkingMoney = 0;
            }

            if (field.get('type') === 'FINANCES') {
                console.warn('FINANCES TODO');
                // @todo
            }

            if (field.get('type') === 'FORTUNE') {
                console.warn('FORTUNE TODO');
                // @todo
            }

            if (field.get('type') === 'DOPING') {
                dopingRounds = 1;
                logs.push(`You're stopped for 1 round.`);
            }

            return state.withMutations(state => {
                // movement
                state
                    .set('diceThrows', Immutable.fromJS(throws))
                    .setIn(['currentRound', 'state'], STATE_AFTER_THROW)
                    .setIn(['currentRound', 'actionRequired'], actionRequired ? Immutable.fromJS(actionRequired) : null)
                    .setIn(['currentRound', 'rolls'], Immutable.fromJS([number1, number2, number3]))
                    .setIn(['players', state.get('playerOnTurn'), 'field'], newPosition)
                    .setIn(['players', state.get('playerOnTurn'), 'money'], money)
                    .setIn(['players', state.get('playerOnTurn'), 'distancRounds'], distancRounds)
                    .setIn(['players', state.get('playerOnTurn'), 'dopingRounds'], dopingRounds)
                    .setIn(['players', state.get('playerOnTurn'), 'stoppedRounds'], stoppedRounds)
                    .set('parkingMoney', parkingMoney)
                ;

                // write logs
                for (let i = 0; i < logs.length; i++) {
                    state.set('log', state.get('log').push(Immutable.fromJS(logs[i])));
                }
            });
        }

        case PAY_BANK: {
            return state.withMutations(state => {
                const player = state.getIn(['players', action.from.index]);
                const info = Immutable.fromJS({
                    type: 'PLAYER_TO_BANK',
                    from: player,
                    amount: action.amount
                });
                const log = Immutable.fromJS({
                    type: 'pay',
                    player: player,
                    amount: action.amount,
                    reason: 'VET'
                });
                const pathToInfo = ['currentRound', 'floatingInfo'];
                state
                    .set('parkingMoney', state.get('parkingMoney') + action.amount)
                    .setIn(['currentRound', 'state'], STATE_AFTER_PAYMENT)
                    .setIn(['currentRound', 'actionRequired'], null)
                    .setIn(pathToInfo, state.getIn(pathToInfo).push(log))
                    .setIn(['players', player.get('index'), 'money'], (player.get('money') - action.amount))
                    .set('log', state.get('log').push(log))
                ;
            });
        }

        case PAY_PLAYER: {
            return state.withMutations(state => {
                const from = state.getIn(['players', action.from.index]);
                const to = state.getIn(['players', action.to.index]);
                const log = Immutable.fromJS({
                    type: 'payVisit',
                    who: from,
                    to: to,
                    what: '@TODO',
                    amount: action.amount
                });
                state
                    .setIn(['currentRound', 'state'], STATE_AFTER_PAYMENT)
                    .setIn(['currentRound', 'actionRequired'], null)
                    .setIn(['players', from.get('index'), 'money'], (from.get('money') - action.amount))
                    .setIn(['players', to.get('index'), 'money'], (to.get('money') + action.amount))
                    .set('log', state.get('log').push(log))
                ;
            });
        }

        case END_TURN: {

            const logs = [];
            let playerResolved = false;
            let nextPlayerIndex = state.get('playerOnTurn');
            let nextPlayer;
            while (!playerResolved) {
                nextPlayerIndex++;
                if (nextPlayerIndex >= state.get('players').size) {
                    nextPlayerIndex = 0;
                }
                nextPlayer = state.getIn(['players', nextPlayerIndex]);
                let dopingRounds = nextPlayer.get('dopingRounds');
                if (dopingRounds > 0) {
                    logs.push(`Player ${nextPlayer.get('name')} stopped due to doping.`);
                    state = state.setIn(['players', nextPlayerIndex, 'dopingRounds'], --dopingRounds);
                } else {
                    playerResolved = true;
                    logs.push({
                        type: 'turnStarted',
                        player: nextPlayer
                    })
                }
            }

            return state.withMutations(state => {
                state
                    .setIn(['currentRound', 'rolls'], Immutable.fromJS([]))
                    .setIn(['currentRound', 'state'], STATE_BEFORE_THROW)
                    .setIn(['currentRound', 'actionRequired'], null)
                    .setIn(['currentRound', 'floatingInfo'], new Immutable.List())
                    .set('playerOnTurn', nextPlayerIndex)
                ;
                // write logs
                for (let i = 0; i < logs.length; i++) {
                    state.set('log', state.get('log').push(Immutable.fromJS(logs[i])));
                }
            });
        }

        case BUY_CARD: {

            // check if possible (ownership, money, ...)
            // @todo

            // assume it is
            const fieldId = parseInt(action.fieldIndex, 10);
            const currentPlayer = state.getIn(['players', action.playerIndex]);
            const cardInfo = state.get('fields').find(field => {
                return parseInt(field.get('id'), 10) === fieldId;
            });

            let withdraw;
            switch (cardInfo.get('type')) {
                case 'HORSE':
                    withdraw = cardInfo.getIn(['horse', 'initialPrice']);
                    break;
                case 'TRAINER':
                    withdraw = 4000;
                    break;
                case 'TRANSPORT':
                case 'STABLES':
                    withdraw = 3000;
                    break;
            }
            const newMoneyAmount = (currentPlayer.get('money') - withdraw);

            const log = {
                type: 'buy',
                player: currentPlayer,
                what: cardInfo,
                amount: withdraw
            };

            return state.withMutations(state => {
                const inventory = state.getIn(['players', action.playerIndex, 'inventory']);
                state
                    .set('log', state.get('log').push(Immutable.fromJS(log)))
                    .setIn(['players', action.playerIndex, 'money'], newMoneyAmount)
                    .setIn(['players', action.playerIndex, 'inventory'], inventory.push(fieldId))
                ;
            });
        }

        case BUY_TOKENS: {

            const cardInfo = state.get('fields').find(field => {
                return field.get('id') === action.fieldIndex;
            });

            const pathPoints = ['players', action.playerIndex, 'racingPoints', action.fieldIndex];
            const pathMoney = ['players', action.playerIndex, 'money'];
            const tokensBefore = state.getIn(pathPoints, 0);
            const moneyBefore = state.getIn(pathMoney);

            return state.withMutations(state => {
                state
                    .setIn(pathPoints, tokensBefore + action.tokensCount)
                    .setIn(pathMoney, (moneyBefore - (action.tokensCount * cardInfo.getIn(['horse', 'racingCost']))))
                ;
            });
        }

        case START_BET: {
            return state.setIn(['currentRound', 'state'], STATE_BETTING_SELECT);
        }
    }

    return state;
};
