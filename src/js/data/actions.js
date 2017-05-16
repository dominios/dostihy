export const STATE_BEFORE_THROW = 'STATE_BEFORE_THROW';
export const STATE_AFTER_THROW = 'STATE_AFTER_THROW';
export const STATE_BEFORE_PAYMENT = 'STATE_BEFORE_PAYMENT';
export const STATE_AFTER_PAYMENT = 'STATE_AFTER_PAYMENT';

export const THROW_DICE = 'THROW_DICE';
export function throwDice () {
    return {
        type: THROW_DICE
    };
}

export const BUY_CARD = 'BUY_CARD';
export function buyCard (playerIndex, fieldId) {
    return {
        type: BUY_CARD,
        playerIndex: playerIndex,
        fieldIndex: fieldId
    }
}

export const END_TURN = 'END_TURN';
export function endTurn () {
    return {
        type: END_TURN
    }
}

export const PAY_BANK = 'PAY_BANK';
export function payBank (amount, player, field) {
    return {
        type: PAY_BANK,
        amount: amount,
        from: player,
        field: field
    }
}

export const PAY_PLAYER = 'PAY_PLAYER';
export function payPlayer (amount, player, owner, field) {
    return {
        type: PAY_PLAYER,
        amount: amount,
        from: player,
        to: owner,
        field: field
    }
}
