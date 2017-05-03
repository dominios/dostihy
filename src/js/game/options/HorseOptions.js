import React from 'react';
import { connect } from 'react-redux';
import { buyCard } from '../../data/actions';

class HorseOptions extends React.Component {

    constructor (props) {
        super(props);

        this.onPurchase = this.onPurchase.bind(this);
    }

    onPurchase () {
        this.props.buyCard(this.props.currentPlayerIndex, this.props.fieldId);
    }

    render () {
        return (<div>
            <button onClick={this.onPurchase}>+ Kúpit</button>
        </div>);
    }
}

HorseOptions.propTypes = {
    currentPlayer: React.PropTypes.object.isRequired,
    currentPlayerIndex: React.PropTypes.number.isRequired,
    fieldId: React.PropTypes.string.isRequired
};

const mapDispatchToProps = function (dispatch) {
    return {
        buyCard: (playerIndex, fieldId) => dispatch(buyCard(playerIndex, fieldId))
    };
};

export default connect(undefined, mapDispatchToProps)(HorseOptions);