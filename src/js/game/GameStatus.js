import React from 'react';
import { connect } from 'react-redux';
import PlayerInlineHelper from '../utils/helpers/Player';
import MoneyInlineHelper from '../utils/helpers/Money';

class GameStatus extends React.Component {

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
                    return <span>
                        <PlayerInlineHelper player={message.get('who')}/>
                        &nbsp;payed
                        &nbsp;<MoneyInlineHelper amount={message.get('amount')}/>
                        &nbsp;to
                        &nbsp;<PlayerInlineHelper player={message.get('to')}/>
                        &nbsp;for visiting
                        &nbsp;{message.get('what')}.
                    </span>;

                case 'buy':
                    return <span>
                        <PlayerInlineHelper player={message.get('player')}/>
                        &nbsp;bought
                        &nbsp;<i>{ message.getIn(['what', 'text', 'name'])}</i>
                        &nbsp;for
                        &nbsp;<MoneyInlineHelper amount={message.get('amount')}/>.
                    </span>;
                default:
                    break;
            }
        } else {
            return message;
        }
    }

    renderLog () {
        return (<div className="logs">
            { this.props.log.map((message, index) => {
                return <div key={index}>{this.renderMessage(message)}</div>
            })}
        </div>)
    }

    render () {
        return (<div className="box-info game-status">
            { this.renderLog() }
        </div>);
    }
}

const mapStateToProps = function (state) {
    return {
        log: state.get('log').takeLast(3),
        currentRound: state.get('currentRound')
    };
};

export default connect(mapStateToProps)(GameStatus);