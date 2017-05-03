import React from 'react';
import { connect } from 'react-redux';
import PlayerPawn from './PlayerPawn';
import HorseField from './fields/Horse';

class GameMap extends React.Component {

    constructor (props) {
        super(props);
    }

    renderHorseSection (field) {

        if (!(field.get('type') === 'HORSE')) {
            return;
        }

        return <HorseField
            horse={field.get('horse').toJS()}
        />;

    }

    renderOwnership (field) {

        const applicable = ['HORSE', 'TRAINER', 'STABLES', 'TRANSPORT'];

        if (applicable.indexOf(field.get('type')) > -1) {
            return <div className="ownership free">Free</div>;
        }
    }

    renderField (field, index) {

        let content;

        switch (field.get('type')) {
            case 'HORSE': content = this.renderHorseSection(field); break;
            default: break;
        }

        return (<div
            key={index}
            id={`field-${field.get('id')}`}
            className={`field field-${field.get('type').toLowerCase()}`}
        >
            <div className="pawns-placeholder"></div>
            <div className="field-label">
                { field.getIn(['text', 'name'])}
            </div>
            <div className="content">
                { content }
            </div>
            { this.renderOwnership(field) }
        </div>);

    }

    render () {
        return <div className="game-map">
            { this.props.fields.map(this.renderField.bind(this))}

            <PlayerPawn index={0} />

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
