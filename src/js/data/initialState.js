import Immutable from 'immutable';
import fields from './db/fields.json';

import {
    STATE_BEFORE_THROW,
    STATE_AFTER_THROW,
    STATE_BEFORE_PAYMENT,
    STATE_AFTER_PAYMENT,
} from './states';
import { shuffle } from "../utils/utils";

const financeCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const fortuneCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const initialState = Immutable.fromJS({
    fields: fields,
    diceThrows: [0],
    parkingMoney: 0,
    currentRound: {
        round: 1,
        player: 0,
        state: STATE_BEFORE_THROW,
        actionRequired: null,
        floatingInfo: [],
        bets: {}
    },
    playerOnTurn: 0,
    players: [
        {
            index: 0,
            name: 'Dominik',
            field: 0,
            money: 30000,
            ai: false,
            // inventory: [],
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
            // inventory: [],
            inventory: [12, 14, 15],
            racingPoints: {
                12: 1,
                14: 4,
                15: 2
            }

        },
        {
            index: 2,
            name: 'Player 3',
            field: 0,
            money: 30000,
            ai: false,
            inventory: [32, 33, 35],
            racingPoints: {
                32: 4,
                33: 4,
                35: 5
            }
        },
        {
            index: 3,
            name: 'Player 4',
            field: 0,
            money: 30000,
            ai: true,
            inventory: [],
            racingPoints: {}
        },
        // {
        //     index: 4,
        //     name: 'Player 5',
        //     field: 0,
        //     money: 30000,
        //     ai: true,
        //     inventory: [],
        //     racingPoints: {}
        // },
        // {
        //     index: 5,
        //     name: 'Player 6',
        //     field: 0,
        //     money: 30000,
        //     ai: true,
        //     inventory: [],
        //     racingPoints: {}
        // },
    ],
    financeCards: shuffle(financeCards),
    currentFinanceCardPointer: 0,
    fortuneCards: shuffle(fortuneCards),
    currentFortuneCardPointer: 0,
    log: ['The Game has started']
});

export default initialState;
