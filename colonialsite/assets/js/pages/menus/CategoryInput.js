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
			value:1
		}
		this.addCategory=this.addCategory.bind(this)
	}
	addCategory(categoryName){
		console.log(categories_array[categoryName]);
		var type = ('post')
		var url = ("/api/menu_categories/")
		var csrftoken = Cookies.get('csrftoken');
		console.log(this.props.date)
		console.log(this.props.name)
		var post_category_data =
		{
			meal:this.props.name,
			date:this.props.date,
			category:categories_array[categoryName],
			dishes:[],
			meal_permissions:"ALL"
		}
		axios({
			method:type,
			url:url,
			responseType:'json',
			headers: { "X-CSRFToken": csrftoken},
			data:post_category_data
		})
		.then(function(){ 
			console.log("Posted");
			this.props.renderMenu();
		}.bind(this))
		.catch(function(jqXHR, textStatus, errorThrown){
			console.log(textStatus);
			console.log(jqXHR);
			console.log("You have already reviewed this and we messed up")
		})
	}
	handleChange(event, index, value){
		console.log(value);
		this.addCategory(value);
	}
	render(){
		
		var possibleNewCategories = []
		if (this.props.existingCategories){
			const x = categories_array.map(function(categoryName){
				if (this.props.existingCategories.find(function(x){return x.category===categoryName})==undefined){
					possibleNewCategories.push(categoryName);
				} 
			}.bind(this))
		}
		var i = 0;
		const menuItems = possibleNewCategories.map(function(categoryName){
			return (<MenuItem value={categories_array.indexOf(categoryName)} key={categoryName} primaryText={categoryName} />)
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
export default CategoryInput