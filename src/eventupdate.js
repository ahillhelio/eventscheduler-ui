import React from 'react';

class EventUpdate extends React.Component {
    state = {
        name: this.props.event.name,
        date: this.props.event.date,
        type: this.props.event.type
    }

    handleChange = ( {target} ) => {
        const key = target.name;
        this.setState({ [key] : target.value }, () => console.log(this.state[key]));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/api/eventscheduler/${this.props.event._id}`, {
            method: 'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name : this.state.name, 
                date : this.state.date,
                type : this.state.type
            })
        })
        .then(this.props.refresh)
        .then(() => this.setState({
            name: "",
            date: "",
            type: ""
        }));
        
    }

    render () {
        return(
            <form onSubmit={this.handleSubmit}> 
                <input
                    name="name"
                    type="text"
                    value={this.state.name}
                    placeholder= "Event Name"
                    onChange={this.handleChange}/>
                <input
                    name="date"
                    type="text"
                    value={this.state.date}
                    placeholder= "YYYY-MM-DD"
                    onChange={this.handleChange}/>
                <select
                    name="type"
                    // type="text"
                    value={this.state.type}
                    placeholder= "Event Type"
                    onChange={this.handleChange}>
                    <option value="Meeting">Meeting</option>
                    <option value="Appointment">Appointment</option>
                    <option value="Reminder">Reminder</option>
                </select>

                    <input type="submit" value="Edit or Update an Event"/>
                    <input type="button" value="Cancel" onClick={this.props.refresh}/>
            </form>
        )
    }

}

export default EventUpdate;
