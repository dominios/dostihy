import Immutable from 'immutable';
import { fields } from './db/fields';
import { financeCards, fortuneCards } from '../data/db/actionCards';

import {
    THROW_DICE,
    PAY_PLAYER,
    PAY_BANK,
    BUY_CARD,
    BUY_TOKENS,
    END_TURN,
    START_BET,
    CHOOSE_HORSE_BET,
    CONFIRM_BET,
    payBank,
    payPlayer
} from './actions';

import {
    STATE_BEFORE_THROW,
    STATE_AFTER_THROW,
    STATE_AFTER_PAYMENT,
    STATE_BETTING_CHOOSE, STATE_BETTING_BET
} from './states';

import { getRandomThrow, getOwner, countPayAmount, getPlayersRacingPointsCount } from '../utils/utils';
import initialState from "./initialState";
import { TYPE_FINANCE, TYPE_FORTUNE, TYPE_PARKING } from "../utils/constants";

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
            return payPlayer(countPayAmount(field, owner, state.getIn(['currentRound', 'bets']), distanceCovered), player, owner, field);
        }
    }

    if (field.get('type') === 'VET') {
        if (+field.get('id') === 5) {
            return payBank(500, player, field);
        }
        if (+field.get('id') === 39) {
            return payBank(1000, player, field);
        }
    }

}

export const gameStateReducer = function (state = initialState, action) {
    return state
};

