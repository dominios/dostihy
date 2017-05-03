import React from 'react';
import $ from 'jquery';

export default class PlayerPawn extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            position: props.position
        };
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            position: nextProps.position
        });
    }

    componentDidUpdate () {
        const target = $(`#field-${this.state.position + 1}`);
        $(`#pawn-${this.props.index}`).animate({
            top: (target.position().top + 'px'),
            left: (target.position().left + 'px')
        }, 500);
    }

    render () {
        return <div className="pawn" id={`pawn-${this.props.index}`}>
            { `${this.state.position}` }
        </div> ;
    }
}

PlayerPawn.defaultProps = {
};

PlayerPawn.propTypes = {
    index: React.PropTypes.number.isRequired,
    position: React.PropTypes.number.isRequired
};
