import React from 'react';
import {DropdownButton, MenuItem, Glyphicon} from 'react-bootstrap';

class EventSortSelect extends React.Component{
	constructor(props){
		super(props);	
	}

	render(){
		var sorts = this.props.sortTypes.map(function(type){
			return (
				<MenuItem key={type.id}> 
				<input type="radio" value={type.id}  checked={type.checked} onChange={this.props.updateSort.bind(null,type.id)}/> 
				{type.id}
				</MenuItem>
				);
		}.bind(this));

		return (
			<DropdownButton id="Sort Selection" title={<Glyphicon glyph="sort"/>}>
        		{sorts}
    		</DropdownButton>
    	);
	}
}

export default EventSortSelect;