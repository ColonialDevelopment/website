import React, { Component } from 'react';
import Meal from './Meal';
import EditMeal from './EditMeal';
import { MENU_CATEGORY_LIST } from '../../statics/urls.js';

import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import CreateIcon from 'material-ui/svg-icons/content/create';
import PrevButton from 'material-ui/svg-icons/navigation/chevron-left';
import NextButton from 'material-ui/svg-icons/navigation/chevron-right';

//  Format a date object into our string
function formatDate(date) {
  let returnString = "";

  returnString = date.getFullYear();

  let month = date.getMonth() + 1 + "";
  if (month.length === 1) month = "0" + month;
  returnString += "-" + month;

  let day = date.getDate() + "";
  if (day.length === 1) day = "0" + day;
  returnString += "-" + day;

  return returnString
}

class MealContainer extends Component {
  constructor(props) {
    super(props);
    var d = props.today.day === 0 ? 7 : props.today.day;
    this.state = {
      date: props.today.date,
      day: d,
      data: [],
      open: false,
      fetchedDates: {}, // stores the timestamp that date was fetched from server
    };
  }

  componentWillMount() {
    // Load today's menu.
    this.fetchData(this.props.today.date);

    // Preload tomorrow's/yesterday's menus.
    const yesterday = formatDate(this.todayAfterOffset(-1));
    const tomorrow = formatDate(this.todayAfterOffset(1));
    this.fetchData(yesterday);
    this.fetchData(tomorrow);
  }

  fetchData(date) {
    if (this.state.fetchedDates[date]) {
      // This date has already been fetched, no need to fetch it again.
      return;
    }

    $.ajax({
      url: MENU_CATEGORY_LIST + '/?date=' + date,
      datatype: 'json',
      cache: false,
      success: data => {
        this.setState({
          data: this.state.data.concat(data.results),
          fetchedDates: Object.assign({ [date]: Date.now() }, this.state.fetchedDates),
        });
      },
    });
  }

  // Returns a date object representing today after an offset is applied.
  // delta is an integer offset in days.
  todayAfterOffset(delta) {
    const components = this.state.date.split('-');
    const todayMonth = parseInt(components[1]) - 1;
    const todayDay = parseInt(components[2]);

    const newDate = new Date();
    newDate.setMonth(todayMonth);
    newDate.setDate(todayDay + delta);

    return newDate;
  }

  onDatePickerChange(newDate) {
    this.goToDate(new Date(newDate));
  }

  // delta is an integer offset in days
  changeDateByOffset(delta) {
    const newDateObj = this.todayAfterOffset(delta);
    this.goToDate(newDateObj)
  }

  goToDate(dateObj) {
    const formatted = formatDate(dateObj);

    let dayOfWeek = dateObj.getDay();
    if (dayOfWeek === 0) dayOfWeek = 7;

    this.setState({ date: formatted, day: dayOfWeek });
    this.fetchData(formatted);
  }

  goTomorrow() {
    this.changeDateByOffset(1);
  }
  goYesterday() {
    this.changeDateByOffset(-1);
  }

  openDatePicker() {
    this.refs.dp.openDialog();
  }
  showModal(rating, title, deleteButton){
    this.setState({modalBody:rating, modalTitle:title, deleteButton:deleteButton, open:true});
  }
  showEditModal(modalBody, deleteButton, open){
    this.setState({modalBody, deleteButton, open})
  }
  closeModal(){
    this.setState({open:false, modalBody:null, modalTitle:null});
  }

  renderDate() {
    const date = this.state.date.split('-');
    const today = new Date(date[0], date[1] - 1, date[2]);
    return today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  }

