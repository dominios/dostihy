import React from 'react';
import Bank from './bank/Bank';
import CurrentPlayer from './player/CurrentPlayer';

export default class App extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return <div>
            <Bank/>
            <CurrentPlayer/>
        </div>;
    }
}

App.defaultProps = {
};

App.propTypes = {
};
