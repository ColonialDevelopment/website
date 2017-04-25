import {Component} from 'react';
import {Panel, Image} from 'react-bootstrap';
import InlineEdit from 'react-edit-inline';
import EditableTextBox from './EditableTextBox';
import Cookies from 'js-cookie';

class Member extends Component{
	constructor(props){
		super(props);
		this.state={
			bio:this.props.member.bio,
			changed:false
		}
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

		var bioNode = this.props.editable ? 
	  									    (<EditableTextBox default_text={this.state.bio}
															  key={"bio_text"}
															  className={"p"}
					              							  staticElement={"div"}
												              editingElement={"textarea"}
												              activeClassName={"form-control bio-input"}
												              maxLength={2000}
												              dataChanged={this.bio_data_changed.bind(this)}
												              style={{font:15, height:"300px !important"}}
															  handleSubmit={(data) => console.log(data)}
															   />) 
										: bio;

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