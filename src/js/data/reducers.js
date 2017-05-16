import Immutable from 'immutable';
import fields from './db/fields.json';
import {
    STATE_BEFORE_THROW,
    STATE_AFTER_THROW,
    STATE_BEFORE_PAYMENT,
    STATE_AFTER_PAYMENT,
    THROW_DICE,
    PAY_PLAYER,
    PAY_BANK,
    BUY_CARD,
    END_TURN,
    payBank,
    payPlayer
} from './actions';
import { getRandomThrow, getOwner } from '../utils/utils';

const initialState = Immutable.fromJS({
    fields: fields,
    diceThrows: [0],
    parkingMoney: 0,
    currentRound: {
        round: 1,
        player: 0,
        state: STATE_BEFORE_THROW,
        actionRequired: null
    },
    playerOnTurn: 0,
    players: [
        {
            index: 0,
            name: 'Dominik',
            field: 0,
            money: 30000,
            ai: false,
            color: 'red',
            inventory: []
        },
        {
            index: 1,
            name: 'Player 2',
            field: 0,
            money: 30000,
            ai: false,
            color: 'deepskyblue',
            inventory: []
        },
        // {
        //     index: 2,
        //     name: 'Player 3',
        //     field: 0,
        //     money: 30000,
        //     ai: false,
        //     color: 'green',
        //     inventory: []
        // },
        // {
        //     index: 3,
        //     name: 'Player 4',
        //     field: 0,
        //     money: 30000,
        //     ai: false,
        //     color: 'violet',
        //     inventory: []
        // },
        // {
        //     index: 3,
        //     name: 'Player 5',
        //     field: 0,
        //     money: 30000,
        //     ai: false,
        //     color: 'white',
        //     inventory: []
        // },
        // {
        //     index: 3,
        //     name: 'Player 6',
        //     field: 0,
        //     money: 30000,
        //     ai: false,
        //     color: 'black',
        //     inventory: []
        // },
    ],
    log: ['The Game has started']
});

