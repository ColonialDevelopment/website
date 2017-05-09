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
		this.finishSubmit = this.finishSubmit.bind(this)
	}

	handleSelect(dish) {
		if (dish.length === 0) {
			this.setState({inputDish: null})
		} else {
			this.setState({inputDish: dish[0]})
			console.log(dish[0].name)
		}
	}

	finishSubmit() {
		this.setState({inputDish:null})
	}

	render () {
		var detail
		if (this.state.inputDish)
			detail = <DishInputDetails dish={this.state.inputDish}
									   finishSubmit={this.finishSubmit}
									   menu_id={1}/>

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