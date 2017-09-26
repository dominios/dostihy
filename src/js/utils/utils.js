/**
 * Shuffles given array.
 *
 * @param array
 * @return {array}
 */
export function shuffle (array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

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

/**
 * Generates random dice roll.
 *
 * @return {Number}
 */
export function getRandomThrow () {

    let result = false;//prompt('Roll', 1);
    if (result) {
        return parseInt(result, 10);
    }

    const values = [1, 2, 3, 4, 5, 6];

    return shuffle(shuffle(shuffle(shuffle(values))))[0];
}

/**
 * Returns owner of the field.
 *
 * @param {Object} field
 * @param {Object} players
 * @return {Object}
 */
export function getOwner (field, players) {
    return players.find((player) => {
        return player.get('inventory').find(item => {
            return item === parseInt(field.get('id'));
        });
    });
}

/**
 * Returns amount to pay.
 *
 * @param {Object} field field to calculate amount for.
 * @param {Object} player field owner.
 * @param {Object} bets current round bets.
 * @param {Number} movementSize number of fields travelled.
 *
 * @return {Number}
 */
export function countPayAmount (field, player, bets, movementSize = 0) {

    if (field.get('type') === 'HORSE') {
        const points = player.getIn(['racingPoints', field.get('id')]) || 0;
        if (points) {
            const racingCost = field.getIn(['horse', 'racingFees', (points - 1)]);
            if (bets && bets.size) {
                const betAmount = bets.getIn([field.get('id'), 'amount'], 0);
                return racingCost - (betAmount * 10);
            } else {
                return racingCost;
            }
        }
        return field.getIn(['horse', 'standardFee']);
    }

    if (field.get('type') === 'TRAINER') {
        const trainersCount = player.get('inventory').filter(item => [6, 16, 26, 36].indexOf(item) !== -1);
        return trainersCount.size * 1000;
    }

    if (field.get('type') === 'TRANSPORT' || field.get('type') === 'STABLES') {
        const ownerCards = player.get('inventory').filter(item => [13, 29].indexOf(item) !== -1);
        if (ownerCards.size === 1) {
            return (movementSize * 80);
        } else if (ownerCards.size === 2) {
            return (movementSize * 200);
        }
    }

    console.warn('UNSUPPORTED FIELD TYPE: ', field.get('type'));
}

/**
 * List of stables.
 *
 * Index is number of the stable and contains IDs of the
 * corresponding fields.
 *
 * @type {Object}
 */
export const HORSE_STABLES = {
    1: [2, 4],
    2: [7, 9, 10],
    3: [12, 14, 15],
    4: [17, 19, 20],
    5: [22, 24, 25],
    6: [27, 28, 30],
    7: [32, 33, 35],
    8: [38, 40]
};

/**
 * Checks if given player has all stable horses.
 *
 * @param {Object} player
 * @param {Number} stableId
 * @return {boolean}
 */
export function hasFullStable (player, stableId) {
    const groups = HORSE_STABLES;
    const horsesCount = player.get('inventory').filter(item => groups[stableId].indexOf(item) !== -1);
    return horsesCount.size === groups[stableId].length;
}

/**
 * Checks if given player can bet.
 *
 * Player needs to have at least 1 horse with 3 or more racing tokens assigned.
 *
 * @param {Object} player player object.
 * @returns {Boolean}
 */
export function canBet (player) {
    return player.get('racingPoints').filter(token => token >= 3).size > 0;
}

/**
 * Returns current player object.
 *
 * @param {object} state game state.
 * @return {object}
 */
export function getPlayerOnTurn (state) {
    return state.getIn(['players', state.get('playerOnTurn')]);
}

/**
 * Returns current player field.
 *
 * @param {object} state game state.
 * @return {object}
 */
export function getCurrentField (state) {
    const currentPlayer = getPlayerOnTurn(state);
    return state.getIn(['fields', currentPlayer.get('field')]);
}

export function getPlayersRacingPointsCount (player) {
    let standardCount = 0;
    let mainCount = 0;
    player.get('racingPoints').forEach(pointsCount => {
        pointsCount === 5 ? mainCount++ : standardCount += pointsCount;
    });
    return {
        standard: standardCount,
        mainCount: mainCount
    };
}

/**
 * Returns players on the field with given id.
 *
 * @param {string} fieldId field id.
 * @param {List} players players
 *
 * @return {List}
 */
export function playersOnField (fieldId, players) {
    return players.filter(player => {
        // return +player.get('field') === +field.get('id');
        return +player.get('field') === +fieldId
    });
}