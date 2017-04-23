import { Component } from 'react';
import { match } from '../../Components/Search.js'

class DishAutocompleteResult extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div onClick={this.props.handleClick} value={this.props.dish}>
				{this.props.dish.name}
			</div>
		)
	}
}

class DishAutocomplete extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		var rows = [];
		this.props.dishes.forEach((dish) => {
			if (!match(dish.name, this.props.filterText))
				return;
			rows.push(<DishAutocompleteResult dish={dish} handleClick={this.props.handleClick}/>)
		});
		return (
			<div>
			{rows}
			</div>
		);
	}
}

export default DishAutocomplete;