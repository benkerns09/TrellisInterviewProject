import React, { Component } from 'react';
import NoteItems from './NoteItems';
import axios from 'axios';
import "./SensorDetail.css";
import { getSensor } from '../../services/SensorService';//function that fetch's sensors. Unused currently

class SensorDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    addItem(e) {
        const formData = new FormData();
        axios.post(`http://localhost:9000/sensor/${this.props.sensor.id}/addnote`, {
            note: e.target.note.value
        })
        .then((response) => {
            this.setState({
                items: response.data.notes
            })
        });
        var itemArray = this.state.items;

        console.log(itemArray);

        e.preventDefault();
    }
    // componentDidMount() {
    //     // fetch data for this.props.sensorId and set to state
    // }

    deleteItem(key) {
        var filteredItems = this.state.items.filter(function(item) {
            return (item.key !== key);
        });

        this.setState({
            items: filteredItems
        });
    }


    render() {
        return(
            <div className="notesList">
                <h1>Notes</h1>
                <form onSubmit={this.addItem}>
                    <input className="input" name="note" placeholder="Enter Note"></input>
                    <button type="submit" className="note">Add Note</button>
                </form>
                <NoteItems entries={this.state.items}
                    delete={this.deleteItem} />
            </div>
            
            
        ) 

    }

}



export default SensorDetail;//exported to sensorList, sensorList imports