import {Component} from 'react';
import {Panel, Image} from 'react-bootstrap';
import InlineEdit from 'react-edit-inline';
import EditableTextBox from './EditableTextBox';
import Cookies from 'js-cookie';

function isValidDate(dateString)
{
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

class Member extends Component{
	constructor(props){
		super(props);
		this.state={
			bio:this.props.member.bio,
			bday:this.props.member.birthday
		}
	}
	
	validate_date(data){
		if (isValidDate(data))
			return true;
		else
			alert("The birthday you entered is invalid. Please enter birthday of the form MM/DD/YYYY")
	}

	bday_data_changed(data){
		this.setState({bday:data.message})

		var csrftoken = Cookies.get('csrftoken');
		var post_bio=
		{
			data:data.message
		}
		function csrfSafeMethod(method) {
    	// these HTTP methods do not require CSRF protection
   	 	return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
		}
		$.ajaxSetup({
    		beforeSend: function(xhr, settings) {
    			if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            		xhr.setRequestHeader("X-CSRFToken", csrftoken);
        		}
    		}
		});
		$.ajax({
			context:this,
			type:"POST",
			url:"/api/members/birthday",
			datatype:'json',
			contentType:'application/json',
			data:JSON.stringify(data.message)
		})
		.done(function(){
			console.log("Birthday updated Successfully")
		})
		.fail(function(jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(jqXHR);
			console.log("API endpoint unimplemented")
		})	
	}

	bio_data_changed(data){
		this.setState({bio:data.message});

		var csrftoken = Cookies.get('csrftoken');
		var post_bio=
		{
			data:data.message
		}
		function csrfSafeMethod(method) {
    	// these HTTP methods do not require CSRF protection
   	 	return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
		}
		$.ajaxSetup({
    		beforeSend: function(xhr, settings) {
    			if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            		xhr.setRequestHeader("X-CSRFToken", csrftoken);
        		}
    		}
		});
		$.ajax({
			context:this,
			type:"POST",
			url:"/api/members/bio",
			datatype:'json',
			contentType:'application/json',
			data:JSON.stringify(data.message)
		})
		.done(function(){
			console.log("Bio updated Successfully")
		})
		.fail(function(jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(jqXHR);
			console.log("API endpoint unimplemented")
		})	
	}

	render(){
		const {	name, 
				netid, 
				class_year, 
				major, 
				room_num, 
				dorm,
				hometown,
				officer_pos, 
				pref_name,
				birthday,
				bio} = this.props.member

		var x = document.createElement("date-input");
		x.setAttribute("type", "date");
		x.setAttribute("value", "1995-01-01");

		var bioNode = this.props.editable ? 
	  									    (<EditableTextBox default_text={this.state.bio}
	  									    				  inputType={"bio"}
															  key={"bio"}
															  className={"p"}
					              							  staticElement={"div"}
												              editingElement={"textarea"}
												              activeClassName={"form-control bio-input"}
												              maxLength={2000}
												              change={this.bio_data_changed.bind(this)}
												              style={{font:15, height:"300px !important"}}
															   />) 
										: bio;
		var birthdayNode = this.props.editable ? 
												 (<EditableTextBox default_text={this.state.bday}
												 				   inputType={"birthday"}
												 				   key={"birthday"}
												 				   staticElement={"div"}
												 				   validate={this.validate_date.bind(this)}
												 				   change={this.bday_data_changed.bind(this)}
												 				   style={{}} /> )
												 : birthday;



		return (
			<div className="container">
				<div className="col-md-12 col-sm-12 col-lg-12 col-xs-12">
				<Panel>
					<div className="col-md-2 col-lg-2 col-sm-4 col-xs-4">
						<Panel style={{backgroundColor:"gray"}}>
						<Image src={"https://tigerbook.herokuapp.com/images/"+netid} responsive />
						</Panel>
					</div>
					<div className="col-md-8 col-lg-8 col-sm-8 col-xs-8">
						<br/><br/>
						<h2 className="text-center">{pref_name} {name}</h2>
						<div className="text-center">
						{netid}@princeton.edu
						<br/>
						{major} {class_year}
						<br/>
						{room_num} {dorm}
						<br/>
						{hometown}
						<br />
						{birthdayNode}
						</div>
					</div>
					<div className="col-sm-12 col-md-10 col-lg-10 col-xs-12">
						<h2>Bio</h2>
						<div>
						{bioNode}
						</div>

					</div>
				</Panel>
				</div>
			</div>
			)
	}
}

export default Member;