import React from 'react';
import { connect } from 'react-redux';
import PlayerInlineHelper from '../utils/helpers/Player';
import MoneyInlineHelper from '../utils/helpers/Money';
import { playerActionsReducer } from "../data/reducers";

/**
 * Game Status Class.
 *
 * Shows logs and other important information.
 */
class GameStatus extends React.Component {

    /**
     * Renders the single message from log.
     *
     * @param message
     * @return {*}
     *
     * @todo export to separate component
     */
    renderMessage (message) {
        if (typeof message === 'object') {
            switch (message.get('type')) {

                case 'turnStarted':
                    return <span>
                        <PlayerInlineHelper player={message.get('player')}/>
                        &nbsp;turn started.
                    </span>;

                case 'throw':
                    return <span>
                        <PlayerInlineHelper player={message.get('player')}/>
                        &nbsp;rolled
                        &nbsp;{message.get('roll')}.
                    </span>;

                case 'crossStart':
                    return <span>
                        <PlayerInlineHelper player={message.get('player')}/>
                        &nbsp;gained
                        &nbsp;<MoneyInlineHelper amount={4000}/>
                        &nbsp;for crossing START.
                    </span>;

                case 'parkingEmpty':
                    return <span>Parking empty.</span>;

                case 'parkingIncome':
                    return <span>
                        <PlayerInlineHelper player={message.get('player')}/>
                        &nbsp;gained
                        &nbsp;<MoneyInlineHelper amount={message.get('amount')}/>
                        &nbsp;from parking.
                    </span>;

                case 'pay':
                    return <span>
                        <PlayerInlineHelper player={message.get('player')}/>
                        &nbsp;payed
                        &nbsp;<MoneyInlineHelper amount={message.get('amount')}/>
                        &nbsp;for
                        &nbsp;{message.get('reason')}
                    </span>;

                case 'payVisit':
                    if (message.get('amount') > 0) {
                        return <span>
                            <PlayerInlineHelper player={message.get('who')}/>
                            &nbsp;payed
                            &nbsp;<MoneyInlineHelper amount={message.get('amount')}/>
                            &nbsp;to
                            &nbsp;<PlayerInlineHelper player={message.get('to')}/>
                            &nbsp;for visiting
                            &nbsp;{message.get('what')}.
                        </span>;
                    } else {
                        return <span>
                            <PlayerInlineHelper player={message.get('to')}/>
                            &nbsp;payed
                            &nbsp;<PlayerInlineHelper player={message.get('who')}/>
                            &nbsp;<MoneyInlineHelper amount={message.get('amount') * -1}/>
                            &nbsp;for successful bet on
                            &nbsp;{message.get('what')}.
                         </span>;
                    }

                case 'buy':
                    return <span>
                        <PlayerInlineHelper player={message.get('player')}/>
                        &nbsp;bought
                        &nbsp;<i>{message.getIn(['what', 'text', 'name'])}</i>
                        &nbsp;for
                        &nbsp;<MoneyInlineHelper amount={message.get('amount')}/>.
                    </span>;

                case 'bet':
                    return <span>
                        <PlayerInlineHelper player={message.get('player')}/>
                        &nbsp;bet
                        &nbsp;<MoneyInlineHelper amount={message.get('amount')}/>
                        &nbsp;on
                        &nbsp;{message.getIn(['where', 'text', 'name'])}
                        &nbsp;(owner)
                        &nbsp;@TODO HELPER
                    </span>;

                case 'missedBet':
                    return <span>
                        <PlayerInlineHelper player={message.get('who')}/>
                        &nbsp;received
                        &nbsp;<MoneyInlineHelper amount={message.get('amount')}/>
                        &nbsp;for missed bet(s).
                    </span>;

                default:
                    break;
            }
        } else {
            return message;
        }
    }

    /**
     * Render log of the messages.
     *
     * @return {XML}
     */
    renderLog () {
        return (<div className="logs">
            {this.props.log.map((message, index) => {
                return <div key={index}>{this.renderMessage(message)}</div>
            })}
        </div>)
    }

    /**
     * Renders the game status box.
     *
     * @return {XML}
     */
    render () {
        return (<div className="box-info game-status">
            {this.renderLog()}
        </div>);
    }
}

const mapStateToProps = function (state) {
    return {
        log: state.get('log').takeLast(20).reverse(),
        currentRound: state.get('currentRound')
    };
};

export default connect(mapStateToProps)(GameStatus);