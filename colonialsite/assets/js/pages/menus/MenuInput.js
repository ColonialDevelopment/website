import { Component } from 'react';
import { FormControl, FormGroup, InputGroup, Button } from 'react-bootstrap';
import DishAutocomplete from './DishAutocomplete.js';
import DishInputDetails from './DishInputDetails.js';
import {AutoComplete} from 'material-ui';
import Dish from './Dish.js';

class MenuInput extends Component {
	constructor(props){
		super(props);
		this.state = {
			inputDish: null,
			searchText: ""
		};
		this.handleSelect = this.handleSelect.bind(this)
		this.finishSubmit = this.finishSubmit.bind(this)
	}

	handleSelect(text, index) {
		if (index < 0){
			const inputDish = this.props.dishes.find((dish) => dish.name === text);
			if (inputDish){
				this.setState({inputDish})
			}
			else{
				this.setState({inputDish:{customOption:true, name:text}})
			}
		}
		else{
			this.setState({inputDish:this.props.dishes[index]})
		}
	}
	handleUpdate(text, dataSource){
		String.prototype.toTitleCase = function() {
		  	var i, j, str, lowers, uppers;
		  	str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
				    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});

		  	// Certain minor words should be left lowercase unless
	  		// they are the first or last words in the string
			lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
	  		'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
	  		for (i = 0, j = lowers.length; i < j; i++)
				str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'),
	      	function(txt) {
	        	return txt.toLowerCase();
	      	});

	  		// Certain words such as initialisms or acronyms should be left uppercase
	  		uppers = ['Id', 'Tv'];
	  		for (i = 0, j = uppers.length; i < j; i++)
	    		str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'),
	      				uppers[i].toUpperCase());

	  		return str;
		}
		const searchText = text.toTitleCase();

		this.setState({searchText});
	}
	finishSubmit() {
		this.setState({inputDish:null, searchText:""})
		this.props.updateDishes();
	}

	render () {
		var detail
		if (this.state.inputDish)
			detail = <DishInputDetails dish={this.state.inputDish}
									   finishSubmit={this.finishSubmit}
									   menu_id={this.props.menu_id} />
		return (
			<div style={{width:'90%', margin:10}}>
				<form>
				<AutoComplete  dataSource={this.props.dishes}
							   dataSourceConfig={{text:'name', value:'id'}}
							   openOnFocus={true}
							   fullWidth={true}
							   searchText={this.state.searchText}
							   listStyle={{ maxHeight: 200, overflow: 'auto' }}
							   floatingLabelText={"Add New Dish"}
							   onUpdateInput={this.handleUpdate.bind(this)}
							   filter={AutoComplete.fuzzyFilter}
	                           onNewRequest={this.handleSelect}
	                            />
	            {detail}
	            </form>
			</div>
		)
	}
}

export default MenuInput;