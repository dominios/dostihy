import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MoneyInlineHelper from '../../utils/helpers/Money';

class PayButton extends React.Component {

    constructor (props) {
        super(props);

        this.handlePayClick = this.handlePayClick.bind(this);
    }

    handlePayClick () {
        this.props.dispatch(this.props.action);
    }

    render () {
        const amount = MoneyInlineHelper.formatMoney(this.props.amount);
        return <button onClick={this.handlePayClick}>{`Pay ${amount} to ${this.props.recipient}`}</button>;
    }

}

PayButton.propTypes = {
    amount: PropTypes.number.isRequired,
    recipient: PropTypes.string.isRequired,
    // action: PropTypes.isRequired
};

export default connect()(PayButton);
