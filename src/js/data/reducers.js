import Immutable from 'immutable';
import fields from './db/fields.json';
import { THROW_DICE, BUY_CARD } from './actions';
import { getRandomThrow } from '../utils/utils';

const initialState = Immutable.fromJS({
    fields: fields,
    diceThrows: [0],
    round: 1,
    playerOnTurn: 0,
    players: [
        {
            name: 'Dominik',
            field: 0,
            money: 30000,
            ai: false,
            color: 'red',
            inventory: []
        }
    ]
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
                if (newPosition > 40) {
                    newPosition -= 40;
                }
            }

            // update store
            return state.withMutations(state => {
                state
                    .set('diceThrows', Immutable.fromJS(throws))
                    .setIn(['players', currentPlayer, 'field'], newPosition)
                ;
            });
        }

        case BUY_CARD: {
            // check if possible (ownership, money, ...)
            // @todo
            // assume it is
            const fieldId = parseInt(action.fieldIndex, 10) - 1;
            const currentPlayer = state.getIn(['players', action.playerIndex]);
            const cardInfo = state.getIn(['fields', fieldId]);
            let withdraw;
            switch (cardInfo.get('type')) {
                case 'HORSE': withdraw = cardInfo.getIn(['horse', 'initialPrice']); break;
                case 'TRAINER': withdraw = 4000; break;
            }
            const newMoneyAmount = (currentPlayer.get('money') - withdraw);
            return state.withMutations(state => {
                const inventory = state.getIn(['players', action.playerIndex, 'inventory']).toJS();
                inventory.push(fieldId);
                state
                    .setIn(['players', action.playerIndex, 'money'], newMoneyAmount)
                    .setIn(['players', action.playerIndex, 'inventory'], Immutable.fromJS(inventory))
                ;
            });
        }
    }

    return state;
};

export default gameStateReducer;