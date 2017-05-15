import React from 'react';
import GameMap from './game/GameMap';
import GameStatus from './game/GameStatus';
import PlayersInfo from './player/PlayersInfo';
import CurrentField from './game/CurrentField';
import Toolbox from './interaction/Toolbox';

export default class App extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return <div>
            <div className="main">
                <GameMap/>
            </div>
            <div className="inside">
                <Toolbox/>
                <CurrentField/>
                <PlayersInfo/>
                <GameStatus/>
            </div>
        </div>;
    }
}

App.defaultProps = {
};

App.propTypes = {
};
