import { Component } from 'react';

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
		if (this.props.filterText !== '') this.props.dishes.forEach((dish) => {
			if (dish.name.indexOf(this.props.filterText) === -1)
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