  getMeals() {
    const lunch = [];
    const dinner = [];
    const brunch = [];
    const date = this.state.date;

    this.state.data.map(mealCategory => {
      if (mealCategory.date === date) {
        if (mealCategory.meal === "Lunch") lunch.push(mealCategory);
        else if (mealCategory.meal === "Dinner") dinner.push(mealCategory);
        else if (mealCategory.meal === "Brunch") brunch.push(mealCategory);
      }
    });

    if (this.state.day > 5) {
      if (this.props.edit) {
        return(
          <div className="row">
            <div className="col-lg-6 text-center">
            <EditMeal date={date}
                      meal={brunch}
                      name="Brunch"
                      fetchData={this.fetchData.bind(this)}
                      showModal={this.showEditModal.bind(this)}
                      closeModal={this.closeModal.bind(this)}/>
            </div>
            <div className="col-lg-6 text-center">
            <EditMeal date={date}
                      meal={dinner}
                      name="Dinner"
                      fetchData={this.fetchData.bind(this)}
                      showModal={this.showEditModal.bind(this)}
                      closeModal={this.closeModal.bind(this)}/>
            </div>
          </div>
        );
      } else {
        return (
          <div className="row">
            <div className="col-lg-6 text-center">
              <Meal meal={brunch}
                    name="Brunch"
                    showModal={this.showModal.bind(this)}
                    closeModal={this.closeModal.bind(this)}/>
            </div>
            <div className="col-lg-6 text-center">
              <Meal meal={dinner}
                    name="Dinner"
                    showModal={this.showModal.bind(this)}
                    closeModal={this.closeModal.bind(this)}/>
            </div>
          </div>
        );
      }
    }
    else {
      if(this.props.edit){
          return(
            <div className="row">
              <div className="col-lg-6 text-center">
              <EditMeal date={date}
                        meal={lunch}
                        name="Lunch"
                        fetchData={this.fetchData.bind(this)}
                        showModal={this.showEditModal.bind(this)}
                        closeModal={this.closeModal.bind(this)}/>
              </div>
              <div className="col-lg-6 text-center">
              <EditMeal date={date}
                        meal={dinner}
                        name="Dinner"
                        fetchData={this.fetchData.bind(this)}
                        showModal={this.showEditModal.bind(this)}
                        closeModal={this.closeModal.bind(this)}/>
              </div>
            </div>)
      }
     else{
        return (<div className="row">
                  <div className="col-lg-6 text-center">
                    <Meal meal={lunch}
                          name="Lunch"
                          showModal={this.showModal.bind(this)}
                          closeModal={this.closeModal.bind(this)}/>
                  </div>
                  <div className="col-lg-6 text-center">
                    <Meal meal={dinner}
                          name="Dinner"
                          showModal={this.showModal.bind(this)}
                          closeModal={this.closeModal.bind(this)}/>
                  </div>
                </div>)
       }
    }
  }
  render() {
    const close = (
      <FlatButton
        label="Close"
        primary
        onTouchTap={() => this.setState({open:false})}
      />
    );
    const dialog = (
      <Dialog title={this.state.modalTitle}
        actions={close, this.state.deleteButton}
        modal={false}
        open={this.state.open}
        onRequestClose={() => this.setState({open:false})}
        onTouchTap={() => this.setState({open:false})}
      >
        {this.state.modalBody}
      </Dialog>
    );

    const meals = this.getMeals();

    return (
      <div className="container-fluid">
        <div className="panel panel-default">
          <div className="panel-body text-center" style={{paddingBottom:0}}>
            <div style={{float: 'left', position: 'relative', left: '50%'}}>
              <div style={{float: 'left', position: 'relative', left: '-50%'}}>
                <div style={{ textAlign: 'center', fontSize:16}}>
                  {this.renderDate()}
                </div>
                <FlatButton onTouchTap={this.goYesterday.bind(this)} style={{marginTop: '10px', textAlign: 'center', float: 'left'}} icon={<PrevButton />} />
                <FlatButton onTouchTap={this.goTomorrow.bind(this)} style={{marginTop: '10px', textAlign: 'center', float: 'right'}} icon={<NextButton />} />
              </div>
              <div style={{ clear: 'both' }}/>
            </div>
            <div style={{ clear: 'both' }} />
            <DatePicker style={{display: 'none'}} ref='dp' hintText="click to change the date" onChange={(x, y) => this.onDatePickerChange(y)} />
            <FlatButton style={{textAlign: 'center' }} onTouchTap={this.openDatePicker.bind(this)} labelPosition='before' label='Choose Date' icon={<CreateIcon color='#073f99' />}/>
          </div>
          <div className="panel-body" style={{paddingTop:0}}>
            {meals}
          </div>
        </div>
        {dialog}
      </div>
    );
  }
}

export default MealContainer;
