import React from 'react';
import { connect } from 'react-redux';

class GameMap extends React.Component {

    constructor (props) {
        super(props);
    }

    renderHorseSection (field) {

        if (!(field.get('type') === 'HORSE')) {
            return;
        }

        return (<div className="fee-section">
            <div>Cost: <span>{ field.getIn(['horse', 'initialPrice']) }</span></div>
            <div>Fee: <span>{ field.getIn(['horse', 'standardFee']) }</span></div>
            <hr/>
            { field.getIn(['horse', 'racingFees']).toJS().map((fee, index) => {
               return <div key={index}>{`${index} races: ${fee}`}</div>
            })}
        </div>);

    }

    renderField (field, index) {
        const stableClass = field.get('type') === 'HORSE' ? `stable-${field.getIn(['horse', 'group'])}`: '';
        return (<div
            key={index}
            id={`field-${field.get('id')}`}
            className={`field field-${field.get('type').toLowerCase()} ${stableClass}`}
        >
            { field.getIn(['text', 'name'])}
            { this.renderHorseSection(field)}
        </div>);
    }

    render () {
        return <div className="game-map">
            { this.props.fields.map(this.renderField.bind(this))}
        </div>;
    }
}

GameMap.defaultProps = {};

GameMap.propTypes = {};

const mapStateToProps = (state) => {
    return {
        fields: state.get('fields')
    }
};

export default connect(mapStateToProps)(GameMap);
