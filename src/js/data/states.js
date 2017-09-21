import { getPlayerOnTurn } from "../utils/utils";

export const STATE_BEFORE_THROW = 'STATE_BEFORE_THROW';
export const STATE_AFTER_THROW = 'STATE_AFTER_THROW';

export const STATE_BEFORE_PAYMENT = 'STATE_BEFORE_PAYMENT';
export const STATE_AFTER_PAYMENT = 'STATE_AFTER_PAYMENT';

export const STATE_BETTING_SELECT = 'STATE_BETTING_SELECT';
export const STATE_BETTING_BET = 'STATE_BETTING_BET';

/*
    1. pred hodom kocky
        * stavkovat
            - vybrat kona
            - zvolit sumu
        ! hodit kockou
    2. po hode kocky
        ! automaticka akcia (platba...)
        * obchodovat
        ! ukoncit tah
 */

export function isBeforeThrow (currentRound) {

    const statesBefore = [
        STATE_BEFORE_THROW,
        STATE_BETTING_SELECT,
        STATE_BETTING_BET
    ];

    return statesBefore.indexOf(currentRound.get('state')) > -1;
}

export function isAfterThrow (currentRound) {
    return !isBeforeThrow(currentRound);
}