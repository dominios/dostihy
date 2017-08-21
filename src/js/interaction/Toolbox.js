import React from 'react';
import { connect } from 'react-redux';
import { getOwner, hasFullStable, canBet, getPlayerOnTurn, getCurrentField } from '../utils/utils';
import BetButton from './buttons/Bet';
import BuyButton from './buttons/Buy';
import BuyTokensButton from './buttons/BuyTokens';
import PayButton from './buttons/Pay';
import ThrowDiceButton from './buttons/ThrowDice';
import EndTurnButton from './buttons/EndTurn';
import { PAY_BANK, PAY_PLAYER } from '../data/actions';
import { STATE_AFTER_THROW, STATE_BEFORE_THROW, STATE_AFTER_PAYMENT } from '../data/states';

/**
 * Toolbox Class.
 *
 * Container consisting of user action buttons.
 */
class Toolbox extends React.Component {

    /**
     * @todo
     * @return {Boolean|boolean|XML}
     */
    renderBet () {
        const isBeforeThrow = this.props.currentRound.get('state') === STATE_BEFORE_THROW;
        return canBet(this.props.currentPlayer) && isBeforeThrow && <BetButton/>;
    }

    /**
     * @todo
     * @return {XML}
     */
    renderPay () {
        const actionRequired = this.props.currentRound.get('actionRequired');
        if (actionRequired) {
            if (actionRequired.get('type') === PAY_BANK) {
                return <PayButton amount={actionRequired.get('amount')} recipient="BANK"
                                  action={actionRequired.toJS()}/>;
            }
            if (actionRequired.get('type') === PAY_PLAYER) {
                return <PayButton amount={actionRequired.get('amount')} recipient={actionRequired.getIn(['to', 'name'])}
                                  action={actionRequired.toJS()}/>;
            }
        }
    }

    /**
     * @todo
     * @return {*}
     */
    renderBuyRacingPoints () {
        const field = this.props.currentField;
        const isAfterThrow = this.props.currentRound.get('state') === STATE_AFTER_THROW;
        if (isAfterThrow && field.get('type') === 'HORSE' && hasFullStable(this.props.currentPlayer, field.getIn(['horse', 'group']))) {
            return <BuyTokensButton
                currentPlayer={this.props.currentPlayer}
                currentField={this.props.currentField}
            />;
        }
        return null;
    }

    renderBuy () {
        const allowed = ['HORSE', 'TRAINER', 'TRANSPORT', 'STABLES'];
        const isAfterThrow = this.props.currentRound.get('state') === STATE_AFTER_THROW;
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
        if (this.props.currentRound.get('state') === STATE_BEFORE_THROW) {
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
                { dices.reverse().map((amount, index) => <span key={`${amount}-${index}`} className={`dice dice-${amount}`}></span>)}
            </div>;
        }
    }

    renderEndTurn () {
        const statesAfterThrow = [STATE_AFTER_THROW, STATE_AFTER_PAYMENT];
        const isAfterThrow = statesAfterThrow.indexOf(this.props.currentRound.get('state')) !== -1;
        if (!this.props.currentRound.get('actionRequired') && isAfterThrow) {
            return <EndTurnButton/>;
        }
    }

    /**
     * Renders entire toolbox (all buttons).
     *
     * @return {XML}
     */
    render () {
        return <div className="interaction-container">
            {this.renderBet()}
            {this.renderBuy()}
            {this.renderBuyRacingPoints()}
            {this.renderPay()}
            {this.renderThrowDice()}
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