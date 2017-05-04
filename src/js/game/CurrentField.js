import React from 'react';
import { connect } from 'react-redux';
import HorseOptions from './options/HorseOptions';
import { getOwner } from '../utils/utils';

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
                    owner={this.props.ownedBy}
                />;
            default:
                return null;
        }

    }

    renderOwnership () {
        if (this.props.ownedBy) {
            return (<section className="ownership">
                Owned by: <span color={this.props.ownedBy.get('color')}> {this.props.ownedBy.get('name')} </span>
            </section>);
        }
    }

    render () {
        return (<div className="box-info">
            <h1>
                { this.props.currentField.getIn(['text', 'name']) }<br/>
                <small>{ this.props.currentField.getIn(['text', 'description']) }</small>
            </h1>
            { this.renderOwnership() }
            <section className="options">
                { this.renderOptions() }
            </section>
        </div>);
    }
}

const mapStateToProps = function (state) {

    const currentPlayer = state.getIn(['players', state.get('playerOnTurn')]);
    const currentField = state.getIn(['fields', currentPlayer.get('field')]);

    return {
        currentPlayer: currentPlayer,
        currentPlayerIndex: state.get('playerOnTurn'),
        currentField: currentField,
        ownedBy: getOwner(currentField, state.get('players')) || false
    };
};

export default connect(mapStateToProps)(CurrentField);