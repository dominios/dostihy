import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { buyTokens } from '../../data/actions';
import MoneyInlineHelper from '../../utils/helpers/Money';

class BuyTokensButton extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            tokensToBuy: 1,
            alreadyHasCount: this.props.currentPlayer.getIn(['racingPoints', this.props.currentField.get('id')])
        };

        this.onPurchase = this.onPurchase.bind(this);
        this.onTokensToBuyChange = this.onTokensToBuyChange.bind(this);
    }

    onPurchase () {
        // @todo
    }

    onTokensToBuyChange (e) {
        const value = parseInt(e.target.value, 10);
        const canBuy = 4 - this.state.alreadyHasCount;
        let count;
        if (value > canBuy) {
            count = canBuy;
        } else if (value <= 0) {
            count = 0;
        } else {
            count = value;
        }
        this.setState({
            tokensToBuy: count
        });
    }

    resolveBuyLabel () {
        if (this.state.alreadyHasCount === 4) {
            return 'Main Token';
        }
        return this.state.tokensToBuy === 1 ? '1 Token' : `${this.state.tokensToBuy} Tokens`;
    }

    resolveAmount () {
        const amount = this.state.tokensToBuy * this.props.currentField.getIn(['horse', 'racingCost']);
        return MoneyInlineHelper.formatMoney(amount);
    }

    render () {

        if (this.state.alreadyHasCount === 5) {
            return null;
        }

        return (<span>
            { this.state.alreadyHasCount < 4 && <input
                type="number"
                min={0}
                max={(4 - this.state.alreadyHasCount)}
                value={this.state.tokensToBuy}
                onChange={this.onTokensToBuyChange}
            />}
            <button
                onClick={this.onPurchase}
            >
                {`Buy ${this.resolveBuyLabel()} for ${this.resolveAmount()}`}
            </button>
        </span>);
    }
}

BuyTokensButton.propTypes = {
    currentPlayer: PropTypes.object.isRequired,
    currentField: PropTypes.object.isRequired
};

const mapDispatchToProps = function (dispatch) {
    return {
        buyTokens: (playerIndex, fieldId, tokensCount) => dispatch(buyTokens(playerIndex, fieldId, tokensCount))
    };
};

export default connect(undefined, mapDispatchToProps)(BuyTokensButton);
