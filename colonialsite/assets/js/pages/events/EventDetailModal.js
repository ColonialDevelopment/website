import { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';
import EventDetail from './EventDetail';

class EventDetailModal extends Component{
  constructor(props){
    super(props);
  }
  render() {
  	if (this.props.activeEvent){
      const   { title, description, location } = this.props.activeEvent
      return(
          <Modal onHide={this.props.onHide} show={this.props.showModal} bsSize="large" >
            <Modal.Body>
              <EventDetail activeEvent={this.props.activeEvent}
                           renderDetail={this.props.renderDetail}
                           refreshData={this.props.refreshData} /> 
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