import React, { Component } from 'react';

import { getSensor } from '../../services/SensorService';//function that fetch's sensors. Unused currently

class SensorDetail extends Component {
    componentDidMount() {
        // fetch data for this.props.sensorId and set to state
    }

    render() {
        return(
            <div>
                <h1>Sensor Detail</h1>
                {/* //this is what you see as dropdown option */}
                <p>{this.props.sensorId}</p>
                {/* This grabs the ID for each sensor on the dropdown */}
            </div>
        ) 

    }

}



export default SensorDetail;//exported to sensorList, sensorList imports