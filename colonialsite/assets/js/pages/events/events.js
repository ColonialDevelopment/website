import React from 'react';
import ReactDOM from 'react-dom';
import EventList from './EventList.js';
import {EVENTS_LIST} from '../../statics/urls.js';

ReactDOM.render(<EventList url={EVENTS_LIST} pollInterval={100000}/>, window.react_mount)