const gameStateReducer = function (state = initialState, action) {

    switch (action.type) {

        case THROW_DICE: {

            const currentPlayer = state.getIn(['players', state.get('playerOnTurn')]);
            const currentPosition = currentPlayer.get('field');
            let money = currentPlayer.get('money');
            let parkingMoney = state.get('parkingMoney');

            let logs = [];

            let number1 = 0;
            let number2 = 0;

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
            if (number2 === 6) {
                // 2 throws of 6 -> distance
                newPosition = 10;
            } else {
                newPosition = currentPosition + number1 + number2;
                if (newPosition >= 40) {
                    newPosition -= 40;
                    money += 4000;
                    logs.push({
                        type: 'crossStart',
                        player: currentPlayer
                    });
                }
            }

            const field = state.getIn(['fields', newPosition]);

            function countPayAmount (field, player) {

                if (field.get('type') === 'HORSE') {
                    return field.getIn(['horse', 'standardFee']);
                    // @todo racing points already assigned?
                }

                if (field.get('type') === 'TRAINER') {
                    const trainersCount = player.get('inventory').filter(item => [6, 16, 26, 36].indexOf(item) !== -1);
                    return trainersCount.size * 1000;
                }

                if (field.get('type') === 'TRANSPORT' || field.get('type') === 'STABLES') {
                    const ownerCards = player.get('inventory').filter(item => [13, 29].indexOf(item) !== -1);
                    if (ownerCards.size === 1) {
                        return ((number1 + number2) * 80);
                    } else if (ownerCards.size === 2) {
                        return ((number1 + number2) * 200);
                    }
                }

                console.warn('UNSUPPORTED FIELD TYPE: ', field.get('type'));
            }

            function resolveActionRequired (state, player, field) {

                const claimable = ['HORSE', 'TRAINER', 'STABLES', 'TRANSPORT'];
                if (claimable.indexOf(field.get('type')) !== -1) {
                    const owner = getOwner(field, state.get('players'));
                    if (owner && owner.get('index') !== player.get('index')) {
                        return payPlayer(countPayAmount(field), player, owner, field);
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

                if (field.get('type') === 'PARKING') {
                    return {
                        type: 'INCOME_PARKING',
                        amount: state.get('parkingMoney')
                    }
                }

                if (field.get('type') === 'FINANCES') {
                    console.warn('FINANCES TODO');
                    // @todo
                }

                if (field.get('type') === 'FORTUNE') {
                    console.warn('FORTUNE TODO');
                    // @todo
                }

                if (field.get('type') === 'DISTANCE') {
                    console.warn('DISTANC TODO');
                    // @todo
                }

                if (field.get('type') === 'DOPING') {
                    console.warn('DOPING TODO');
                    // @todo
                }

            }

            const actionRequired = resolveActionRequired(state, currentPlayer, field);
            if (actionRequired) {
                console.info("");
                console.info("ACTION REQUIRED:");
                console.info(actionRequired);
                console.info("");
            }

            return state.withMutations(state => {
                // movement
                state
                    .set('diceThrows', Immutable.fromJS(throws))
                    .setIn(['currentRound', 'state'], STATE_AFTER_THROW)
                    .setIn(['currentRound', 'actionRequired'], actionRequired ? Immutable.fromJS(actionRequired) : null)
                    .setIn(['players', state.get('playerOnTurn'), 'field'], newPosition)
                    .setIn(['players', state.get('playerOnTurn'), 'money'], money)
                ;

                // write logs
                for (let i = 0; i < logs.length; i++) {
                    state.set('log', state.get('log').push(Immutable.fromJS(logs[i])));
                }
            });

            // ALL LOGIC BELOW NEEDS SEPARATE ACTIONS !
            // @deprecated below

            // check for payment on the VET fields
            if (newPosition === 4) {
                money -= 500;
                parkingMoney += 500;
                logs.push({
                    type: 'pay',
                    player: currentPlayer,
                    amount: 500,
                    reason: 'VET'
                });
            }
            if (newPosition === 38) {
                money -= 1000;
                parkingMoney += 1000;
                logs.push({
                    type: 'pay',
                    player: currentPlayer,
                    amount: 1000,
                    reason: 'VET'
                });
            }
            // check parking income
            if (newPosition === 20) {
                if (parkingMoney) {
                    money += parkingMoney;
                    logs.push({
                        type: 'parkingIncome',
                        player: currentPlayer,
                        amount: parkingMoney,
                    });
                    parkingMoney = 0;
                } else {
                    logs.push({
                        type: 'parkingEmpty'
                    });
                }
            }

            // check for payments between players
            let payment = 0;
            const owner = getOwner(state.getIn(['fields', newPosition]), state.get('players'));
            if (owner && owner.get('name') !== currentPlayer.get('name')) {
                // count amount
                switch (field.get('type')) {
                    case 'HORSE':
                        payment = field.getIn(['horse', 'standardFee']);
                        break;
                    case 'TRAINER':
                        const ownerTrainers = owner.get('inventory').filter(item => [6, 16, 26, 36].indexOf(item) !== -1);
                        payment = ownerTrainers.size * 1000;
                        break;
                    case 'TRANSPORT':
                    case 'STABLES':
                        const ownerCards = owner.get('inventory').filter(item => [13, 29].indexOf(item) !== -1);
                        if (ownerCards.size === 1) {
                            payment = ((number1 + number2) * 80);
                        } else if (ownerCards.size === 2) {
                            payment = ((number1 + number2) * 200);
                        }
                        break;
                    default:
                        console.warn(`TODO PAYMENT FOR FIELD TYPE ${field.get('type')}`);
                        break;
                }
                money -= payment;
                logs.push({
                    type: 'payVisit',
                    who: currentPlayer,
                    to: owner,
                    amount: payment,
                    what: field.getIn(['text', 'name'])
                })
            }

            // update store
            return state.withMutations(state => {
                // movement
                state
                    .set('diceThrows', Immutable.fromJS(throws))
                    .set('parkingMoney', parkingMoney)
                    .setIn(['currentRound', 'state'], STATE_AFTER_THROW)
                    .setIn(['players', state.get('playerOnTurn'), 'field'], newPosition)
                    .setIn(['players', state.get('playerOnTurn'), 'money'], money)
                ;
                // payment
                if (payment) {
                    state
                        .setIn(['players', owner.get('index'), 'money'], owner.get('money') + payment)
                    ;
                }
                // logs
                for (let i = 0; i < logs.length; i++) {
                    state.set('log', state.get('log').push(Immutable.fromJS(logs[i])));
                }
            });
        }

        case PAY_BANK: {
            return state.withMutations(state => {
                const player = state.getIn(['players', action.from.index]);
                const log = Immutable.fromJS({
                    type: 'pay',
                    player: player,
                    amount: 500,
                    reason: 'VET'
                });
                state
                    .set('parkingMoney', state.get('parkingMoney') + action.amount)
                    .setIn(['currentRound', 'state'], STATE_AFTER_PAYMENT)
                    .setIn(['currentRound', 'actionRequired'], null)
                    .setIn(['players', player.get('index'), 'money'], (player.get('money') - action.amount))
                    .set('log', state.get('log').push(log))
                ;
            });
        }

        case END_TURN: {

            let nextPlayerIndex = state.get('playerOnTurn') + 1;
            if (nextPlayerIndex >= state.get('players').size) {
                nextPlayerIndex = 0;
            }

            const nextPlayer = state.getIn(['players', nextPlayerIndex]);

            const log = {
                type: 'turnStarted',
                player: nextPlayer
            };

            return state.withMutations(state => {
                state
                    .setIn(['currentRound', 'state'], STATE_BEFORE_THROW)
                    .setIn(['currentRound', 'actionRequired'], null)
                    .set('playerOnTurn', nextPlayerIndex)
                    .set('log', state.get('log').push(Immutable.fromJS(log)))
                ;
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
    }

    return state;
};

export default gameStateReducer;