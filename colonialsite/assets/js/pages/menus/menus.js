import React from 'react';
import ReactDOM from 'react-dom';
import MenuDisplay from './MenuDisplay.js';

ReactDOM.render(<EventList url='/api/menus' pollInterval={100000}/>, window.react_mount)
