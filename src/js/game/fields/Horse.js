import React from 'react';

export default class HorseField extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {

        // const stableClass = field.get('type') === 'HORSE' ? `stable-${field.getIn(['horse', 'group'])}`: '';

        return (<div className="fee-section">
            <div>Cost: <span>$ { this.props.horse.initialPrice }</span></div>
            <div>Fee: <span>$ { this.props.horse.standardFee }</span></div>
            {/*{ this.props.horse.racingFees.map((fee, index) => {*/}
                {/*return <div key={index}>{`${index} races: ${fee}`}</div>*/}
            {/*})}*/}
        </div>);
    }
}

HorseField.defaultProps = {
};

HorseField.propTypes = {
    horse: React.PropTypes.shape({
        group: React.PropTypes.number.isRequired,
        initialPrice: React.PropTypes.number.isRequired,
        standardFee: React.PropTypes.number.isRequired,
        racingFees: React.PropTypes.array.isRequired,
        racingCost: React.PropTypes.number.isRequired
    })
};
