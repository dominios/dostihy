import Immutable from 'immutable';
import fields from './db/fields.json';
import { THROW_DICE, BUY_CARD, END_TURN } from './actions';
import { getRandomThrow } from '../utils/utils';

const STATE_BEFORE_THROW = 'STATE_BEFORE_THROW';
const STATE_AFTER_THROW = 'STATE_AFTER_THROW';

const initialState = Immutable.fromJS({
    fields: fields,
    diceThrows: [0],
    currentRound: {
        round: 1,
        player: 0,
        state: STATE_BEFORE_THROW
    },
    playerOnTurn: 0,
    players: [
        {
            name: 'Dominik',
            field: 0,
            money: 30000,
            ai: false,
            color: 'red',
            inventory: []
        },
        {
            name: 'Player 2',
            field: 0,
            money: 30000,
            ai: false,
            color: 'deepskyblue',
            inventory: []
        }
    ],
    log: ['The Game has started']
});

const gameStateReducer = function (state = initialState, action) {

    switch (action.type) {

        case THROW_DICE: {

            let number1 = 0;
            let number2 = 0;

            // get throw results
            const throws = state.get('diceThrows').toJS();
            number1 = getRandomThrow();
            console.info(`THROWING DICE: ${number1}`);
            throws.push(number1);
            if (number1 === 6) {
                number2 = getRandomThrow();
                console.info(`THROWING DICE AGAIN: ${number2}`);
                throws.push(number2);
            }

            const currentPlayer = state.get('playerOnTurn');
            const currentPosition = state.getIn(['players', currentPlayer, 'field']);
            let newPosition;
            if (number2 === 6) {
                // 2 throws of 6 -> distance
                newPosition = 10;
            } else {
                newPosition = currentPosition + number1 + number2;
                if (newPosition >= 40) {
                    newPosition -= 40;
                }
            }

            // update store
            return state.withMutations(state => {
                state.set('log', state.get('log').push(`Player X  thrown ${number1}.`));
                if (number2) {
                    state.set('log', state.get('log').push(`Player X  thrown ${number2}.`));
                }
                state
                    .set('diceThrows', Immutable.fromJS(throws))
                    .setIn(['currentRound', 'state'], STATE_AFTER_THROW)
                    .setIn(['players', currentPlayer, 'field'], newPosition)
                ;
            });
        }

        case END_TURN: {

            let nextPlayer = state.get('playerOnTurn') + 1;
            if (nextPlayer >= state.get('players').size) {
                nextPlayer = 0;
            }

            return state.withMutations(state => {
                state
                    .setIn(['currentRound', 'state'], STATE_BEFORE_THROW)
                    .set('playerOnTurn', nextPlayer)
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
            }
            const newMoneyAmount = (currentPlayer.get('money') - withdraw);
            return state.withMutations(state => {
                const inventory = state.getIn(['players', action.playerIndex, 'inventory']);
                state
                    .set('log', state.get('log').push(`Player X bought Y.`))
                    .setIn(['players', action.playerIndex, 'money'], newMoneyAmount)
                    .setIn(['players', action.playerIndex, 'inventory'], inventory.push(fieldId))
                ;
            });
        }
    }

    return state;
};

export default gameStateReducer;