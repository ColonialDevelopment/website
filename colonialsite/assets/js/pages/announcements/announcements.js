import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import StaffDashboard from './StaffDashboard.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

injectTapEventPlugin();

const App = () => (
	<MuiThemeProvider>
		<StaffDashboard />
	</MuiThemeProvider>
);

ReactDOM.render(<App/>, window.react_mount)
