import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders money information formatted.
 */
export default class MoneyInlineHelper extends React.Component {

    /**
     * Formats the given amount and returns it as string.
     *
     * @param {number} amount amount to format.
     *
     * @return {string} formated string.
     */
    static formatMoney (amount) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        });
        return formatter.format(amount);
    }

    /**
     * Returns formatted JSX.
     *
     * @return {XML}
     */
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
