import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

/**
 * Single Player Pawn Class.
 */
export default class PlayerPawn extends React.Component {

    /**
     * Constructor.
     * @param {object} props.
     */
    constructor (props) {
        super(props);

        this.state = {
            position: props.player.get('field')
        };
    }

    /**
     * Updates the position of the pawn.
     *
     * @param {object} nextProps
     */
    componentWillReceiveProps (nextProps) {
        this.setState({
            position: nextProps.player.get('field')
        });
    }

    /**
     * Triggers the CSS transition (animation) of the pawn.
     */
    componentDidUpdate () {
        const target = $(`#field-${this.state.position + 1}`);
        $(`#pawn-${this.props.index}`).css({
            top: (target.position().top + 'px'),
            left: (target.position().left + 'px')
        });
    }

    /**
     * Renders the pawn.
     *
     * @return {XML}
     *
     * @todo generalize player color
     */
    render () {
        return <div className="pawn" id={`pawn-${this.props.index}`} style={{background: this.props.player.get('color')}}>
            { `${this.props.index}` }
        </div> ;
    }
}

PlayerPawn.propTypes = {
    index: PropTypes.number.isRequired,
    player: PropTypes.object.isRequired
};
