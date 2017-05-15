import React from 'react';
import { connect } from 'react-redux';
import PlayerInlineHelper from '../utils/helpers/Player';
import MoneyInlineHelper from '../utils/helpers/Money';

class PlayersInfo extends React.Component {

    renderInventory (player) {
        const items = player.get('inventory').map(item => {
            const field = this.props.fields.filter(field => item == field.get('id'));
            return field.getIn([0, 'text', 'name']);
        });
        return (<section className="inventory">
            Inventory: { items.size ? items.join(', ') : <i>empty</i> }
        </section>);
    }

    renderPlayers () {
        return this.props.players.map((player, index) => {
            const css = ['box-info', 'player'];
            if (index === this.props.currentPlayerIndex) {
                css.push('current');
            }
            return <div className={css.join(' ')} key={index}>
                <PlayerInlineHelper player={player} />
                <section className="amount">
                    <MoneyInlineHelper amount={player.get('money')} />
                </section>
                { this.renderInventory(player) }
            </div>
        });
    }

    render () {
        return <div>
            { this.renderPlayers() }
        </div>;
    }
}

const mapStateToProps = function (state) {

    const currentPlayer = state.getIn(['players', state.get('playerOnTurn')]);

    return {
        players: state.get('players'),
        fields: state.get('fields'),
        currentPlayer: currentPlayer,
        currentPlayerIndex: state.get('playerOnTurn')
    };
};

export default connect(mapStateToProps)(PlayersInfo);