import React from 'react';
import {DropdownButton, MenuItem, Glyphicon} from 'react-bootstrap';
class EventFilterDropdown extends React.Component{
	
	constructor(props) {
		super(props);
		this.state=
		{
			types:this.props.types
		};
	}

	changeSelection(id) {
		var types_selected = this.state.types.map(function(d) {
			return {
				id:d.id,
				selected: (d.id == id ? !d.selected : d.selected)
			}
		})
		this.setState({ types: types_selected });
		this.props.updateFilteredList(types_selected);
	}

	render(){
		var checks = this.state.types.map(function(d) {
			return (
					<MenuItem key={d.id}> <input type="checkbox" checked={d.selected} onChange={this.changeSelection.bind(this, d.id)} />
					{d.id}
					</MenuItem>
				);
		}.bind(this));

		return(
			<DropdownButton id="Filter Selection" title={<Glyphicon glyph="filter"/>}>
			{checks}
			<MenuItem key="Exclude Past"><input type="checkbox" checked={this.props.excludePast} onChange={this.props.changeExcludePast}/>
					Exclude Past
			</MenuItem>	
			</DropdownButton>	
		)
	}
}
export default EventFilterDropdown;