export const playerActionsReducer = function (state = initialState, action) {

    let newState;

    switch (action.type) {

        case THROW_DICE: {

            const currentPlayer = state.getIn(['players', state.get('playerOnTurn')]);
            const currentPosition = currentPlayer.get('field');
            const bets = state.getIn(['currentRound', 'bets']);
            let money = currentPlayer.get('money');
            let parkingMoney = state.get('parkingMoney');
            let distancRounds = currentPlayer.get('distancRounds') || 0;
            let stoppedRounds = currentPlayer.get('stoppedRounds') || 0;
            let dopingRounds = currentPlayer.get('dopingRounds') || 0;
            let logs = [];
            let number1 = 0;
            let number2 = 0;
            let number3 = 0;
            let financeCardPointer = state.get('currentFinanceCardPointer');
            let fortuneCardPointer = state.get('currentFortuneCardPointer');

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
            const actionRequired = resolveActionRequired(state, currentPlayer, field, distanceCovered);

            const betIncomes = {};
            if (bets.size) {
                const missedBets = bets.filter(bet => {
                    return bet.getIn(['horse', 'id']) !== field.get('id')
                });
                missedBets.forEach(missed => {
                    const owner = getOwner(missed.get('horse'), state.get('players'));
                    const key = owner.get('index');
                    if (!betIncomes.hasOwnProperty(key)) {
                        betIncomes[key] = 0;
                    }
                    betIncomes[key] += missed.get('amount');
                });
            }

            if (field.get('type') === TYPE_PARKING) {
                money += parkingMoney;
                logs.push({
                    type: 'parkingIncome',
                    player: state.getIn(['players', state.get('playerOnTurn')]),
                    amount: parkingMoney
                });
                parkingMoney = 0;
            }

            if (field.get('type') === TYPE_FINANCE) {

                const cardId = state.getIn(['financeCards', financeCardPointer]);
                const cardInfo = financeCards[cardId];
                const racingPointsCount = getPlayersRacingPointsCount(currentPlayer);
                logs.push(cardInfo.text);

                switch (cardId) {
                    case 3:
                        const sum = racingPointsCount.standard + racingPointsCount.mainCount;
                        const payment3 = sum * cardInfo.balance;
                        money += payment3;
                        parkingMoney += (sum * (payment3 * -1));
                        logs.push({
                            type: 'finance3',
                            who: currentPlayer,
                            amount: payment3,
                            count: sum
                        });
                        break;
                    case 5:
                        money += (state.get('players').size - 1) * 200;
                        state.get('players').forEach(player => {
                            if (player !== currentPlayer) {
                                logs.push({
                                    type: 'finance5',
                                    who: player,
                                    to: currentPlayer
                                });
                            }
                        });
                        break;
                    case 9:
                        const payment9 = racingPointsCount.standard * cardInfo.balance[0] + racingPointsCount.mainCount * cardInfo.balance[1];
                        money += payment9;
                        parkingMoney += (payment9 * -1);
                        logs.push({
                            type: 'finance9',
                            who: currentPlayer,
                            amount: payment9,
                            countStandard: racingPointsCount.standard,
                            countMain: racingPointsCount.mainCount
                        });
                        break;
                    default:
                        money += cardInfo.balance;
                        if (cardInfo.balance < 0) {
                            parkingMoney += cardInfo.balance * -1;
                        }
                        logs.push({
                            type: 'finance',
                            who: currentPlayer,
                            amount: cardInfo.balance
                        });
                        break;
                }

                financeCardPointer++;
            }

            if (field.get('type') === TYPE_FORTUNE) {
                console.warn('FORTUNE TODO');
                // @todo
            }

            if (field.get('type') === 'DOPING') {
                dopingRounds = 1;
                logs.push(`You're stopped for 1 round.`);
            }

            newState = state.withMutations(state => {
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
                    .set('currentFinanceCardPointer', financeCardPointer)
                    .set('currentFortuneCardPointer', fortuneCardPointer)
                ;

                // incomes for missed bets
                Object.entries(betIncomes).forEach(income => {
                    const playerMoneyPath = ['players', income[0], 'money'];
                    state.setIn(playerMoneyPath, state.getIn(playerMoneyPath) + income[1]);
                    logs.push({
                        type: 'missedBet',
                        who: state.getIn(['players', income[0]]),
                        amount: income[1]
                    });
                });

                // write logs
                for (let i = 0; i < logs.length; i++) {
                    state.set('log', state.get('log').push(Immutable.fromJS(logs[i])));
                }
            });
            break;
        }

        case PAY_BANK: {
            newState = state.withMutations(state => {
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
            break;
        }

        case PAY_PLAYER: {
            newState = state.withMutations(state => {
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
            break;
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
                    });
                }
            }

            newState = state.withMutations(state => {
                state
                    .setIn(['currentRound', 'rolls'], Immutable.fromJS([]))
                    .setIn(['currentRound', 'state'], STATE_BEFORE_THROW)
                    .setIn(['currentRound', 'actionRequired'], null)
                    .setIn(['currentRound', 'floatingInfo'], new Immutable.List())
                    .setIn(['currentRound', 'bets'], new Immutable.Map())
                    .set('playerOnTurn', nextPlayerIndex)
                ;
                // write logs
                for (let i = 0; i < logs.length; i++) {
                    state.set('log', state.get('log').push(Immutable.fromJS(logs[i])));
                }
            });
            break;
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

            newState = state.withMutations(state => {
                const inventory = state.getIn(['players', action.playerIndex, 'inventory']);
                state
                    .set('log', state.get('log').push(Immutable.fromJS(log)))
                    .setIn(['players', action.playerIndex, 'money'], newMoneyAmount)
                    .setIn(['players', action.playerIndex, 'inventory'], inventory.push(fieldId))
                ;
            });
            break;
        }

        case BUY_TOKENS: {

            const cardInfo = state.get('fields').find(field => {
                return field.get('id') === action.fieldIndex;
            });

            const pathPoints = ['players', action.playerIndex, 'racingPoints', action.fieldIndex];
            const pathMoney = ['players', action.playerIndex, 'money'];
            const tokensBefore = state.getIn(pathPoints, 0);
            const moneyBefore = state.getIn(pathMoney);

            newState = state.withMutations(state => {
                state
                    .setIn(pathPoints, tokensBefore + action.tokensCount)
                    .setIn(pathMoney, (moneyBefore - (action.tokensCount * cardInfo.getIn(['horse', 'racingCost']))))
                ;
            });
            break;
        }

        case START_BET: {
            newState = state.setIn(['currentRound', 'state'], STATE_BETTING_CHOOSE);
            break;
        }

        case CHOOSE_HORSE_BET: {
            newState = state.withMutations(state => {
                state
                    .setIn(['currentRound', 'state'], STATE_BETTING_BET)
                    .setIn(['currentRound', 'bets', action.horse.get('id'), 'status'], 'IN_PROCESS')
                    .setIn(['currentRound', 'bets', action.horse.get('id'), 'horse'], action.horse)
                ;
            });
            break;
        }

        case CONFIRM_BET: {
            const player = state.getIn(['players', state.get('playerOnTurn')]);
            const amount = state.getIn(['currentRound', 'bets', action.horse.get('id'), 'amount'], 0) + +action.amount;
            const logMessage = Immutable.fromJS({
                type: 'bet',
                player: player,
                amount: amount,
                where: action.horse
            });
            newState = state.withMutations(state => {
                state
                    .setIn(['currentRound', 'state'], STATE_BEFORE_THROW)
                    .setIn(['currentRound', 'bets', action.horse.get('id'), 'status'], 'CONFIRMED')
                    .setIn(['currentRound', 'bets', action.horse.get('id'), 'amount'], amount)
                    .setIn(['players', state.get('playerOnTurn'), 'money'], player.get('money') - amount)
                    .set('log', state.get('log').push(logMessage))
                ;
            });
            break;
        }

        default:
            newState = state;
            break;
    }

    console.info(`NEXT STATE (${newState.getIn(['currentRound', 'state'])}):`, newState.toJS());
    return newState;

};
