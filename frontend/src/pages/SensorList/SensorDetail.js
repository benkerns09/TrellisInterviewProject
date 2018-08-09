import React, { Component } from 'react';
import NoteItems from './NoteItems';
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
        var itemArray = this.state.items;

        if (this._inputElement.value !== "") {
            itemArray.unshift({
                text: this._inputElement.value,
                key: Date.now()
            });

            this.setState({
                items: itemArray
            });

            this._inputElement.value = "";
        }

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
                {/* //this is what you see as dropdown option */}
                {/* <p>{this.props.sensorId}</p> */}
                {/* This grabs the ID for each sensor on the dropdown */}
                <form onSubmit={this.addItem}>
                    <input classname="input" ref={(a) => this._inputElement = a}
                        placeholder="Enter Note">
                    </input>
                    <button type="submit" className="note">Add Note</button>
                </form>
                {/* <p>{this.props.sensorNotes}</p> */}
                {/* <form action='/sensor/:notes' method="post">
                    <label>
                        New Note:
                        <input type="text" name="name" />
                    </label>
                    <button type="submit">Submit</button>
                </form> */}
                <NoteItems entries={this.state.items}
                    delete={this.deleteItem} />
            </div>
            
            
        ) 

    }

}



export default SensorDetail;//exported to sensorList, sensorList imports