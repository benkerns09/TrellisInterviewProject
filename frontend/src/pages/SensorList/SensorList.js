import React from 'react';
import './SensorList.css';
import SensorDetail from './SensorDetail.js';


import { getSensors } from '../../services/SensorService';
class SensorList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sensors: [],
      loading: true,
      error: '',
      showDetail: false,
    };
  }
//properties: sensors, loading, error
//if component mounts, loading goes to false. If loading, you get 'loading'...
//if component mounts, error is not called. If error, gives you the error message

  showDetail(notes) {
    this.setState({
      showDetail: notes,
    })
  }
  
  componentDidMount() {
    getSensors()//if the component mounts, this function is called
      .then(sensors => this.setState({ sensors, loading: false }))//once it gets the sensors, it is not loading. sets state to sensors. This will render our db of sensors
      .catch(err => {
        console.error(err);
        this.setState({ error: err.message, loading: false })
      });
      //catch statement lets you handle if error with an error message
  }

//want do do this here instead of constructor to avoid weird scenario when data comes back before the DOM has happened

  render() {
    const { loading, sensors, error } = this.state;
    if(error) {//if its an error statement
      return (//this is that it will return
        <div className="SensorListError">
          {error}
        </div>
      );
    }
    if(loading) {//if loading
      return (
        <div className="SensorListLoading">
          Loading...
        </div>
      );
    }
    return (//normally, this is that it should return
      <div className="SensorList">
        {
          sensors.map(({ id, name, description, notes }) => (
            <div key={id} className="SensorListItem">
              <div className="SensorListName">{name}</div>
              <div className="SensorListDescription">{description}</div>
              <button className="detail" onClick={() => {this.showDetail(notes)}}>Show Detail</button>
              {/* {/* On click, the state is changed to showDetail */}
              {this.state.showDetail === notes && (<SensorDetail sensorNotes={notes} />)}
            </div>
          ))
        }
      </div>
    );
  }
}

export default SensorList;
