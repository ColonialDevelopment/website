import {Component} from 'react';
import Cookies from 'js-cookie';
import {Button} from 'react-bootstrap';
class RSVPButton extends Component {
	constructor(props){
		super(props);
		this.state= {
			rsvp:this.props.rsvp_status
		}
	}
	handleSubmit(url){
		$.ajax({
			context:this,
			url:url,
			datatype:'json',
			contentType:'application/json'
		})
		.done(function(){
			this.setState({rsvp:!this.state.rsvp})
		})
		.fail(function(jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(jqXHR);
			console.log("Something went wrong on our end. This is terribly embarassing.")
		})
	}
	render(){
		if (this.props.status === "Closed"){
			return (
				<div> RSVP for this event is closed </div>
			)
		}
		if (!this.state.rsvp){
			return (
			<Button bsStyle="success"
					onClick={this.handleSubmit.bind(this, this.props.url+this.props.eventId+'/rsvp')}>
				RSVP
			</Button>
			)	
		}
		else{
			return (
				<Button bsStyle="danger"
						onClick={this.handleSubmit.bind(this, (this.props.url+this.props.eventId+'/cancel')) } >
					Cancel RSVP
				</Button>
			)
		}
	}
}

export default RSVPButton;