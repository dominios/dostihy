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
    BUY_TOKENS,
    END_TURN,
    payBank,
    payPlayer
} from './actions';

const initialState = Immutable.fromJS({
    fields: fields,
    diceThrows: [0],
    parkingMoney: 0,
    currentRound: {
        round: 1,
        player: 0,
        state: STATE_BEFORE_THROW,
        actionRequired: null,
        floatingInfo: []
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
            inventory: [2, 4, 38, 40],
            racingPoints: {
                2: 3,
                4: 4,
                38: 2,
                40: 5
            }
        },
        {
            index: 1,
            name: 'Player 2',
            field: 0,
            money: 30000,
            ai: false,
            color: 'deepskyblue',
            inventory: [12, 14, 15],
            racingPoints: {
                12: 1,
                14: 4,
                15: 2
            }

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

export default initialState;