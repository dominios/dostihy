import React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from "prop-types";
import { cancelDistanc } from "../../data/actions";

class CancelDistancButton extends React.Component {

    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        this.props.cancelDistance(this.props.player);
    }

    render () {
        return <button
            onClick={this.handleClick}
        >
            Use cancel distanc action card
        </button>;
    }
}

CancelDistancButton.propTypes = {
    player: PropTypes.object.isRequired
};

const mapDispatchToProps = function (dispatch) {
    return {
        cancelDistance: (player) => dispatch(cancelDistanc(player))
    };
};

export default connect(undefined, mapDispatchToProps)(CancelDistancButton);
