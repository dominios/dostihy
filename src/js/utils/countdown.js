import React from 'react';

export default class CountdownTimer extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            secondsRemaining: this.props.secondsRemaining
        }
    }

    tick () {
        this.setState({
            secondsRemaining: this.state.secondsRemaining - 1
        });
        if (this.state.secondsRemaining <= 0) {
            clearInterval(this.interval);
        }
    }

    componentDidMount () {
        this.interval = setInterval(this.tick.bind(this), 1000);
    }

    componentWillUnmount () {
        clearInterval(this.interval);
    }

    render () {
        return (
            <span>{`${this.props.label}: ${this.state.secondsRemaining}`}</span>
        );
    }

}