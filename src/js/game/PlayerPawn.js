import React from 'react';

export default class PlayerPawn extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return <div className="pawn">
            { this.props.index + 1 }
        </div> ;
    }
}

PlayerPawn.defaultProps = {
};

PlayerPawn.propTypes = {
    index: React.PropTypes.number.isRequired
};
