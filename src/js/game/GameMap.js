import React from 'react';
import { connect } from 'react-redux';
import PlayerPawn from './PlayerPawn';
import GameField from './fields/GameField';

/**
 * Game Map Class.
 */
class GameMap extends React.Component {

    /**
     * Renders all game fields and players.
     *
     * @return {XML}
     */
    render () {
        return (<div className="game-map">
            {
                this.props.fields.map(
                    (field, index) => <GameField key={index} field={field} players={this.props.players} />
                )
            }
            { this.props.players.map((player, index) => <PlayerPawn key={index} index={index} player={player}/>)}
        </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        fields: state.get('fields'),
        players: state.get('players')
    }
};

export default connect(mapStateToProps)(GameMap);
