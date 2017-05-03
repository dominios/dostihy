import React from 'react';
import { connect } from 'react-redux';

class CurrentPlayer extends React.Component {

    constructor (props) {
        super(props);
    }

    renderInventory () {

        const items = this.props.currentPlayer.get('inventory').join(', ') || '';

        return (<section className="inventory">
            { items.length ? items : <i>Inventory Empty</i> }
        </section>);
    }


    render () {
        return (<div className="box-info currentPlayer">
            <h6>{ this.props.currentPlayer.get('name') }</h6>
            <section className="amount">Money: <span>${ this.props.currentPlayer.get('money') }</span></section>
            { this. renderInventory() }
        </div>);
    }
}

CurrentPlayer.defaultProps = {
};

CurrentPlayer.propTypes = {
};

const mapStateToProps = function (state) {

    const currentPlayer = state.getIn(['players', state.get('playerOnTurn')]);

    return {
        currentPlayer: currentPlayer,
        currentPlayerIndex: state.get('playerOnTurn')
    };
};

export default connect(mapStateToProps)(CurrentPlayer);