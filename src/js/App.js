import React from 'react';
import GameMap from './game/GameMap';
import GameStatus from './game/GameStatus';
import CurrentPlayer from './player/CurrentPlayer';
import CurrentField from './game/CurrentField';

export default class App extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return <div>
            <div className="main">
                <GameMap/>
            </div>
            <div className="sidebar">
                <GameStatus/>
                <CurrentPlayer/>
                <CurrentField/>
            </div>
        </div>;
    }
}

App.defaultProps = {
};

App.propTypes = {
};
