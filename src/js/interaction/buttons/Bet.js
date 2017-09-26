import React from 'react';
import { connect } from 'react-redux';
import { confirmBet, startBet } from '../../data/actions';
import { STATE_BETTING_BET, STATE_BETTING_CHOOSE } from "../../data/states";
import MoneyInlineHelper from "../../utils/helpers/Money";

class BetButton extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            betting: false,
            amount: 0
        };

        this.handleStartBet = this.handleStartBet.bind(this);
        this.handleCancelBet = this.handleCancelBet.bind(this);
        this.handleConfirmBet = this.handleConfirmBet.bind(this);

        this.handleAdd20 = this.handleAdd20.bind(this);
        this.handleAdd100 = this.handleAdd100.bind(this);
        this.handleAdd200 = this.handleAdd200.bind(this);
        this.handleAdd400 = this.handleAdd400.bind(this);
        this.handleAdd1000 = this.handleAdd1000.bind(this);
        this.handleAdd2000 = this.handleAdd2000.bind(this);
        this.handleAdd10000 = this.handleAdd10000.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            isChoosingHorse: nextProps.isChoosingHorse,
            amount: 0
        });
    }

    handleAdd20 () {
        this.setState({
            amount: this.state.amount + 20
        });
    }

    handleAdd100 () {
        this.setState({
            amount: this.state.amount + 100
        });
    }

    handleAdd200 () {
        this.setState({
            amount: this.state.amount + 200
        });
    }

    handleAdd400 () {
        this.setState({
            amount: this.state.amount + 400
        });
    }

    handleAdd1000 () {
        this.setState({
            amount: this.state.amount + 1000
        });
    }

    handleAdd2000 () {
        this.setState({
            amount: this.state.amount + 2000
        });
    }

    handleAdd10000 () {
        this.setState({
            amount: this.state.amount + 10000
        });
    }

    handleReset () {
        this.setState({
            amount: 0
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
            <button onClick={this.handleAdd20}>
                <MoneyInlineHelper amount={20}/>
            </button>
            <button onClick={this.handleAdd100}>
                <MoneyInlineHelper amount={100}/>
            </button>
            <button onClick={this.handleAdd200}>
                <MoneyInlineHelper amount={200}/>
            </button>
            <button onClick={this.handleAdd400}>
                <MoneyInlineHelper amount={400}/>
            </button>
            <button onClick={this.handleAdd1000}>
                <MoneyInlineHelper amount={1000}/>
            </button>
            <button onClick={this.handleAdd2000}>
                <MoneyInlineHelper amount={2000}/>
            </button>
            <button onClick={this.handleAdd10000}>
                <MoneyInlineHelper amount={10000}/>
            </button>
            <button onClick={this.handleReset}>
                RESET
            </button>
            {this.state.amount > 0
                ? <button onClick={this.handleConfirmBet}>
                    BET <MoneyInlineHelper amount={this.state.amount}/>
                </button>
                : null
            }
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
