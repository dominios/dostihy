import React from 'react';
import { connect } from 'react-redux';
import { getOwner } from '../utils/utils';
import BuyButton from './buttons/Buy';
import PayButton from './buttons/Pay';
import ThrowDiceButton from './buttons/ThrowDice';
import EndTurnButton from './buttons/EndTurn';
import { STATE_AFTER_THROW, STATE_AFTER_PAYMENT, PAY_BANK, PAY_PLAYER } from '../data/actions';

class Toolbox extends React.Component {

    renderPay () {
        const actionRequired = this.props.currentRound.get('actionRequired');
        if (actionRequired) {
            if (actionRequired.get('type') === PAY_BANK) {
                return <PayButton amount={actionRequired.get('amount')} recipient="BANK" action={actionRequired.toJS()} />;
            }
        }
    }

    renderBuy () {
        const allowed = ['HORSE', 'TRAINER', 'TRANSPORT', 'STABLES'];
        const isAfterThrow = this.props.currentRound.get('state') === 'STATE_AFTER_THROW';
        if (isAfterThrow && allowed.indexOf(this.props.currentField.get('type')) !== -1) {
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
        const statesAfterThrow = [STATE_AFTER_THROW, STATE_AFTER_PAYMENT];
        const isAfterThrow = statesAfterThrow.indexOf(this.props.currentRound.get('state')) !== -1;
        if (!this.props.currentRound.get('actionRequired') && isAfterThrow) {
            return <EndTurnButton/>;
        }
    }

    render () {
        return <div className="interaction-container">
            { this.renderBuy() }
            { this.renderPay() }
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