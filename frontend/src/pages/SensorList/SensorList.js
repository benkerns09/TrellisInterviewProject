import React from 'react';//default import
import './SensorList.css';
import SensorDetail from './SensorDetail.js';//has the onClick functionalities


import { getSensors } from '../../services/SensorService';//function that fetch's sensors
//component SensorList
class SensorList extends React.Component {
  constructor(props) {
    super(props);
    //specify state object inside sensorlist component's constructor. Runs way before component gets rendered
    this.state = {
      sensors: [],
      loading: true,
      error: '',
      showDetail: false,
    };
  }
//properties: sensors, loading, error
//telling react to set these props to ([], true, '')
//the empty array just means there is no default
//if component mounts, loading goes to false. If loading, you get 'loading'...
//if component mounts, error is not called. If error, gives you the error message

  showDetail(id) {
    this.setState({
      showDetail: id
    })
  }
//this funciton rendders on click. So when someone clicks show detai, we get the id. I need to add more detail to this
  
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

//next step is to render 

  render() {
    const { loading, sensors, error } = this.state;//all of these could be the state. These live inside of the component
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
          sensors.map(({ id, name, description }) => (//gonna return all these value in the sensors array. array
            <div key={id} className="SensorListItem">
            {/* key should be provided for list items. A “key” is a special string attribute you need to include when creating lists of elements. We’ll discuss why it’s important in the next section. */}
              <div className="SensorListName">{name}</div>
              <div className="SensorListDescription">{description}</div>
              <button onClick={() => {this.showDetail(id)}}>Show Detail</button>
              {/* On click, the state is changed to showDetail, which right now is just bringin back the id */}
              {this.state.showDetail === id && (<SensorDetail sensorId={id} />)}
{/* //details. when clicked, takes you to new route or shows new componnet */}
            </div>
          ))
        }
      </div>
    );
  }
}

export default SensorList;//able to be used by other programs with import statement
