import React from 'react';
import ReactDOM from 'react-dom';
import EventList from './EventList.js';

ReactDOM.render(<EventList url='/events/api' pollInterval={100000}/>, window.react_mount)
