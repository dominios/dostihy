import React from 'react';
import { connect } from 'react-redux';

class GameStatus extends React.Component {

    renderLog () {
        return (<div className="logs">
            { this.props.log.map((message, index) => {
                return <div key={index}>{message}</div>
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