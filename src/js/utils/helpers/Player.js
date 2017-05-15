import React from 'react';

export default class PlayerInlineHelper extends React.Component {

    render () {
        return <span style={{color: this.props.player.get('color')}}>{this.props.player.get('name')}</span>;
    }
}

PlayerInlineHelper.propTypes = {
    player: React.PropTypes.object.isRequired
};
