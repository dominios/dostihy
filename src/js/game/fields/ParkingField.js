import React from 'react';
import { connect } from 'react-redux';
import MoneyInlineHelper from '../../utils/helpers/Money';

class ParkingField extends React.Component {

    render () {
        return <div>
            <MoneyInlineHelper amount={ this.props.parkingMoney } />
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        parkingMoney: state.get('parkingMoney')
    }
};

export default connect(mapStateToProps)(ParkingField);