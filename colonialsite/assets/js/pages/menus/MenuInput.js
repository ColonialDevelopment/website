import { Component } from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';
import DishAutocomplete from './DishAutocomplete.js';

class MenuInput extends Component {
	constructor(props){
		super(props);
		this.state = {value: ''};
		this.handleChange = this.handleChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}

	handleChange(e) {
		this.setState({value: e.target.value})
	}

	handleClick(e) {
		console.log(e)
	}

	render () {
		return (
			<form>
				<FormGroup>
					<FormControl type="text"
								 placeholder="Enter text"
								 value={this.state.value}
								 onChange={this.handleChange}
					 />
				</FormGroup>
				<DishAutocomplete dishes={this.props.dishes}
								  filterText={this.state.value}
								  handleClick={this.handleClick}
				/>
			</form>
		)
	}	
}

export default MenuInput;