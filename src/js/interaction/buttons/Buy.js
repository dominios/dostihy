import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { buyCard } from '../../data/actions';

class BuyButton extends React.Component {

    constructor (props) {
        super(props);

        this.onPurchase = this.onPurchase.bind(this);
    }

    onPurchase () {
        this.props.buyCard(this.props.currentPlayerIndex, this.props.fieldId);
    }

    render () {

        const buyBtn = <button onClick={this.onPurchase}>+ Buy</button>;
        const isOwner = this.props.owner && this.props.owner.get('id') === this.props.currentPlayer.get('id');

        if (!isOwner && this.props.currentPlayer.get('money')) {
            return buyBtn;
        }

        return null;
    }
}

BuyButton.propTypes = {
    currentPlayer: PropTypes.object.isRequired,
    currentPlayerIndex: PropTypes.number.isRequired,
    fieldId: PropTypes.string.isRequired,
    owner: PropTypes.any
};

const mapDispatchToProps = function (dispatch) {
    return {
        buyCard: (playerIndex, fieldId) => dispatch(buyCard(playerIndex, fieldId))
    };
};

export default connect(undefined, mapDispatchToProps)(BuyButton);