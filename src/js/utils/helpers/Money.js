import React from 'react';
import PropTypes from 'prop-types';

export default class MoneyInlineHelper extends React.Component {

    static formatMoney (amount) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        });
        return formatter.format(amount);
    }

    render () {

        return <span className="inline-money">
            <span className="label">{this.props.label ? this.props.label + ': ' : ''}</span>
            <span className="amount">{ MoneyInlineHelper.formatMoney(this.props.amount) }</span>
        </span>;
    }
}

MoneyInlineHelper.propTypes = {
    amount: PropTypes.number.isRequired,
    label: PropTypes.string
};
