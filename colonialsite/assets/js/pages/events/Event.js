import React from 'react';
import { Panel } from 'react-bootstrap';

var Event = React.createClass({
	render: function(){
		return (
				<Panel header={this.props.date}>
                       <span>{this.props.name}</span>
                </Panel>
               )
	}

});
export default Event;