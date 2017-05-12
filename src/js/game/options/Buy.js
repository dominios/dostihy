import React from 'react';
import { connect } from 'react-redux';
import { buyCard } from '../../data/actions';

class BuyOption extends React.Component {

    constructor (props) {
        super(props);

        this.onPurchase = this.onPurchase.bind(this);
    }

    onPurchase () {
        this.props.buyCard(this.props.currentPlayerIndex, this.props.fieldId);
    }

    render () {

        const buyBtn = <button onClick={this.onPurchase}>+ Kúpit</button>;
        const isOwner = this.props.owner && this.props.owner.get('id') === this.props.currentPlayer.get('id');

        return (<div>
            { isOwner ? '' : buyBtn }
        </div>);
    }
}

BuyOption.propTypes = {
    currentPlayer: React.PropTypes.object.isRequired,
    currentPlayerIndex: React.PropTypes.number.isRequired,
    fieldId: React.PropTypes.string.isRequired,
    owner: React.PropTypes.any
};

const mapDispatchToProps = function (dispatch) {
    return {
        buyCard: (playerIndex, fieldId) => dispatch(buyCard(playerIndex, fieldId))
    };
};

export default connect(undefined, mapDispatchToProps)(BuyOption);