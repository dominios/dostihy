import React from 'react';

export default class Bank extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (<div className="bank">
            <h6>Bank</h6>
            Amount: <span>Infinite</span>
        </div>);
    }
}

Bank.defaultProps = {
};

Bank.propTypes = {
};
