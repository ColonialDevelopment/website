import React from 'react';
import Event from './Event.js';
import {Form, FormControl} from 'react-bootstrap';
import EventFilterDropdown from './EventFilterDropdown.js';
import EventSortSelect from './EventSortSelect.js';

function getDay(day){
	var weekday = new Array(7);
	weekday[0] = "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3]= "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";

	var n = weekday[day];
	return n;
}

function getMonth(month_number){
	var months = ['January', 'February', 'March', 'April', 'May', 'June',
					'July', 'August', 'September', 'October', 'November', 'December'];
	return months[parseInt(month_number)];
};

function getDate(datetime){
	/*
	Convert dates from this format : 2018-01-02T09:59:00Z
	to this format: 3:59 AM, January 2
	*/
	var x = moment(datetime);

	var hours = x.hours() % 12;
	if (hours == 0) hours = 12; 
	var minutes = ("0" + x.minutes()).slice(-2);
	const time = hours + ':' + minutes;
	var month_string = getMonth(x.month());
	var date = ("0" + x.date()).slice(-2);
	var day = getDay(x.day());
	var final_date = day + ", " + month_string + " " + date + ' ' + time + " " + (x.hours() >= 12 ? "PM" : "AM");
	return final_date;
};

class EventRow extends React.Component {
	render() {
		return (
				<Event  name={this.props.event.title}
						onClick={this.props.renderDetail}
					    date={getDate(this.props.event.start_date)}
						description={this.props.event.description}
						id={this.props.event.pk}
						selected={this.props.selected}
					 	key={this.props.event.pk}
					 	category={this.props.event.category} />
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
			var selected= (this.props.selected_event ? this.props.selected_event.pk	=== event.pk : false);
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
			<div style={{marginTop:7}}>
				<div className="input-group">
					<SearchBar
						filterText={this.state.filterText}
						onFilterTextInput={this.handleFilterTextInput}
					/>
					<span className="input-group-btn">
					<EventFilterDropdown types={this.props.types}
										 updateFilteredList={this.props.updateFilteredList} />
					</span>
					<span className="input-group-btn">
					<EventSortSelect sortTypes={this.props.sortTypes} 
									 defaultSort={this.props.defaultSort} 
									 updateSort={this.props.updateSort} />
					</span>
				</div>
				<br></br>
				<EventTable
					renderDetail={this.props.renderDetail}
					events={this.props.events}
					filterText={this.state.filterText}
					selected_event={this.props.selected_event}
				/>
			</div>
		);
	}
}

export default EventFilterTable;
