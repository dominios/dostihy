import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MoneyInlineHelper from '../../utils/helpers/Money';
import CountdownTimer from '../../utils/countdown';

class PayButton extends React.Component {

    constructor (props) {
        super(props);

        this.handleTimeout();

        this.handleTimeout = this.handleTimeout.bind(this);
        this.handlePayClick = this.handlePayClick.bind(this);
    }

    componentWillUnmount () {
        clearInterval(this.timeout);
    }

    handleTimeout () {
        if (this.props.autoTimeout > 0) {
            this.timeout = setTimeout(this.handlePayClick.bind(this), this.props.autoTimeout);
        }
    }

    handlePayClick () {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.props.dispatch(this.props.action);
    }

    render () {
        const amount = MoneyInlineHelper.formatMoney(this.props.amount);
        const countdown = this.props.autoTimeout ?   <CountdownTimer secondsRemaining={this.props.autoTimeout / 1000} label="Auto pay in"/> : null;
        return <span>
                <button onClick={this.handlePayClick}>{`Pay ${amount} to ${this.props.recipient}`}</button>
                { countdown }
            </span>;
    }

}

PayButton.defaultProps = {
    autoTimeout: 3000
};

PayButton.propTypes = {
    amount: PropTypes.number.isRequired,
    recipient: PropTypes.string.isRequired,
    action: PropTypes.object.isRequired,
    autoTimeout: PropTypes.number
};

export default connect()(PayButton);
