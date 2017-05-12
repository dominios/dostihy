import React from 'react';
import { connect } from 'react-redux';

class PlayersInfo extends React.Component {

    renderInventory (player) {
        const items = player.get('inventory').join(', ') || '';
        return (<section className="inventory">
            { items.length ? items : <i>Inventory Empty</i> }
        </section>);
    }

    renderPlayers () {
        return this.props.players.map((player, index) => {
            const css = ['box-info', 'player'];
            if (index === this.props.currentPlayerIndex) {
                css.push('current');
            }
            return <div className={css.join(' ')} key={index}>
                <h6 style={{color: player.get('color')}}>{ player.get('name') }</h6>
                <section className="amount">Money: <span>${ player.get('money') }</span></section>
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
        currentPlayer: currentPlayer,
        currentPlayerIndex: state.get('playerOnTurn')
    };
};

export default connect(mapStateToProps)(PlayersInfo);