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

export const BUY_TOKENS = 'BUY_TOKENS';
export function buyTokens (playerIndex, fieldId, tokensCount) {
    return {
        type: BUY_TOKENS,
        playerIndex: playerIndex,
        fieldIndex: fieldId,
        tokensCount: tokensCount
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

export const START_BET = 'START_BET';
export function startBet () {
    return {
        type: START_BET
    }
}

export const CHOOSE_HORSE_BET = 'CHOOSE_HORSE_BET';
export function chooseHorseBet (horse) {
    return {
        type: CHOOSE_HORSE_BET,
        horse: horse
    }
}

export const CONFIRM_BET = 'CONFIRM_BET';
export function confirmBet (horse, amount) {
    return {
        type: CONFIRM_BET,
        horse: horse,
        amount: amount
    };
}