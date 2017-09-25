import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import HorseField from './HorseField';
import ParkingField from './ParkingField';
import { getOwner } from '../../utils/utils';
import { isBetting, STATE_BETTING_CHOOSE } from "../../data/states";
import { TYPE_HORSE, TYPE_STABLES, TYPE_TRAINER, TYPE_TRANSPORT } from "../../utils/constants";
import { chooseHorseBet } from "../../data/actions";

class GameField extends React.Component {

    constructor (props) {
        super(props);

        this.handleChooseBet = this.handleChooseBet.bind(this);
    }

    handleChooseBet () {
        if (!this.props.isChoosingHorse) {
            return;
        }
        this.props.chooseForBet(this.props.field);
    }

    renderOwnership (field) {

        const applicable = [TYPE_HORSE, TYPE_TRAINER, TYPE_STABLES, TYPE_TRANSPORT];

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
                const canBet = this.props.isChoosingHorse && points >= 3 && owner !== this.props.currentPlayer

                content = <HorseField
                    horse={this.props.field.get('horse')}
                    points={points || 0} owner={owner}
                    canBet={canBet}
                />;

                if (canBet) {
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
            onClick={this.handleChooseBet}
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
        isChoosingHorse: isBetting(state.get('currentRound')),
        currentPlayer: state.getIn(['players', state.get('playerOnTurn')])
    }
};

const mapDispatchToProps = function (dispatch) {
    return {
        chooseForBet: (horse) => dispatch(chooseHorseBet(horse))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameField);
