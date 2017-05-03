import React from 'react';
import { connect } from 'react-redux';
import { throwDice } from '../data/actions';

class GameStatus extends React.Component {

    constructor (props) {
        super(props);

        this.handleThrowDiceClick = this.handleThrowDiceClick.bind(this);
    }

    handleThrowDiceClick () {
        this.props.throwDice();
    }

    renderThrows () {
        const throws = this.props.lastThrows.toJS();
        if (throws[0] === 6) {
            return `${throws[0]}, ${throws[1]}`;
        } else {
            return throws[1];
        }
    }

    renderCurrentPlayer () {
        return (
            <section className="bold">
                Player on Turn: <strong style={{color: this.props.currentPlayer.get('color')}}>{ this.props.currentPlayer.get('name') }</strong>
            </section>
        );
    }

    render () {

        return (<div className="box-info gameStatus">
            <h6>Game Status</h6>
            { this.renderCurrentPlayer() }
            <section className="bold">Last Throw: <span>{ this.renderThrows() }</span></section>
            <button onClick={this.handleThrowDiceClick}>Throw a dice</button>
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
        currentPlayer: state.getIn(['players', state.get('playerOnTurn')])
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        throwDice: () => dispatch(throwDice())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameStatus);