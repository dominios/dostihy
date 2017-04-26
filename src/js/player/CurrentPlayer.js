import React from 'react';

export default class CurrentPlayer extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (<div className="box-info currentPlayer">
            <h6>Player 1</h6>
            <section className="amount">Amount: <span>$30.000</span></section>
            <section className="inventory">
                <i>Inventory Empty</i>
            </section>
        </div>);
    }
}

CurrentPlayer.defaultProps = {
};

CurrentPlayer.propTypes = {
};
