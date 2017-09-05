import React from 'react';
import PropTypes from 'prop-types';
import HorseField from './HorseField';
import ParkingField from './ParkingField';
import { getOwner } from '../../utils/utils';
import { STATE_BETTING } from "../../data/states";
import { connect } from "react-redux";

class GameField extends React.Component {

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
                return <div className={`ownership player-background-${player.index}`}></div>;
            }
        }

        return <div className="ownership free">Free</div>;
    }

    render () {

        let content;
        const owner = getOwner(this.props.field, this.props.players);

        const classList = [`field`, `field-${this.props.field.get('type').toLowerCase()}`];

        switch (this.props.field.get('type')) {
            case 'HORSE': {
                const points = owner && owner.getIn(['racingPoints', this.props.field.get('id')]);
                content = <HorseField
                    horse={this.props.field.get('horse')}
                    points={points || 0} owner={owner}
                />;
                if (this.props.isBetting && points >= 3 && owner !== this.props.currentPlayer) {
                    classList.push('bet-available');
                }
                break;
            }
            case 'PARKING':
                content = <ParkingField/>;
                break;
            default:
                break;
        }

        return (<div
            id={`field-${this.props.field.get('id')}`}
            className={classList.join(' ')}
        >
            <div className="pawns-placeholder"></div>
            <div className="field-label">
                {this.props.field.getIn(['text', 'name'])}
            </div>
            <div className="content">
                {content}
            </div>
            {this.renderOwnership(this.props.field)}
        </div>);

    }
}

GameField.propTypes = {
    field: PropTypes.object.isRequired,
    players: PropTypes.object.isRequired
};

const mapStateToProps = function (state) {
    return {
        isBetting: state.getIn(['currentRound', 'state']) === STATE_BETTING,
        currentPlayer: state.getIn(['players', state.get('playerOnTurn')])
    }
};

export default connect(mapStateToProps)(GameField);
