import React from 'react';
import GameMap from './game/GameMap';
import GameStatus from './game/GameStatus';
import PlayersInfo from './player/PlayersInfo';
import CurrentField from './game/CurrentField';
import Toolbox from './interaction/Toolbox';
import Floatings from './float/Floatings';
import AIObserver from "./ai/AIObserver";

export default class App extends React.Component {

    /**
     * App JSX structure.
     *
     * @return {XML}
     */
    render () {
        return <div>
            <div className="main">
                <GameMap/>
                <Floatings/>
            </div>
            <div className="inside">
                <Toolbox/>
                <CurrentField/>
                <PlayersInfo/>
                <GameStatus/>
            </div>
            <AIObserver/>
        </div>;
    }
}
