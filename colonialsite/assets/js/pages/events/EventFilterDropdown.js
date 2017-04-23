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
		console.log(id);
		var types_selected = this.state.types.map(function(d) {
			return {
				id:d.id,
				selected: (d.id == id ? !d.selected : d.selected)
			}
		})
		this.setState({ types: types_selected });
		this.props.updateFilteredList(types_selected, this.state.excludePast);
	}

	changeExcludePast(oldState) {
		console.log("In changeExcludePast");
		console.log(oldState);
		this.state.excludePast = !oldState;
		this.props.updateFilteredList(this.state.types, !oldState);
	}
	inputWasClicked() {
    	this._inputWasClicked = true;
  	}

  	onToggle(open) {
  		console.log(open);
    	if (this._inputWasClicked) {
      		this._inputWasClicked = false;
      		return;
   		}
    	this.setState({open: open});
    	console.log(this.state.open);
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
					<MenuItem key="Exclude Past" style={{backgroundColor:"#E8E8E8"}} onSelect={this.inputWasClicked.bind(this)}onClick={this.changeExcludePast.bind(this, this.state.excludePast)}>
						<Glyphicon glyph="check" />Exclude Past
					</MenuItem>	
				)
			}
			else{
				return (
					<MenuItem key="Exclude Past" onSelect={this.inputWasClicked.bind(this)} onClick={this.changeExcludePast.bind(this, this.state.excludePast)}>
						Exclude Past
					</MenuItem>	
				)
			}
		}

		var excludePastNode = checkExcludePast();
		return(
			<DropdownButton open={this.state.open} onToggle={this.onToggle.bind(this)} id="Filter Selection" title={<Glyphicon glyph="filter"/>} >
			{checks}
			{excludePastNode}
			</DropdownButton>	
		)
	}
}
export default EventFilterDropdown;