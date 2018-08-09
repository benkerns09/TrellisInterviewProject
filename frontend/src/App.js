import React from 'react';
import './App.css';
import SensorList from './pages/SensorList/SensorList';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sensor Viewer!</h1>
          {/* Sensor viewer is header, sensorlist component is in the app class  */}
        </header>
        <SensorList />
      </div>
    );
  }
}

export default App;//exporting the app
