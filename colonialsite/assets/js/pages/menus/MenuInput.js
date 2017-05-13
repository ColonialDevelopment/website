import { Component } from 'react';
import { FormControl, FormGroup, InputGroup, Button } from 'react-bootstrap';
import DishAutocomplete from './DishAutocomplete.js';
import DishInputDetails from './DishInputDetails.js';
import {Typeahead} from 'react-bootstrap-typeahead';
import Dish from './Dish.js';

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
		}
	}

	finishSubmit() {
		this.setState({inputDish:null})
		this._typeahead.getInstance().clear();
		this.props.updateDishes();
	}

	render () {
		var detail
		if (this.state.inputDish)
			detail = <DishInputDetails dish={this.state.inputDish}
									   finishSubmit={this.finishSubmit}
									   menu_id={this.props.menu_id}/>

		return (
			<div>
				<Typeahead 	   options={this.props.dishes}
					           labelKey={'name'}
					           allowNew
					           modal={false}
	                           newSelectionPrefix="Add a new dish: "
	                           onChange={this.handleSelect}
	                           submitFormOnEnter={true}
	                           ref={ref => this._typeahead = ref}
	                           placeholder={"Add a dish to this category"}
	                           renderMenuItemChildren={(result, props) =>{
	                           		return (
	                           			<Dish   dish={result}
	                        			editable={false}
	                    				ratable={false}
	                  					/>);
	                           }} />
	            {detail}
			</div>
		)
	}	
}

export default MenuInput;