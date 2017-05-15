import React from 'react';

export default class HorseField extends React.Component {

    render () {
        return (<div className="fee-section">
            <div>Cost: <span>$ { this.props.horse.get('initialPrice') }</span></div>
            <div>Fee: <span>$ { this.props.horse.get('standardFee') }</span></div>
        </div>);
    }
}

HorseField.defaultProps = {
};

HorseField.propTypes = {
    horse: React.PropTypes.object.isRequired
};
