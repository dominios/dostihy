import React from 'react';
import $ from 'jquery';

export default class PlayerPawn extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            position: props.player.get('field')
        };
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            position: nextProps.player.get('field')
        });
    }

    componentDidUpdate () {
        const target = $(`#field-${this.state.position + 1}`);
        $(`#pawn-${this.props.index}`).css({
            top: (target.position().top + 'px'),
            left: (target.position().left + 'px')
        });
    }

    render () {
        return <div className="pawn" id={`pawn-${this.props.index}`} style={{background: this.props.player.get('color')}}>
            { `${this.props.index}` }
        </div> ;
    }
}

PlayerPawn.defaultProps = {
};

PlayerPawn.propTypes = {
    index: React.PropTypes.number.isRequired,
    player: React.PropTypes.object.isRequired
};
