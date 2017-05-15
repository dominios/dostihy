import React from 'react';
import { connect } from 'react-redux';
import { getOwner } from '../utils/utils';
import BuyButton from './buttons/Buy';
import ThrowDiceButton from './buttons/ThrowDice';
import EndTurnButton from './buttons/EndTurn';

class Toolbox extends React.Component {

    renderBuy () {
        const allowed = ['HORSE', 'TRAINER'];
        if (allowed.indexOf(this.props.currentField.get('type')) !== -1) {
            return <BuyButton
                currentPlayer={this.props.currentPlayer}
                currentPlayerIndex={this.props.currentPlayerIndex}
                fieldId={this.props.currentField.get('id')}
                owner={this.props.ownedBy}
            />;
        }
    }

    renderThrowDice () {
        if (this.props.currentRound.get('state') === 'STATE_BEFORE_THROW') {
            return <ThrowDiceButton/>;
        }
    }

    renderEndTurn () {
        return <EndTurnButton/>;
    }

    render () {
        return <div className="interaction-container">
            { this.renderBuy() }
            { this.renderThrowDice() }
            { this.renderEndTurn() }
        </div>;
    }
}

const mapStateToProps = function (state) {

    const currentPlayer = state.getIn(['players', state.get('playerOnTurn')]);
    const currentField = state.getIn(['fields', currentPlayer.get('field')]);

    return {
        currentRound: state.get('currentRound'),
        currentPlayer: currentPlayer,
        currentPlayerIndex: state.get('playerOnTurn'),
        currentField: currentField,
        ownedBy: getOwner(currentField, state.get('players')) || false
    };
};

export default connect(mapStateToProps)(Toolbox);