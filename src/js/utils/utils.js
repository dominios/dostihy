/**
 * Generates random dice roll.
 * @return {Number}
 */
export function getRandomThrow () {

    let result = prompt('Roll', 1);
    if (result) {
        return parseInt(result, 10);
    }

    const values = [1, 2, 3, 4, 5, 6];
    function shuffle(array) {
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