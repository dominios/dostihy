import React from 'react';
import { connect } from 'react-redux';
import { getOwner, hasFullStable, canBet, getPlayerOnTurn, getCurrentField } from '../utils/utils';
import BetButton from './buttons/Bet';
import BuyButton from './buttons/Buy';
import BuyTokensButton from './buttons/BuyTokens';
import PayButton from './buttons/Pay';
import ThrowDiceButton from './buttons/ThrowDice';
import EndTurnButton from './buttons/EndTurn';
import MoveButton from './buttons/Move';
import { isBeforeThrow, isAfterThrow } from '../data/states';
import { PAY_BANK, PAY_PLAYER } from '../data/actions';
import { TYPE_FORTUNE } from "../utils/constants";

/**
 * Toolbox Class.
 *
 * Container consisting of user action buttons.
 */
class Toolbox extends React.Component {

    /**
     * @todo
     * @return {XML}
     */
    renderBet () {
        return canBet(this.props.currentPlayer) && isBeforeThrow(this.props.currentRound) && <BetButton/>;
    }

    /**
     * @todo
     * @return {XML}
     */
    renderPay () {
        const actionRequired = this.props.currentRound.get('actionRequired');
        if (actionRequired) {
            if (actionRequired.get('type') === PAY_BANK) {
                return <PayButton
                    amount={actionRequired.get('amount')}
                    recipient="BANK"
                    action={actionRequired.toJS()}
                />;
            }
            if (actionRequired.get('type') === PAY_PLAYER) {
                return <PayButton
                    amount={actionRequired.get('amount')}
                    recipient={actionRequired.getIn(['to', 'name'])}
                    action={actionRequired.toJS()}
                />;
            }
        }
    }

    /**
     * @todo
     * @return {*}
     */
    renderBuyRacingPoints () {
        const field = this.props.currentField;
        if (isAfterThrow(this.props.currentRound) && field.get('type') === 'HORSE' && hasFullStable(this.props.currentPlayer, field.getIn(['horse', 'group']))) {
            return <BuyTokensButton
                currentPlayer={this.props.currentPlayer}
                currentField={this.props.currentField}
            />;
        }
        return null;
    }

    renderBuy () {
        const allowed = ['HORSE', 'TRAINER', 'TRANSPORT', 'STABLES'];
        if (isAfterThrow(this.props.currentRound) && allowed.indexOf(this.props.currentField.get('type')) !== -1) {
            return <BuyButton
                currentPlayer={this.props.currentPlayer}
                currentPlayerIndex={this.props.currentPlayerIndex}
                fieldId={this.props.currentField.get('id')}
                owner={this.props.ownedBy}
            />;
        }
    }

    renderThrowDice () {
        if (isBeforeThrow(this.props.currentRound)) {
            return <ThrowDiceButton/>;
        } else {
            const rolls = this.props.currentRound.get('rolls');
            let toResolve = rolls.reduce((sum, n) => {
                return sum + n;
            });
            const dices = [];
            if (toResolve > 6) {
                do {
                    dices.push(6);
                    toResolve -= 6;
                } while (toResolve > 6);
                dices.push(toResolve);
            } else {
                dices.push(toResolve);
            }
            return <div className="throws">
                {dices.reverse().map((amount, index) => <span key={`${amount}-${index}`}
                                                              className={`dice dice-${amount}`}></span>)}
            </div>;
        }
    }

    renderMove () {
        if (this.props.currentRound.get('actionRequired') && this.props.currentField.get('type') === TYPE_FORTUNE) {
            return <MoveButton
                action={this.props.currentRound.get('actionRequired').toJS()}
            />;
        }
    }

    renderEndTurn () {
        if (!this.props.currentRound.get('actionRequired') && isAfterThrow(this.props.currentRound)) {
            return <EndTurnButton/>;
        }
    }

    /**
     * Renders entire toolbox (all buttons).
     *
     * @return {XML}
     */
    render () {

        if (this.props.currentPlayer.get('ai')) {
            return <div className="interaction-container">
                Wait for other player to complete his turn.
            </div>;
        }

        return <div className="interaction-container">
            {this.renderBet()}
            {this.renderBuy()}
            {this.renderBuyRacingPoints()}
            {this.renderPay()}
            {this.renderThrowDice()}
            {this.renderMove()}
            {this.renderEndTurn()}
        </div>;
    }
}

const mapStateToProps = function (state) {

    const currentPlayer = getPlayerOnTurn(state);
    const currentField = getCurrentField(state);

    return {
        currentRound: state.get('currentRound'),
        currentPlayer: currentPlayer,
        currentPlayerIndex: state.get('playerOnTurn'),
        currentField: currentField,
        ownedBy: getOwner(currentField, state.get('players')) || false
    };
};

export default connect(mapStateToProps)(Toolbox);