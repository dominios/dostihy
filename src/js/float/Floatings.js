import React from 'react';
import { connect } from "react-redux";
import MoneyInlineHelper from '../utils/helpers/Money';
import $ from 'jquery';

class Floatings extends React.Component {

    constructor (props) {
        super(props);
    }

    componentDidUpdate () {

        const target = $(`#field-21`); // parking

        setTimeout(() => {
            $(`#paymentToBank`).css({
                top: ((target.position().top + 20) + 'px'),
                left: ((target.position().left + 20) + 'px')
            });
        }, 1000);

        setTimeout(() => {
            $(`#paymentToBank`).addClass('hidden');
        }, 2800);

    }

    renderFloating (item, key) {

        const fromElement = $(`#player-info-${item.getIn(['player', 'index'])} .inline-money .amount`);

        const initialCoordinates = {
            top: fromElement.offset().top - 17,
            left: fromElement.offset().left - 10
        };

        return <div key={key} className="payment-info" id="paymentToBank" style={initialCoordinates}>
            <MoneyInlineHelper amount={-1 * item.get('amount')}/>
        </div>;
    }

    render () {
        return <div className="floatings-container">
            <div className="inner">
                { this.props.info.map(this.renderFloating)}
            </div>
        </div>;
    }
}

const mapStateToProps = function (state) {
    return {
        info: state.getIn(['currentRound', 'floatingInfo'])
    };
};

export default connect(mapStateToProps)(Floatings);
