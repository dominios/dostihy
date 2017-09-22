import React from 'react';
import { connect } from 'react-redux';
import { canBet, getCurrentField, getOwner, getPlayerOnTurn } from "../utils/utils";
import { isAfterThrow, isBeforeThrow } from "../data/states";
import { buyCard, endTurn, throwDice } from "../data/actions";
import { shouldBuyItem } from "../utils/ai";
import { TYPE_HORSE, TYPE_STABLES, TYPE_TRAINER, TYPE_TRANSPORT } from "../utils/constants";

const AI_TIMEOUT = 1000;

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
            isAiActive: props.player.get('ai'),
            field: props.field
        };
    }

    resolveProps (props) {

        const nextState = {
            round: props.round,
            field: props.field
        };

        if (this.props.player.get('index') !== props.player.get('index')) {
            console.info('AI CHANGING PLAYER');
            nextState.player = props.player;
        }

        nextState.isAiActive = props.player.get('ai') === true;

        this.setState(nextState);
    }

    makeTurn () {


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
            const buyable = [TYPE_HORSE, TYPE_TRAINER, TYPE_TRANSPORT, TYPE_STABLES];
            const owner = getOwner(this.state.field, this.props.players);

            if (this.state.round.get('actionRequired')) {
                console.info('AI ACTION IS REQUIRED...');
                this.props.dispatch(this.state.round.get('actionRequired').toJS());
            }

            else if (buyable.indexOf(this.state.field.get('type')) !== -1 && !owner) {

                console.info('AI IS DECIDING TO BUY SOMETHING');
                const shouldBuy = shouldBuyItem(this.state.player, this.state.field);
                if (shouldBuy) {
                    console.info('AI decided to buy an item');
                    this.props.buyCard(this.state.player.get('index'), this.state.field.get('id'));
                    setTimeout(() => {
                        this.makeTurn();
                    }, AI_TIMEOUT);
                } else {
                    console.info('AI decided NOT to buy an item');
                    this.props.endTurn();
                }
            }

            else {
                console.info('AI IS ENDING A TURN');
                this.props.endTurn();
            }
        }


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
            // delay for the AI to take action to simulate thinking time
            setTimeout(() => {
                console.info('AI is invoking a turn...');
                this.makeTurn();
            }, AI_TIMEOUT);
        }
    }

    render () {
        return null;
    }
}

const mapStateToProps = function (state) {
    return {
        players: state.get('players'),
        player: getPlayerOnTurn(state),
        round: state.get('currentRound'),
        field: getCurrentField(state)
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        dispatch,
        throwDice: () => dispatch(throwDice()),
        endTurn: () => dispatch(endTurn()),
        buyCard: (playerIndex, fieldId) => dispatch(buyCard(playerIndex, fieldId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AIObserver);
