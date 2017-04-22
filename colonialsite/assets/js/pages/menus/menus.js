import React from 'react';
import ReactDOM from 'react-dom';
import MenuInputDummyContainer from './MenuInputDummyContainer.js';

ReactDOM.render(<MenuInputDummyContainer url='/api/dishes' pollInterval={100000}/>, window.react_mount)
