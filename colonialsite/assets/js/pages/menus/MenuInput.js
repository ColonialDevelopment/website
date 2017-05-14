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
			this.setState({inputDish:{customOption:true, name:text}})
		}
		else{
			this.setState({inputDish:this.props.dishes[index]})
		}
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
									   menu_id={this.props.menu_id}/>

		return (
			<div style={{width:'90%', margin:10}}>
				<AutoComplete  dataSource={this.props.dishes}
							   dataSourceConfig={{text:'name', value:'id'}}
							   openOnFocus={true}
							   fullWidth={true}
							   searchText={this.state.searchText}	
							   listStyle={{ maxHeight: 200, overflow: 'auto' }}
							   floatingLabelText={"Add New Dish"}
							   onUpdateInput={(searchText) => this.setState({searchText:searchText})}
							   filter={AutoComplete.fuzzyFilter}
	                           onNewRequest={this.handleSelect}
	                            />
	            {detail}
			</div>
		)
	}	
}

export default MenuInput;