import React from 'react';
import { connect } from 'react-redux';
import { canBet, getPlayerOnTurn } from "../utils/utils";
import { isBeforeThrow } from "../data/states";
import { throwDice } from "../data/actions";

class AIObserver extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            round: null,
            player: null,
            isAiActive: false
        };
    }

    resolveProps (props) {

        this.setState({
            round: props.round
        });

        if (this.props.player.get('index') !== props.player.get('index')) {
            this.setState({
                player: props.player
            });
            console.info('AI CHANGING PLAYER');
        }

        if (props.player.get('ai') === true) {
            this.setState({
                isAiActive: true
            });
            console.info('AI IS ACTIVE');
        } else {
            this.setState({
                isAiActive: false
            });
            console.info('AI IS INACTIVE');
        }
    }

    makeTurn () {

        if (isBeforeThrow(this.state.round)) {

            if (canBet(this.state.player)) {
                // @todo make AI think about betting...
                console.warn('AI BETTING NOT YET IMPLEMENTED');
            }

            // we can just throw a dice
            console.info('AI throwing a dice...');
            this.props.throwDice();
        }


    }

    componentDidMount () {
        this.resolveProps(this.props);
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
        throwDice: () => dispatch(throwDice())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AIObserver);
