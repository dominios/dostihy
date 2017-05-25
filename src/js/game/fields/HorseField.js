import React from 'react';
import PropTypes from 'prop-types';
import MoneyInlineHelper from '../../utils/helpers/Money';

export default class HorseField extends React.Component {

    countFee () {
        // @todo if player is on distance/doping...
        if (this.props.points > 0) {
            return this.props.horse.getIn(['racingFees', (this.props.points - 1)]);
        }
        return this.props.horse.get('standardFee');
    }

    render () {
        return (<div className="fee-section">
            <div><MoneyInlineHelper label="Cost" amount={this.props.horse.get('initialPrice')}/></div>
            <div><MoneyInlineHelper label="Fee" amount={this.countFee()}/></div>
            <div className="racingPoints">
                { '*'.repeat(this.props.points) }
            </div>
        </div>);
    }
}

HorseField.propTypes = {
    horse: PropTypes.object.isRequired,
    points: PropTypes.number.isRequired
};
