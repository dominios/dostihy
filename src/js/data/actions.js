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