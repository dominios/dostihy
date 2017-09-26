import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import $ from 'jquery';

/**
 * Single Player Pawn Class.
 */
class PlayerPawn extends React.Component {

    /**
     * Constructor.
     * @param {object} props.
     */
    constructor (props) {
        super(props);

        this.state = {
            position: props.player.get('field'),
            playersAtField: props.playersAtField
        };
    }

    /**
     * Updates the position of the pawn.
     *
     * @param {object} nextProps
     */
    componentWillReceiveProps (nextProps) {
        this.setState({
            position: nextProps.player.get('field'),
            playersAtField: nextProps.playersAtField
        });
    }

    componentDidMount () {
        this.componentDidUpdate();
    }

    /**
     * Triggers the CSS transition (animation) of the pawn.
     */
    componentDidUpdate () {
        const target = $(`#field-${this.state.position + 1}`);
        let top = target.position().top;
        let left = target.position().left;

        if (this.state.playersAtField.size > 1) {
            left += this.props.playersAtField.filter(player => {
                return player.get('index') < this.props.player.get('index');
            }).size * 30;
        }

        $(`#pawn-${this.props.index}`).css({
            top: top + 'px',
            left: left + 'px'
        });
    }

    /**
     * Renders the pawn.
     *
     * @return {XML}
     */
    render () {
        return <div
            className={`pawn player-background-${this.props.player.get('index')}`}
            id={`pawn-${this.props.index}`}>
            <i className={`fa fa-${this.props.player.get('ai') ? 'tv' : 'user-o'}`}/>
        </div>;
    }
}


PlayerPawn.propTypes = {
    index: PropTypes.number.isRequired,
    player: PropTypes.object.isRequired,
    // playersAtField: PropTypes.number.isRequired
};

const mapStateToProps = state => {
    return {
        playersCount: state.get('players').size
    };
};

export default connect(mapStateToProps)(PlayerPawn);

