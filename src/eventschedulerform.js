import React from 'react';

class EventForm extends React.Component{
    state = {
        name: "",
        date: "",
        type: ""
    }

    handleChange = ( {target} ) => {
        const key = target.name; // name? may need to double check this
        this.setState({ [key] : target.value }, () => console.log(this.state[key]));
    }
 //BE CARE WITH WORD "EVENT" BELOW- reserve word?
    handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/api/eventscheduler`, {
            method: "POST",
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify([{name : this.state.name, date : this.state.date, type : this.state.type}])
        })
        .then(this.props.refresh)
        .then(() => this.setState({
            name: "",
            date: "",
            type: ""
        }));

    }

    //RENDER
    render() {
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

                <input type="submit" value="Add an Event"/>
            </form>
        )
    }

}

export default EventForm;