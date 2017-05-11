import React, { Component } from 'react';
import Meal from './Meal';

import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import CreateIcon from 'material-ui/svg-icons/content/create';
import PrevButton from 'material-ui/svg-icons/navigation/chevron-left';
import NextButton from 'material-ui/svg-icons/navigation/chevron-right';

class MealContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {date: props.today.date, day: props.today.day, data: null, open:false};
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
  showModal(rating, title){
    this.setState({modalBody:rating, modalTitle:title, open:true});
  }
  finishSubmit(){
    this.setState({open:false, modalBody:null, modalTitle:null});
    this.fetchData();
  }

  renderDate() {
    const date = this.state.date.split('-');
    const today = new Date(date[0], date[1], date[2]);

    let day = '';
    switch (today.getDay()) {
      case 0:
        day = 'Sunday';
        break;
      case 1:
        day = 'Monday';
        break;
      case 2:
        day = 'Tuesday';
        break;
      case 3:
        day = 'Wednesday';
        break;
      case 4:
        day = 'Thursday';
        break;
      case 5:
        day = 'Friday';
        break;
      case 6:
        day = 'Saturday';
        break;
    }

    let month = '';
    switch (today.getMonth()) {
      case 0:
        month = 'January';
        break;
      case 1:
        month = 'February';
        break;
      case 2:
        month = 'March';
        break;
      case 3:
        month = 'April';
        break;
      case 4:
        month = 'May';
        break;
      case 5:
        month = 'June';
        break;
      case 6:
        month = 'July';
        break;
      case 7:
        month = 'August';
        break;
      case 8:
        month = 'September';
        break;
      case 9:
        month = 'October';
        break;
      case 10:
        month = 'November';
        break;
      case 11:
        month = 'December';
        break;
    }
    return (day + ', ' + month + ' ' + today.getDate());
  }

  render() {
    const close = (
        <FlatButton
          label="Close"
          primary={true}
          onTouchTap={function(){
                              this.setState({open:false})
                            }.bind(this)}
        />
      );
    const dialog = (<Dialog title={this.state.modalTitle}
                  actions={close}
                  modal={true}
                  open={this.state.open}
                  onRequestClose={function(){
                                      this.setState({open:false})
                                  }.bind(this)
                                 }
                  onTouchTap={function(){this.setState({open:false})}.bind(this)}>
                  {this.state.modalBody}
          </Dialog>)
    // Menu display for weekends
    if (this.state.day == 6 || this.state.day == 7)
      return(
        <div className="container-fluid">
            <div className="panel panel-default">
              <div className="panel-body text-center">
                <div style={{float: 'left', position: 'relative', left: '50%'}}>
                  <div style={{float: 'left', position: 'relative', left: '-50%'}}>
                    <FlatButton onTouchTap={this.goYesterday.bind(this)} style={{marginTop: '18px', textAlign: 'center', float: 'left'}} icon={<PrevButton />} />
                    <h2 style={{ float: 'left' }}>{this.renderDate()}</h2>
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
                  <div className="col-lg-6 text-center"><Meal meal={this.state.brunch} name="Brunch" showModal={this.showModal.bind(this)} finishSubmit={this.finishSubmit.bind(this)}/></div>
                  <div className="col-lg-6 text-center"><Meal meal={this.state.dinner} name="Dinner" showModal={this.showModal.bind(this)} finishSubmit={this.finishSubmit.bind(this)}/></div>
                </div>
              </div>
            </div>
            {dialog}
        </div>
      )
    // Menu display for weekdays
    return(
      <div className="container-fluid">
          <div className="panel panel-default">
          <div className="panel-body text-center">
            <div style={{float: 'left', position: 'relative', left: '50%'}}>
              <div style={{float: 'left', position: 'relative', left: '-50%'}}>
                <FlatButton onTouchTap={this.goYesterday.bind(this)} style={{marginTop: '18px', textAlign: 'center', float: 'left'}} icon={<PrevButton />} />
                <h2 style={{ float: 'left' }}>{this.renderDate()}</h2>
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
              <div className="col-lg-4 text-center"><Meal meal={this.state.breakfast} name="Breakfast" showModal={this.showModal.bind(this)} finishSubmit={this.finishSubmit.bind(this)} /></div>
              <div className="col-lg-4 text-center"><Meal meal={this.state.lunch} name="Lunch" showModal={this.showModal.bind(this)} finishSubmit={this.finishSubmit.bind(this)}/></div>
              <div className="col-lg-4 text-center"><Meal meal={this.state.dinner} name="Dinner" showModal={this.showModal.bind(this)} finishSubmit={this.finishSubmit.bind(this)}/></div>
            </div>
          </div>
          </div>
          {dialog}
      </div>
    )
  }
}

export default MealContainer;
