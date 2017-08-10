import React from 'react';
import { connect } from 'react-redux';
import { startBet } from '../../data/actions';

class BetButton extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            betting: false
        };

        this.handleStartBet = this.handleStartBet.bind(this);
        this.handleCancelBet = this.handleCancelBet.bind(this);
    }

    handleStartBet () {
        this.setState({
            betting: true
        });
        this.props.startBet();
    }

    handleCancelBet () {
        this.setState({
            betting: false
        });
    }

    renderAmount () {
        return <div>
            <input type="number" placeholder="Chose amount"/>
        </div>;
    }

    renderBet () {
        return <button
            onClick={this.handleStartBet}
        >
            BET
        </button>;
    }

    render () {
        return this.state.betting ? this.renderAmount() : this.renderBet();
    }

}

BetButton.defaultProps = {
};

BetButton.propTypes = {
};

const mapDispatchToProps = function (dispatch) {
    return {
        startBet: () => dispatch(startBet())
    }
};

export default connect(undefined, mapDispatchToProps)(BetButton);
