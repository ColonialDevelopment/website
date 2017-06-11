import React from 'react';
import {DropdownButton, MenuItem, Glyphicon} from 'react-bootstrap';

class EventSortSelect extends React.Component{
	constructor(props){
		super(props);
		this.state={
			open:false,
			sort:this.props.defaultSort
		}	
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
  	updateSort(id){
  		this.setState({sort:id});
  		this.props.updateSort(id);
  		console.log(this.state);
  	}
	render(){
		var sorts = this.props.sortTypes.map(function(type){
			
			if (type.id === this.state.sort){
				return (
					<MenuItem key={type.id} style={{backgroundColor:"#E8E8E8"}} onSelect={this.inputWasClicked.bind(this)} onClick={this.updateSort.bind(this, type.id)}>  
					<Glyphicon glyph="check" /> {type.id}
					</MenuItem>
					);
			}
			else{
				return (
					<MenuItem key={type.id} onSelect={this.inputWasClicked.bind(this)} onClick={this.updateSort.bind(this, type.id)}>  
					{type.id}
					</MenuItem>
					);
			}

		}.bind(this));

		return (
			<DropdownButton open={this.state.open} pullRight onToggle={this.onToggle.bind(this)} id="Sort Selection" title={<Glyphicon glyph="sort"/>}>
        		{sorts}
    		</DropdownButton>
    	);
	}
}

export default EventSortSelect;