import React from 'react';

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
				<div>
					<input type="checkbox" checked={d.selected} onChange={this.changeSelection.bind(this, d.id)} />
					{d.id}
					<br/>
				</div>
				);
		}.bind(this));

		return(
			<form>
			{checks}	
			</form>	
		)
	}
}
export default EventFilterDropdown;