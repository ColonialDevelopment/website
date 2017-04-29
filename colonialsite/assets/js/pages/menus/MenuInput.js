import { Component } from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';
import DishAutocomplete from './DishAutocomplete.js';
import DishInputDetails from './DishInputDetails.js';
import {Typeahead} from 'react-bootstrap-typeahead';

class MenuInput extends Component {
	constructor(props){
		super(props);
		this.state = {inputDish: null};
		this.handleSelect = this.handleSelect.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}

	handleSelect(dish) {
		console.log(dish)
		if (dish.length === 0) {
			this.setState({inputDish: null})
		} else {
			this.setState({inputDish: dish[0]})
			console.log(dish[0].name)
		}
		//this.setState({value: e.target.value})
	}

	handleClick(e) {
		console.log(e)
	}

	render () {
		var detail
		if (this.state.inputDish)
			detail = <DishInputDetails dish={this.state.inputDish}/>

		return (
			<div>
				<Typeahead options={this.props.dishes}
				           labelKey={'name'}
				           allowNew
                           newSelectionPrefix="Add a new dish: "
                           onChange={this.handleSelect}
	            />
	            {detail}
			</div>
		)
	}	
}

export default MenuInput;