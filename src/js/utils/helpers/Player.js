import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders player label formatted.
 */
export default class PlayerInlineHelper extends React.Component {

    /**
     * Renders colored player info with name.
     *
     * @return {XML}
     */
    render () {
        return <span style={{color: this.props.player.get('color')}}>{this.props.player.get('name')}</span>;
    }
}

PlayerInlineHelper.propTypes = {
    player: PropTypes.object.isRequired
};
