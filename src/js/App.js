import React from 'react';
import Bank from './bank/Bank';
import GameMap from './game/GameMap';
import GameStatus from './game/GameStatus';
import CurrentPlayer from './player/CurrentPlayer';

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
                <Bank/>
                <CurrentPlayer/>
            </div>
        </div>;
    }
}

App.defaultProps = {
};

App.propTypes = {
};
