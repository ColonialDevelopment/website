import { Component } from 'react';
import { Checkbox } from 'react-bootstrap';
import { RaisedButton, TextField } from 'material-ui';
import Cookies from 'js-cookie';
import {DISH_POST, DISH_PUT} from '../../statics/urls.js';
var axios = require('axios');

class DishInputDetails extends Component {
	constructor(props) {
		super(props)
		if (this.props.dish.customOption) {
			this.state = {
				dairy_free: false,
				kosher_halal: false,
				nut_free: false,
				soy_free: false,
				vegan: false,
				vegetarian: false,
				allergens: ''
			}
		} else {
			this.state = {
				dairy_free: this.props.dish.dairy_free,
				kosher_halal: this.props.dish.kosher_halal,
				nut_free: this.props.dish.nut_free,
				soy_free: this.props.dish.soy_free,
				vegan: this.props.dish.vegan,
				vegetarian: this.props.dish.vegetarian,
				allergens: this.props.dish.allergens
			}
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleInputChange(event) {
		const target = event.target
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name

		this.setState({
			[name]: value
		})
	}

	handleSubmit(e) {
		// does some submission stuff
		const type = (this.props.dish.customOption ? 'post' : 'put')
		const url = (this.props.dish.customOption ? DISH_POST : DISH_PUT(this.props.dish.id))
		const dishes = (this.props.dish.customOption ? new Array() : this.props.dish.menus)
		const newMenu = this.props.menu_id;

		const csrftoken = Cookies.get('csrftoken');
		const post_or_put_dish_menus = dishes.includes(newMenu) ? dishes : dishes.concat(newMenu) 

		var post_or_put_dish_data =
		{
			name:this.props.dish.name,
			menus:post_or_put_dish_menus,
			allergens:this.state.allergens,
			dairy_free:this.state.dairy_free,
			kosher_halal:this.state.kosher_halal,
			nut_free:this.state.nut_free,
			sory_free:this.state.soy_free,
			vegan:this.state.vegan,
			vegetarian:this.state.vegetarian
		}

		axios({
			method:type,
			url:url,
			responseType:'json',
			headers: { "X-CSRFToken": csrftoken},
			data:post_or_put_dish_data
		})
		.then(function(){ 
			this.props.finishSubmit();
		}.bind(this))
		.catch(function(jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(jqXHR);
			console.log("You have already reviewed this and we messed up")
		})
		e.preventDefault()
	}

	render() {
		return (
				<div>
				<div className='form-group' >
					<label className="checkbox-inline">
						<input type='checkbox'
							   checked={this.state.dairy_free}
							   onChange={this.handleInputChange}
							   name={'dairy_free'}
						/> Dairy Free
					</label>
					<label className="checkbox-inline">
						<input type='checkbox'
							   checked={this.state.kosher_halal}
							   onChange={this.handleInputChange}
							   name={'kosher_halal'}
						/> Kosher/Halal
					</label>
					<label className="checkbox-inline">
						<input type='checkbox'
							   checked={this.state.nut_free}
							   onChange={this.handleInputChange}
							   name={'nut_free'}
						/> Nut Free
					</label>
					<label className="checkbox-inline">
						<input type='checkbox'
							   checked={this.state.soy_free}
							   onChange={this.handleInputChange}
							   name={'soy_free'}
						/> Soy Free
					</label>
					<label className="checkbox-inline">
						<input type='checkbox'
							   checked={this.state.vegan}
							   onChange={this.handleInputChange}
							   name={'vegan'}
						/> Vegan
					</label>
					<label className="checkbox-inline">
						<input type='checkbox'
							   checked={this.state.vegetarian}
							   onChange={this.handleInputChange}
							   name={'vegetarian'}
						/> Vegetarian
					</label>
				</div>
				<div style={{width:'90%'}}>
				Allergens: 
					<TextField
						   value={this.state.allergens}
						   name={'allergens'}
						   onChange={this.handleInputChange}
						   style={{width:'90%'}}
				   	/>
				</div>
				<br/>
				<div>
					Rating: {this.props.dish.avg_rating} from {this.props.dish.num_ratings} ratings.
				</div>
				<br/>
				<div>
					<RaisedButton 	onClick={this.handleSubmit} autoFocus>
						Submit
					</RaisedButton>
				</div>
				</div>
		)
	}
}

export default DishInputDetails;