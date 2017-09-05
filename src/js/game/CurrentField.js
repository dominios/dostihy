import React from 'react';
import { connect } from 'react-redux';
import { getOwner, getPlayerOnTurn } from '../utils/utils';

/**
 * Current Field Class.
 *
 * Shows the information about current game field the user is standing on.
 */
class CurrentField extends React.Component {

    /**
     * Renders the ownership info box.
     *
     * @return {XML}
     */
    renderOwnership () {
        if (this.props.ownedBy) {
            return (<section className="ownership">
                Owned by: <span className={`player-color-${this.props.ownedBy.get('index')}`}> {this.props.ownedBy.get('name')} </span>
            </section>);
        }
    }

    /**
     * Renders the current field info box.
     * @return {XML}
     */
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

    const currentPlayer = getPlayerOnTurn(state);
    const currentField = state.getIn(['fields', currentPlayer.get('field')]);

    return {
        currentPlayer: currentPlayer,
        currentPlayerIndex: state.get('playerOnTurn'),
        currentField: currentField,
        ownedBy: getOwner(currentField, state.get('players')) || false
    };
};

export default connect(mapStateToProps)(CurrentField);