import React, { Component } from 'react';
import FlipMove from 'react-flip-move';

class NoteItems extends Component {
    constructor(props) {
        super(props);

        this.createTasks = this.createTasks.bind(this);
    }

    delete(key) {
        this.props.delete(key);
    }

    createTasks(item, key) {
        return <li onClick={() => this.delete(key)}
            key={key}>{item}</li>
    }

    render() {
        var noteEntries = this.props.entries;
        var noteItems = noteEntries.map(this.createTasks);

        return (
            <ul className="theList">
                <FlipMove duration={250} easing="ease-out">
                    {noteItems}
                </FlipMove>
            </ul>
        );
    }
};

export default NoteItems;

