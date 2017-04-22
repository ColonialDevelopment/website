import { Component } from 'react';

class EventDetail extends Component {
  constructor(props){
    super(props);
  }

  render() {
    if (this.props.activeEvent) {
    const   { title, description } = this.props.activeEvent
    return(
      <div>
        <div>
          <h2 style={{paddingTop: 10, paddingBottom: 10}}>Event Details </h2>
        </div>
        <div className="" style={{backgroundColor: "#f0f7fd", padding: "15px 30px 15px 15px", borderLeft: "10px solid #9fc9ff"}}>
          <div className="">
            <h1>
              {title}
            </h1>
          </div>
          <div className="lead text-justify">
            <p>
              {description}
            </p>
          </div>
        </div>
      </div>
    )
  }
    else {
      return(
        <div>
        <h2 style={{paddingTop: "10", paddingBottom: 10}}>Event Details</h2>
        <p className="lead text-muted">Click an event to view its details</p>
        </div>
      )
    }
  }
}

export default EventDetail;
