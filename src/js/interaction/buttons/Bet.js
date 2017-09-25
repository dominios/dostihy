import React from 'react';
import { connect } from 'react-redux';
import { confirmBet, startBet } from '../../data/actions';
import { STATE_BETTING_BET, STATE_BETTING_CHOOSE } from "../../data/states";

class BetButton extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            betting: false,
            amount: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleStartBet = this.handleStartBet.bind(this);
        this.handleCancelBet = this.handleCancelBet.bind(this);
        this.handleConfirmBet = this.handleConfirmBet.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            isChoosingHorse: nextProps.isChoosingHorse
        });
    }

    handleChange (event) {
        this.setState({
            amount: event.target.value
        });
    }

    handleStartBet () {
        this.setState({
            isChoosingHorse: true
        });
        this.props.startBet();
    }

    handleCancelBet () {
        this.setState({
            isChoosingHorse: false
        });
    }

    handleConfirmBet () {
        // @todo check againts player money: not possible to bet more than he has
        if (this.props.betInProcess && this.state.amount >= 20) {
            this.props.confirmBet(this.props.betInProcess, this.state.amount);
        }
    }

    renderChooseHorse () {
        return <div>
            Choose Horse
        </div>;
    }

    renderBet () {
        return <div>
            <input
                type="number"
                placeholder="to bet"
                value={this.state.amount}
                onChange={this.handleChange}
            />
            <button
                onClick={this.handleConfirmBet}
            >
                Confirm
            </button>
        </div>;
    }

    renderStartBetting () {
        return <button
            onClick={this.handleStartBet}
        >
            BET
        </button>;
    }

    render () {
        if (this.props.isChoosingHorse) {
            return this.renderChooseHorse();
        } else if (this.props.isBetting) {
            return this.renderBet();
        } else {
            return this.renderStartBetting();
        }
    }

}

const mapStateToProps = (state) => {

    let bets = state.getIn(['currentRound', 'bets']);
    let betInProcess = false;
    if (bets.size > 0) {
        betInProcess = bets.filter(item => item.get('status') === 'IN_PROCESS').first();
    }

    return {
        currentRound: state.get('currentRound'),
        isChoosingHorse: state.getIn(['currentRound', 'state']) === STATE_BETTING_CHOOSE,
        isBetting: state.getIn(['currentRound', 'state']) === STATE_BETTING_BET,
        betInProcess: betInProcess && betInProcess.get('horse')
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startBet: () => dispatch(startBet()),
        confirmBet: (horse, amount) => dispatch(confirmBet(horse, amount))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BetButton);
