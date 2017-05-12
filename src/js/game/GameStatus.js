import React from 'react';
import { connect } from 'react-redux';
import { throwDice, endTurn } from '../data/actions';

class GameStatus extends React.Component {

    constructor (props) {
        super(props);

        this.handleThrowDiceClick = this.handleThrowDiceClick.bind(this);
        this.handleEndTurn = this.handleEndTurn.bind(this);
    }

    handleThrowDiceClick () {
        this.props.throwDice();
    }

    handleEndTurn () {
        this.props.endTurn();
    }

    renderThrows () {
        const throws = this.props.lastThrows.toJS();
        if (throws[0] === 6) {
            return `${throws[0]}, ${throws[1]}`;
        } else {
            return throws[1];
        }
    }

    renderLog () {
        return (<div className="logs">
            { this.props.log.map((message, index) => {
                return <div key={index}>{message}</div>
            })}
        </div>)
    }

    renderCurrentPlayer () {
        return (
            <section className="bold">
                Player on Turn: <strong style={{color: this.props.currentPlayer.get('color')}}>{ this.props.currentPlayer.get('name') }</strong>
            </section>
        );
    }

    render () {

        return (<div className="box-info game-status">
            {/*{ this.renderCurrentPlayer() }*/}
            {/*<section className="bold">Last Throw: <span>{ this.renderThrows() }</span></section>*/}
            <button onClick={this.handleThrowDiceClick}>Throw a dice</button>
            <button onClick={this.handleEndTurn}>End turn</button>
            { this.renderLog() }
        </div>);
    }
}

GameStatus.defaultProps = {};

GameStatus.propTypes = {};

const mapStateToProps = function (state) {
    const throws = state.get('diceThrows');
    const last2 = throws.takeLast(2);
    return {
        lastThrows: last2,
        currentPlayer: state.getIn(['players', state.get('playerOnTurn')]),
        log: state.get('log').takeLast(3)
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        throwDice: () => dispatch(throwDice()),
        endTurn: () => dispatch(endTurn())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameStatus);