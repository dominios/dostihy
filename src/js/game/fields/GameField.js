import React from 'react';
import PropTypes from 'prop-types';
import HorseField from './HorseField';
import ParkingField from './ParkingField';

export default class GameField extends React.Component {

    constructor (props) {
        super(props);
    }

    renderOwnership (field) {

        const applicable = ['HORSE', 'TRAINER', 'STABLES', 'TRANSPORT'];

        if (applicable.indexOf(field.get('type')) === -1) {
            return null;
        }

        // search for owner
        const players = this.props.players.toJS();
        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            const fieldId = parseInt(field.get('id'), 10);
            if (player.inventory.indexOf(fieldId) !== -1) {
                return <div className="ownership free" style={{background: player.color}}>{ player.name }</div>;
            }
        }

        return <div className="ownership free">Free</div>;
    }

    render () {

        let content;

        switch (this.props.field.get('type')) {
            case 'HORSE': content = <HorseField horse={this.props.field.get('horse')}/>; break;
            case 'PARKING': content = <ParkingField/>; break;
            default: break;
        }

        return (<div
            id={`field-${this.props.field.get('id')}`}
            className={`field field-${this.props.field.get('type').toLowerCase()}`}
        >
            <div className="pawns-placeholder"></div>
            <div className="field-label">
                #{ this.props.field.get('id')} { this.props.field.getIn(['text', 'name'])}
            </div>
            <div className="content">
                { content }
            </div>
            { this.renderOwnership(this.props.field) }
        </div>);

    }
}

GameField.propTypes = {
    field: PropTypes.object.isRequired,
    players: PropTypes.object.isRequired
};
