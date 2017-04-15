import React from 'react';

class EventFilterDropdown extends React.Component{
	
	constructor(props) {
		super(props);
		this.state=
		{
			data:this.props.types
		};
	}

	changeSelection(id) {
		var state = this.state.data.map(function(d) {
			return {
				id:d.id,
				selected: (d.id == id ? !d.selected : d.selected)
			}
		})
		this.setState({ data: state });
		this.props.updateFilteredList(this.state.data);
	}

	render(){
		
		var checks = this.state.data.map(function(d) {
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