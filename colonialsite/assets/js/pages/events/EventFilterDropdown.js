import React from 'react';
import {DropdownButton, MenuItem, Glyphicon} from 'react-bootstrap';
class EventFilterDropdown extends React.Component{
	
	constructor(props) {
		super(props);
		this.state=
		{
			types:this.props.types,
			excludePast: true,
			open:false
		};
	}

	changeSelection(id) {
		var types_selected = this.state.types.map(function(d) {
			return {
				id:d.id,
				selected: (d.id == id ? !d.selected : d.selected)
			}
		})
		this.props.updateFilteredList(types_selected, this.state.excludePast);
		this.setState({ types: types_selected });
	}

	changeExcludePast() {
		this.props.updateFilteredList(this.state.types, !this.state.excludePast);
		this.setState({excludePast : !this.state.excludePast});
	}
	inputWasClicked() {
    	this._inputWasClicked = true;
  	}

  	onToggle(open) {
    	if (this._inputWasClicked) {
      		this._inputWasClicked = false;
      		return;
   		}
    	this.setState({open: open});
  	}
	render(){
		var checks = this.state.types.map(function(d) {
			if (d.selected){
				return (
						<MenuItem key={d.id} style={{backgroundColor:"#E8E8E8"}} onSelect={this.inputWasClicked.bind(this)} onClick={this.changeSelection.bind(this, d.id)}> 
						<Glyphicon glyph="check" />{d.id}
						</MenuItem>
					);
			}
			else {
				return (
					<MenuItem key={d.id} onSelect={this.inputWasClicked.bind(this)} onClick={this.changeSelection.bind(this, d.id)}> 
						{d.id}
					</MenuItem>
					)
			}
		}.bind(this));

		var checkExcludePast = () => {
			if (this.state.excludePast){
				return (
					<MenuItem key="Exclude Past" style={{backgroundColor:"#E8E8E8"}} onSelect={this.inputWasClicked.bind(this)}onClick={this.changeExcludePast.bind(this)}>
						<Glyphicon glyph="check" />Exclude Past
					</MenuItem>	
				)
			}
			else{
				return (
					<MenuItem key="Exclude Past" onSelect={this.inputWasClicked.bind(this)} onClick={this.changeExcludePast.bind(this)}>
						Exclude Past
					</MenuItem>	
				)
			}
		}

		var excludePastNode = checkExcludePast();
		return(
			<DropdownButton open={this.state.open} pullRight onToggle={this.onToggle.bind(this)} id="Filter Selection" title={<Glyphicon glyph="filter"/>} >
			{checks}
			{excludePastNode}
			</DropdownButton>	
		)
	}
}
export default EventFilterDropdown;