import React from 'react';
import { connect } from 'react-redux';
import { canBet, getPlayerOnTurn } from "../utils/utils";
import { isAfterThrow, isBeforeThrow } from "../data/states";
import { endTurn, throwDice } from "../data/actions";

class AIObserver extends React.Component {

    constructor (props) {
        super(props);


        // this.state = {
        //     round: null,
        //     player: null,
        //     isAiActive: null
        // };

        this.state = {
            round: props.round,
            player: props.player,
            isAiActive: props.player.get('ai')
        };
    }

    resolveProps (props) {

        const nextState = {
            round: props.round
        };

        if (this.props.player.get('index') !== props.player.get('index')) {
            console.info('AI CHANGING PLAYER');
            nextState.player = props.player;
        }

        if (props.player.get('ai') === true) {
            nextState.isAiActive = true;
        } else {
            nextState.isAiActive = false;
        }

        this.setState(nextState);
    }

    makeTurn () {

        // delay for the AI to take action to simulate thinking time
        setTimeout(() => {

            if (!this.state.isAiActive) {
                return;
            }

            if (isBeforeThrow(this.state.round)) {

                if (canBet(this.state.player)) {
                    // @todo make AI think about betting...
                    console.warn('AI BETTING NOT YET IMPLEMENTED');
                }

                // we can just throw a dice
                console.info('AI throwing a dice...');
                this.props.throwDice();
            }

            else if (isAfterThrow(this.state.round)) {

                if (this.state.round.get('actionRequired')) {
                    console.info('AI ACTION IS REQUIRED...');
                } else {
                    console.info('AI IS ENDING A TURN');
                    this.props.endTurn();
                }
            }

        }, 3000);

    }

    componentDidMount () {
        this.resolveProps(this.props);
        this.makeTurn();
    }

    componentWillReceiveProps (nextProps) {
        this.resolveProps(nextProps);
    }

    componentDidUpdate (prevProps, prevState) {

        if (!this.state.isAiActive) {
            return;
        }

        if (this.state.round.get('state') !== prevState.round.get('state')) {
            this.makeTurn();
        }
    }

    render () {
        return null;
    }
}

const mapStateToProps = function (state) {
    return {
        player: getPlayerOnTurn(state),
        round: state.get('currentRound')
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        throwDice: () => dispatch(throwDice()),
        endTurn: () => dispatch(endTurn())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AIObserver);
