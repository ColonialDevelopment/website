import React from 'react';
import ReactDOM from 'react-dom';
import EventList from './EventList.js';

ReactDOM.render(<EventList url='/events/viewall' pollInterval={100000}/>, window.react_mount)
