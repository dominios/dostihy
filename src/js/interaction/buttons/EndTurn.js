import React from 'react';
import { connect } from 'react-redux';
import { endTurn } from '../../data/actions';

class EndTurnButton extends React.Component {

    constructor (props) {
        super(props);

        this.handleEndTurn = this.handleEndTurn.bind(this);
    }

    handleEndTurn () {
        this.props.endTurn();
    }

    render () {
        return <button onClick={this.handleEndTurn}>End turn</button>;
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        endTurn: () => dispatch(endTurn())
    };
};

export default connect(undefined, mapDispatchToProps)(EndTurnButton);