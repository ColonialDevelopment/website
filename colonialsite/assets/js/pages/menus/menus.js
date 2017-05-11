import React from 'react';
import ReactDOM from 'react-dom';
import MealContainer from './MealContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

const findDate = () => {
  let returnString = "";
  const today = new Date();

  returnString = today.getFullYear();

  let month = today.getMonth() + 1 + "";
  if (month.length === 1) month = "0" + month;
  returnString += "-" + month;

  let date = today.getDate() + "";
  if (date.length === 1) date = "0" + date;
  returnString += "-" + date;

  return {date: returnString, day: today.getDay()};
}

const App = () => {
  return(
  <MuiThemeProvider>
    <div>
      <MealContainer today={findDate()}/>
    </div>
  </MuiThemeProvider>
  )
}

// Material UI dependancy for onClick
injectTapEventPlugin();
ReactDOM.render(<App />, window.react_mount);
