import React from 'react';
import Event from './Event.js';
import {Form, FormControl} from 'react-bootstrap';
import EventFilterDropdown from './EventFilterDropdown.js';
import EventSortSelect from './EventSortSelect.js';

function getDay(datetime){
	var d = new Date(datetime);
	var weekday = new Array(7);
	weekday[0] =  "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";

	var n = weekday[d.getDay()];
	return n;
}

function getMonth(month_number){
	var months = ['', 'January', 'February', 'March', 'April', 'May', 'June',
					'July', 'August', 'September', 'October', 'November', 'December'];
	return months[parseInt(month_number)];
};

function clean_time(time_array){

	//Coming in zulu time, convert to EST regardless of user location. -4 hours
	var hour = parseInt(time_array[0]);
	var minutes = time_array[1];
	var PM = true;

	switch (hour){
		case 0:
			hour = "8";
			PM = true;
			break;
		case 1:
			hour="9";
			PM = true;
			break;

		case 2:
			hour="10";
			PM = true;
			break;

		case 3:
			hour="11";
			PM = true;
			break;

		case 4:
			hour="12";
			PM = false;
			break;

		default:
			hour = hour > 16 ? (hour - 4) - 12 : (hour - 4)
			PM = hour > 16
		}

	return ("" + hour + ":" + minutes + " " + (PM ? "PM" : "AM"));
};

function getDate(datetime){
	/*
	Convert dates from this format : 2018-01-02T09:59:00Z
	to this format: 3:59 AM, January 2
	*/
	var year_month_day = datetime.split('T')[0].split('-');
	var time = (datetime.split('T')[1].split('Z'))[0].split(':');
	var time_string = clean_time(time);
	var month_string = getMonth(year_month_day[1])+" "+year_month_day[2];
	var day = getDay(datetime);
	var final_date = day + ", " + month_string + " " + time_string + " " + year_month_day[0];
	return final_date;
};



class EventRow extends React.Component {
	render() {
		return (
				<Event name={this.props.event.title}
						onClick={this.props.renderDetail}
					  date={getDate(this.props.event.start_date)}
						description={this.props.event.description}
						id={this.props.event.pk}
						selected={this.props.selected}
					  key={event.pk} />
		)
	}
}

class EventTable extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var rows = [];
		this.props.events.forEach((event) => {
			var selected= (this.props.event===event);
			if (!(event.title.toLowerCase()).includes(this.props.filterText.toLowerCase()))
				return;
			rows.push(<EventRow renderDetail={this.props.renderDetail} event={event} key={event.pk} selected={selected}/>)
		});
		return (
			<div className="scroll-container">
			{rows}
			</div>
		);
	}
}

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleFilterTextInputChange =  this.handleFilterTextInputChange.bind(this);
	}

	handleFilterTextInputChange(e) {
		this.props.onFilterTextInput(e.target.value);
	}

	render() {
		return (
			<Form>
				<FormControl
					type="text"
					placeholder="Search..."
					value={this.props.filterText}
					onChange={this.handleFilterTextInputChange}
				/>
			</Form>
		);
	}
}

class EventFilterTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filterText: '',
			events:this.props.events
		};

		this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
	}

	handleFilterTextInput(filterText){
		this.setState({
			filterText:filterText
		});
	}

	render() {
		return (
			<div>
				<div className="input-group">
					<SearchBar
						filterText={this.state.filterText}
						onFilterTextInput={this.handleFilterTextInput}
					/>
					<span className="input-group-btn">
					<EventFilterDropdown types={this.props.types}
										 updateFilteredList={this.props.updateFilteredList}
										 excludePast={this.props.excludePast}
                                         changeExcludePast={this.props.changeExcludePast} />
					</span>
					<span className="input-group-btn">
					<EventSortSelect sortTypes={this.props.sortTypes} updateSort={this.props.updateSort} />
					</span>
				</div>
				<br></br>
				<EventTable
					renderDetail={this.props.renderDetail}
					events={this.props.events}
					filterText={this.state.filterText}
					event={this.props.selected_event}
				/>
			</div>
		);
	}
}

export default EventFilterTable;
