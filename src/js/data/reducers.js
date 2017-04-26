import Immutable from 'immutable';
import fields from './db/fields.json';
import { THROW_DICE } from './actions';

const initialState = Immutable.fromJS({
    fields: fields,
    diceThrows: [0],
    round: 1,
    playerOnTurn: 0
});

const gameStateReducer = function (state = initialState, action) {

    switch (action.type) {
        case THROW_DICE: {
            function getRandomThrow () {
                const values = [1, 2, 3, 4, 5, 6];
                function shuffle(array) {
                    var currentIndex = array.length, temporaryValue, randomIndex;

                    // While there remain elements to shuffle...
                    while (0 !== currentIndex) {

                        // Pick a remaining element...
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex -= 1;

                        // And swap it with the current element.
                        temporaryValue = array[currentIndex];
                        array[currentIndex] = array[randomIndex];
                        array[randomIndex] = temporaryValue;
                    }

                    return array;
                }
                return shuffle(shuffle(shuffle(shuffle(values))))[0];
            }
            const throws = state.get('diceThrows').toJS();
            const number = getRandomThrow();
            console.info(`THROWING DICE: ${number}`);
            throws.push(number);
            if (number === 6) {
                const number2 = getRandomThrow();
                console.info(`THROWING DICE AGAIN: ${number2}`);
                throws.push(number2);
            }
            return state.set('diceThrows', Immutable.fromJS(throws));
        }
    }

    return state;
};

export default gameStateReducer;