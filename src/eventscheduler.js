import React, { Component } from 'react';
import DeleteEvent from './deleteevent';
import EventForm from './eventschedulerform';
import EventUpdate from './eventupdate';
import './App.css'

class EventScheduler extends Component {
    constructor(props){
        super(props);
        this.state ={
            event : [
              
            ],
            isCreate : true,
        }
    }

    getEvent = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/eventscheduler`) 
        .then(response => response.json())
        .then((data) => {
            return data.map(event => {
                if (new Date (event.date) < Date.now()) {
                    console.log("Calling Style")
                    event.style = {"color": "lightgrey"};
                } 
                return event; 
            })

        })
        .then(data => this.setState( {event : data, isCreate: true } ))
    };

    deleteEvent = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/api/eventscheduler/${id}`, {
            method: 'DELETE'
        }) 
        .then(response => response.json())
        .then(console.log)
        .then(this.getEvent);
    };

    updateEvent = (event) => {
        this.setState({
            updateEvent: event,
            isCreate: false,
        })
    };

    renderForm = () => {
        let result; 
        if (this.state.isCreate){
            result = (<EventForm key="createForm" refresh={this.getEvent} />);
        } else {
            const data = this.state.updateEvent;
            result = <EventUpdate key={data._id} event={data} refresh={this.getEvent}/>;
        }
        return result;
    };

    componentDidMount (){ 
        this.getEvent();
    };

    render () {
            const sortedEvents = this.state.event.sort((a, b) => new Date (b.date) - new Date (a.date))
            const displayEvent = sortedEvents.map((event) => {
                return <div style = {event.style}>
                    {event.name} 
                    <div>
                    {event.date} 
                    </div>
                    {event.type}
                    <br></br>
                    <DeleteEvent event={event}
                    deleteEvent={this.deleteEvent}
                    updateEvent={this.updateEvent}
                    />
                </div> 
            })
        
        console.log(this.state.event);

        return (
            <>
            <h3>EVENT SCHEDULER</h3>
            <br></br>
            {this.renderForm()}
            <br></br>
            {displayEvent}
            </>
        )
    };
};

export default EventScheduler;