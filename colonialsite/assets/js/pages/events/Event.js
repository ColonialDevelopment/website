import React from 'react';
import { Panel } from 'react-bootstrap';

var Event = React.createClass({
	render: function(){
		if (this.props.selected){
			return(
					<Panel onClick={() => {this.props.onClick(this.props.id);}} header={this.props.date} style={{backgroundColor:"#DEF1DE"}}>
	                       <span>{this.props.name}</span>
	                </Panel>
	               )
		}
		else
		{
			return (
					<Panel onClick={() => {this.props.onClick(this.props.id);}} header={this.props.date}>
	                       <span>{this.props.name}</span>
	                </Panel>
				)
		}
	}

});
export default Event;
