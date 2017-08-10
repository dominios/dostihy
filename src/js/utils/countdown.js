import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders countdown before auto action is applied.
 */
export default class CountdownTimer extends React.Component {

    /**
     * Constructor.
     *
     * @param {object} props.
     */
    constructor (props) {
        super(props);

        this.state = {
            secondsRemaining: this.props.secondsRemaining
        }
    }

    /**
     * Perform `tick` action: reduce number of seconds before action by 1.
     */
    tick () {
        this.setState({
            secondsRemaining: this.state.secondsRemaining - 1
        });
        if (this.state.secondsRemaining <= 0) {
            clearInterval(this.interval);
        }
    }

    /**
     * Sets the interval.
     */
    componentDidMount () {
        this.interval = setInterval(this.tick.bind(this), 1000);
    }

    /**
     * Removes interval.
     */
    componentWillUnmount () {
        clearInterval(this.interval);
    }

    /**
     * Renders the coundown.
     *
     * @return {XML}
     */
    render () {
        return (
            <span>{`${this.props.label}: ${this.state.secondsRemaining}`}</span>
        );
    }

}

CountdownTimer.propTypes = {
    label: PropTypes.string.isRequired,
    secondsRemaining: PropTypes.number.isRequired
};
