import React, { Component } from 'react';
import Meal from './Meal';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import CreateIcon from 'material-ui/svg-icons/content/create';
import PrevButton from 'material-ui/svg-icons/navigation/chevron-left';
import NextButton from 'material-ui/svg-icons/navigation/chevron-right';

class MealContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {date: props.today.date, day: props.today.day, data: null};
    // this.changeDay = this.changeDay.bind(this);
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    $.ajax({
        url: '/api/menu_categories',
        datatype: 'json',
        cache: false,
        success: function(data) {
            this.setState({data: data.results});
            this.findTodayMeals();
        }.bind(this)
    })
  }

  findTodayMeals() {
    let breakfast = [];
    let lunch = [];
    let dinner = [];
    let brunch = [];

    this.state.data.map((mealCategory) => {
      if (mealCategory.date === this.state.date) {
        if (mealCategory.meal === "Breakfast") breakfast.push(mealCategory);
        else if (mealCategory.meal === "Lunch") lunch.push(mealCategory);
        else if (mealCategory.meal === "Dinner") dinner.push(mealCategory);
        else if (mealCategory.meal === "Brunch") brunch.push(mealCategory);
      }
    })

    this.setState({ breakfast, lunch, dinner, brunch });
  }

  //  Format a date object into our string
  formatDate(date) {
    let returnString = "";

    returnString = date.getFullYear();

    let month = date.getMonth() + 1 + "";
    if (month.length === 1) month = "0" + month;
    returnString += "-" + month;

    let day = date.getDate() + "";
    if (date.length === 1) day = "0" + day;
    returnString += "-" + day;

    return returnString
  }

  // Change date for the datepicker component
  changeDate(newDate) {
    console.log(newDate);
    const date = new Date(newDate);
    const returnString = this.formatDate(date);
    let dayOfWeek = date.getDay();
    if (dayOfWeek === 0) dayOfWeek = 7;

    this.setState({ date: returnString, day: dayOfWeek });
    this.fetchData();
  }

  // Go to previous/next day, from the buttons
  goTomorrow() {
    let todayString = this.state.date.split('-');
    todayString[1] = (parseInt(todayString[1]));
    let today = new Date(`${todayString[0]},${todayString[1]},${todayString[2]}`);

    let tomorrow = new Date();
    tomorrow.setMonth(today.getMonth());
    tomorrow.setDate(today.getDate() + 1);
    const returnString = this.formatDate(tomorrow);

    let dayOfWeek = tomorrow.getDay();
    if (dayOfWeek === 0) dayOfWeek = 7;

    this.setState({ date: returnString, day: dayOfWeek });
    this.fetchData();
  }

  goYesterday() {
    let todayString = this.state.date.split('-');
    const today = new Date(`${todayString[0]},${todayString[1]},${todayString[2]}`);
    
    let yesterday = new Date();
    yesterday.setMonth(today.getMonth());
    yesterday.setDate(today.getDate() - 1);
    
    const returnString = this.formatDate(yesterday);

    let dayOfWeek = yesterday.getDay();
    if (dayOfWeek === 0) dayOfWeek = 7;

    this.setState({ date: returnString, day: dayOfWeek });
    this.fetchData();
  }

  openDatePicker() {
    this.refs.dp.openDialog();
  }

  render() {
    // Menu display for weekends
    if (this.state.day == 6 || this.state.day == 7)
      return(
        <div className="container">
            <div className="panel panel-default">
              <div className="panel-body text-center">
                <div style={{float: 'left', position: 'relative', left: '50%'}}>
                  <div style={{float: 'left', position: 'relative', left: '-50%'}}>
                    <FlatButton onTouchTap={this.goYesterday.bind(this)} style={{marginTop: '18px', textAlign: 'center', float: 'left'}} icon={<PrevButton />} />
                    <h2 style={{ float: 'left' }}>{this.state.date}</h2>
                    <FlatButton onTouchTap={this.goTomorrow.bind(this)} style={{marginTop: '18px', textAlign: 'center'}} icon={<NextButton />} />
                  </div>
                  <div style={{ clear: 'both' }}/>
                </div>
                <div style={{ clear: 'both' }} />
                <DatePicker style={{display: 'none'}} ref='dp' hintText="click to change the date" onChange={(x, y) => this.changeDate(y)} />
                <FlatButton onTouchTap={this.openDatePicker.bind(this)} labelPosition='before' label='Choose Date' icon={<CreateIcon color='#073f99' />}/>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-lg-6 text-center"><Meal meal={this.state.brunch} name="Brunch" /></div>
                  <div className="col-lg-6 text-center"><Meal meal={this.state.dinner} name="Dinner" /></div>
                </div>
              </div>
            </div>
        </div>
      )
    // Menu display for weekdays
    return(
      <div className="container">
          <div className="panel panel-default">
          <div className="panel-body text-center">
            <div style={{float: 'left', position: 'relative', left: '50%'}}>
              <div style={{float: 'left', position: 'relative', left: '-50%'}}>
                <FlatButton onTouchTap={this.goYesterday.bind(this)} style={{marginTop: '18px', textAlign: 'center', float: 'left'}} icon={<PrevButton />} />
                <h2 style={{ float: 'left' }}>{this.state.date}</h2>
                <FlatButton onTouchTap={this.goTomorrow.bind(this)} style={{marginTop: '18px', textAlign: 'center'}} icon={<NextButton />} />
              </div>
              <div style={{ clear: 'both' }}/>
            </div>
            <div style={{ clear: 'both' }} />
            <DatePicker style={{display: 'none'}} ref='dp' hintText="click to change the date" onChange={(x, y) => this.changeDate(y)} />
            <FlatButton onTouchTap={this.openDatePicker.bind(this)} labelPosition='before' label='Choose Date' icon={<CreateIcon color='#073f99' />}/>
          </div>
          <div className="panel-body">
            <div className="row">
              <div className="col-lg-4 text-center"><Meal meal={this.state.breakfast} name="Breakfast" /></div>
              <div className="col-lg-4 text-center"><Meal meal={this.state.lunch} name="Lunch" /></div>
              <div className="col-lg-4 text-center"><Meal meal={this.state.dinner} name="Dinner" /></div>
            </div>
          </div>
          </div>
      </div>
    )
  }
}

export default MealContainer;
