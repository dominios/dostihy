import React from 'react';
import { connect } from 'react-redux';
import HorseOptions from './options/HorseOptions';

class CurrentField extends React.Component {

    constructor (props) {
        super(props);
    }

    renderOptions () {
        switch (this.props.currentField.get('type')) {
            case 'HORSE':
                return <HorseOptions
                    currentPlayer={this.props.currentPlayer}
                    currentPlayerIndex={this.props.currentPlayerIndex}
                    fieldId={this.props.currentField.get('id')}
                />;
            default:
                return null;
        }

    }

    render () {
        return (<div className="box-info">
            <h1>
                { this.props.currentField.getIn(['text', 'name']) }<br/>
                <small>{ this.props.currentField.getIn(['text', 'description']) }</small>
            </h1>
            <section className="options">
                { this.renderOptions() }
            </section>
        </div>);
    }
}

CurrentField.defaultProps = {

};

CurrentField.propTypes = {
};

const mapStateToProps = function (state) {

    const currentPlayer = state.getIn(['players', state.get('playerOnTurn')]);

    return {
        currentPlayer: currentPlayer,
        currentPlayerIndex: state.get('playerOnTurn'),
        currentField: state.getIn(['fields', currentPlayer.get('field')])
    };
};

export default connect(mapStateToProps)(CurrentField);