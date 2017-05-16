/**
 * Generates random dice roll.
 *
 * @return {Number}
 */
export function getRandomThrow () {

    let result = prompt('Roll', 1);
    if (result) {
        return parseInt(result, 10);
    }

    const values = [1, 2, 3, 4, 5, 6];

    function shuffle (array) {
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

/**
 * Returns owner of the field.
 *
 * @param {Object} field
 * @param {Array} players
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
 * @return {Number}
 */
export function countPayAmount (field, player) {

    if (field.get('type') === 'HORSE') {
        return field.getIn(['horse', 'standardFee']);
        // @todo racing points already assigned?
    }

    if (field.get('type') === 'TRAINER') {
        const trainersCount = player.get('inventory').filter(item => [6, 16, 26, 36].indexOf(item) !== -1);
        return trainersCount.size * 1000;
    }

    if (field.get('type') === 'TRANSPORT' || field.get('type') === 'STABLES') {
        const ownerCards = player.get('inventory').filter(item => [13, 29].indexOf(item) !== -1);
        if (ownerCards.size === 1) {
            return ((number1 + number2) * 80);
        } else if (ownerCards.size === 2) {
            return ((number1 + number2) * 200);
        }
    }

    console.warn('UNSUPPORTED FIELD TYPE: ', field.get('type'));
}
