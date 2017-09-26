import React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from "prop-types";

class MoveButton extends React.Component {

    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        this.props.dispatch(this.props.action);
    }

    render () {
        return <button onClick={this.handleClick}>
            Move
        </button>;
    }
}

MoveButton.propTypes = {
    action: PropTypes.object.isRequired
};

const mapStateToProps = function (state) {
    return {};
};

const mapDispatchToProps = function (dispatch) {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveButton);
