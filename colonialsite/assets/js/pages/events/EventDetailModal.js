import { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';
import EventDetail from './EventDetail';

class EventDetailModal extends Component{
  constructor(props){
    super(props);
  }
  render() {
  	if (this.props.activeEvent){
  		console.log(this.props.activeEvent);
      const   { title, description, location } = this.props.activeEvent
      return(
          <Modal onHide={this.props.onHide} show={this.props.showModal} bsSize="large" >
            <Modal.Body>
              <EventDetail activeEvent={this.props.activeEvent} /> 
            </Modal.Body>
          </Modal>
    )
  	}
  	else{
  		return (<div/>)
  	}
  }
}

export default EventDetailModal;