import React from 'react';
import { Panel } from 'react-bootstrap';

var Event = React.createClass({
	render: function(){
		return (
				<Panel>
                       <span>{this.props.name}</span>
                </Panel>
               )
	}

});

export default Event;