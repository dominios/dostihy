import { getPlayerOnTurn } from "../utils/utils";

export const STATE_BEFORE_THROW = 'STATE_BEFORE_THROW';
export const STATE_AFTER_THROW = 'STATE_AFTER_THROW';
export const STATE_BEFORE_PAYMENT = 'STATE_BEFORE_PAYMENT';
export const STATE_AFTER_PAYMENT = 'STATE_AFTER_PAYMENT';
export const STATE_BETTING = 'STATE_BETTING';

/*
    1. pred hodom kocky
        * stavkovat
        ! hodit kockou
    2. po hode kocky
        ! automaticka akcia (platba...)
        * obchodovat
        ! ukoncit tah
 */

export function isBeforeThrow (currentRound) {

    const statesBefore = [
        STATE_BEFORE_THROW,
        STATE_BETTING
    ];

    console.info(`CURRENT STATE: ${currentRound.get('state')}`);
    console.info(`IS BEFORE? ${statesBefore.indexOf(currentRound.get('state')) > -1}`);

    return statesBefore.indexOf(currentRound.get('state')) > -1;
}

export function isAfterThrow (currentRound) {
    return !isBeforeThrow(currentRound);
}