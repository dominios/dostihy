import React from 'react';
import MoneyInlineHelper from '../../utils/helpers/Money';

export default class HorseField extends React.Component {

    render () {
        return (<div className="fee-section">
            <div><MoneyInlineHelper label="Cost" amount={this.props.horse.get('initialPrice')}/></div>
            <div><MoneyInlineHelper label="Fee" amount={this.props.horse.get('standardFee')}/></div>
        </div>);
    }
}

HorseField.defaultProps = {
};

HorseField.propTypes = {
    horse: React.PropTypes.object.isRequired
};
