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
            <Modal.Header closeButton >
            <Modal.Title>{this.props.activeEvent.title}<br/><small>@{this.props.activeEvent.location}</small></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EventDetail activeEvent={this.props.activeEvent}
                           renderDetail={this.props.renderDetail}
                           refreshData={this.props.refreshData} 
                           hideTitle={true}/> 
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