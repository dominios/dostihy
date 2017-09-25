import React from 'react';
import PropTypes from 'prop-types';
import MoneyInlineHelper from '../../utils/helpers/Money';

export default class HorseField extends React.Component {

    countFee () {
        // @todo if player is on distance/doping...
        if (this.props.points > 0) {
            const racingFee = this.props.horse.getIn(['racingFees', (this.props.points - 1)]);
            if (this.props.bet) {
                return racingFee - (this.props.bet.get('amount') * 10);
            } else {
                return racingFee;
            }
        }
        return this.props.horse.get('standardFee');
    }

    render () {
        const balance = this.countFee();
        const balanceFormatted = balance < 0 ? balance * -1 : balance;
        return (<div className="fee-section">
            {this.props.owner
                ? <div><MoneyInlineHelper label={balance > 0 ? 'Fee' : 'Win'} amount={balanceFormatted}/></div>
                : <div><MoneyInlineHelper label="Cost" amount={this.props.horse.get('initialPrice')}/></div>
            }
            <div className="racingPoints">
                {'*'.repeat(this.props.points)}
            </div>
        </div>);
    }
}

HorseField.propTypes = {
    owner: PropTypes.object,
    horse: PropTypes.object.isRequired,
    points: PropTypes.number.isRequired,
    canBet: PropTypes.bool.isRequired,
    bet: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
};
