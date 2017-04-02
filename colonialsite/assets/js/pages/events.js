import React from 'react'
import ReactDOM from 'react-dom'

const EventList = ({events}) =>
    <div>
        <h1>Events</h1>
        {events.map(event=>
            <div>{event.name}</div>
            )}
    </div>

ReactDOM.render(
        React.createElement(EventList,
            {
                events:[
                {name:"Houseparties"},
                {name:"Monday Madness"}
                ]
            }
        ),
        window.react_mount,
)
