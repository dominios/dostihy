import React from 'react';
import { connect } from 'react-redux';
import { throwDice } from '../../data/actions';

class ThrowDiceButton extends React.Component {

    constructor (props) {
        super(props);

        this.handleThrowDiceClick = this.handleThrowDiceClick.bind(this);
    }

    handleThrowDiceClick () {
        this.props.throwDice();
    }

    render () {
        return <button onClick={this.handleThrowDiceClick}>Throw a dice</button>;
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        throwDice: () => dispatch(throwDice())
    };
};

export default connect(undefined, mapDispatchToProps)(ThrowDiceButton);
