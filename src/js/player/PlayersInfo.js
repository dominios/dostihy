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
        return <section className="inventory">
            Inventory: {player.get('inventory').map(item => {
                if (item === -1) {
                    return <span
                        key="-1"
                        className="inventory-item"
                    >
                        Cancel distance
                    </span>
                } else {
                    const field = this.props.fields.filter(field => item === +field.get('id')).get(0);
                    return <span
                        key={field.get('id')}
                        className={`inventory-item field-${field.get('type').toLowerCase()} stable-${field.getIn(['horse', 'group'], 'none')}`}
                    >
                    {field.getIn(['text', 'name'])}
                </span>
                }
            }
        )
        }
        </section>;
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
            <PlayerInlineHelper player={player}/>
            <section className="amount">
                <MoneyInlineHelper amount={player.get('money')}/>
            </section>
            {this.renderInventory(player)}
        </div>

    }

    /**
     * Renders all players.
     *
     * @return {XML}
     */
    render () {
        return <div>
            {this.props.players.map((player, index) => this.renderPlayer(player, index))}
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