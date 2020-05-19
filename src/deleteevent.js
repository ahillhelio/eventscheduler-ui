import React from 'react';

const DeleteEvent = ({event, deleteEvent, updateEvent}) => {
    return(
        <>
        <button onClick={() => deleteEvent(event._id)}>Delete Event</button>
        <button onClick={() => updateEvent(event)}>Edit Event</button>
        </>
    ) 
}
export default DeleteEvent;