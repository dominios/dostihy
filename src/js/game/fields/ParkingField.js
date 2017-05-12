import React from 'react';
import { connect } from 'react-redux';

class ParkingField extends React.Component {

    render () {
        return <div>
            { this.props.parkingMoney }
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        parkingMoney: state.get('parkingMoney')
    }
};

export default connect(mapStateToProps)(ParkingField);