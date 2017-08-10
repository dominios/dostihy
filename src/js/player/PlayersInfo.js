import React from 'react';
import { connect } from 'react-redux';
import PlayerInlineHelper from '../utils/helpers/Player';
import MoneyInlineHelper from '../utils/helpers/Money';
import { getPlayerOnTurn } from "../utils/utils";

/**
 * Renders box with all players info.
 */
class PlayersInfo extends React.Component {

    /**
     * Renders inventory of the player.
     *
     * @param {object} player
     *
     * @return {XML}
     *
     * @todo move to separate component
     */
    renderInventory (player) {
        const items = player.get('inventory').map(item => {
            const field = this.props.fields.filter(field => item == field.get('id'));
            return field.getIn([0, 'text', 'name']);
        });
        return (<section className="inventory">
            Inventory: { items.size ? items.join(', ') : <i>empty</i> }
        </section>);
    }

    /**
     * Render single player info.
     *
     * @return {XML}
     */
    renderPlayer (player, index) {

        const css = ['box-info', 'player'];
        if (index === this.props.currentPlayerIndex) {
            css.push('current');
        }
        return <div className={css.join(' ')} key={index} id={`player-info-${player.get('index')}`}>
            <PlayerInlineHelper player={player} />
            <section className="amount">
                <MoneyInlineHelper amount={player.get('money')} />
            </section>
            { this.renderInventory(player) }
        </div>

    }

    /**
     * Renders all players.
     *
     * @return {XML}
     */
    render () {
        return <div>
            { this.props.players.map((player, index) => this.renderPlayer(player, index)) }
        </div>;
    }
}

const mapStateToProps = function (state) {

    const currentPlayer = getPlayerOnTurn(state);

    return {
        players: state.get('players'),
        fields: state.get('fields'),
        currentPlayer: currentPlayer,
        currentPlayerIndex: state.get('playerOnTurn')
    };
};

export default connect(mapStateToProps)(PlayersInfo);