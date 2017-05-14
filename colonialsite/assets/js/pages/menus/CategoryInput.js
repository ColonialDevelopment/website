import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {ListItem} from 'material-ui/List';
import Cookies from 'js-cookie';
var axios = require('axios');

const categories_array = ['On the Grill', 'On the Chafer', 'Hot Line', 'Soups', 'Dessert'];

class CategoryInput extends Component{
	constructor(props){
		super(props);
		this.state={
			value: 0
		}
		this.addCategory = this.addCategory.bind(this)
	}
	addCategory(categoryName){
		var type = ('post')
		var url = ("/api/menu_categories/")
		var csrftoken = Cookies.get('csrftoken');
		var post_category_data =
		{
			meal:this.props.name,
			date:this.props.date,
			category:this.props.newCategories[categoryName],
			dishes:[],
			meal_permissions:"ALL"
		}
		axios({
			method:type,
			url:url,
			cache:false,
			responseType:'json',
			headers: { "X-CSRFToken": csrftoken},
			data:post_category_data
		})
		.then(function(){ 
			this.props.renderMenu();
			this.setState({value:0});
		}.bind(this))
		.catch(function(jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(jqXHR);
			console.log("You have already reviewed this and we messed up")
		})
	}
	handleChange(event, index, value){
		this.setState({value})
		this.addCategory(value);
	}
	render(){
		const newCategories = this.props.newCategories;
		if (newCategories.length > 0){
			var i = 0;
			const menuItems = newCategories.map(function(categoryName){
				return (<MenuItem value={newCategories.indexOf(categoryName)} key={categoryName} primaryText={categoryName} />)
			})
			return(
				<div>

				<ListItem key={"dummy list item"} primaryText={"Add a new Category"} />
				<DropDownMenu value={this.state.value} onChange={this.handleChange.bind(this)} >
				{menuItems}
				</DropDownMenu>
				</div>
				)
		}
	}
}
export default CategoryInput