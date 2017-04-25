import { Component } from 'react';

class EventDetail extends Component {
  constructor(props){
    super(props);
  }

  renderImage() {
    const { image } = this.props.activeEvent

    if (!image) {
      return (<div></div>);
    }
    else {
      return (<img src={image} style={{width:200, height:300}}/>);
    }
  }

  render() {
    if (this.props.activeEvent) {
      const   { title, description, location } = this.props.activeEvent
      // If there is an image to display
      if (this.props.activeEvent.image) {
        return(
          <div className="">
            <div>
              <h2 style={{paddingTop: 10, paddingBottom: 10}}>Event Details </h2>
            </div>
            <div className="row" style={{backgroundColor: "#f0f7fd", padding: "15px 30px 15px 0px", borderLeft: "10px solid #9fc9ff"}}>
              <div className="col-lg-8">
                <div className="">
                  <h2>
                    {title}
                      <div>
                        <small>
                        {"@" + location}
                        </small>
                      </div>
                  </h2>
                </div>
                <div className="lead">
                  <p>
                    {description}
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                {this.renderImage()}
              </div>
            </div>
          </div>
        )
      }
      // If there is no image to display
      else {
        return(
          <div className="">
            <div>
              <h2 style={{paddingTop: 10, paddingBottom: 10}}>Event Details </h2>
            </div>
            <div className="row" style={{backgroundColor: "#f0f7fd", padding: "15px 30px 15px 15px", borderLeft: "10px solid #9fc9ff"}}>
              <div className="">
                <h2>
                  {title}
                    <div>
                      <small>
                      {"@" + location}
                      </small>
                    </div>
                </h2>
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
    }
  else {
    return(
      <div>
      <h2 style={{paddingTop: 10, paddingBottom: 10}}>Event Details</h2>
      <p className="lead text-muted">Click an event to view its details</p>
      </div>
    )
  }
  }
}

export default EventDetail;
