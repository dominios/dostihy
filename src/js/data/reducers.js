import Immutable from 'immutable';
import fields from './db/fields.json';
import { THROW_DICE } from './actions';
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
    }

    return state;
};

export default gameStateReducer;