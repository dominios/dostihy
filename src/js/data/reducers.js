import Immutable from 'immutable';
import fields from './db/fields.json';

const initialState = Immutable.fromJS({
    fields: fields
});

const gameStateReducer = function (state = initialState, action) {
    return state;
}

export default gameStateReducer;