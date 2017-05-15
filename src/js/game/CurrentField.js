import React from 'react';
import { connect } from 'react-redux';
import { getOwner } from '../utils/utils';

class CurrentField extends React.Component {

    constructor (props) {
        super(props);
    }

    renderOwnership () {
        if (this.props.ownedBy) {
            return (<section className="ownership">
                Owned by: <span color={this.props.ownedBy.get('color')}> {this.props.ownedBy.get('name')} </span>
            </section>);
        }
    }

    render () {
        return (<div className="box-info current-field">
            <h1>
                { this.props.currentField.getIn(['text', 'name']) }<br/>
            </h1>
            { this.renderOwnership() }
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