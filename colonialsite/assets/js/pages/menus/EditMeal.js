import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Rating from './Rating';
import DishInput from './DishInput';
import FlatButton from 'material-ui/FlatButton';
import Cookies from 'js-cookie';
import {categories_array, BRUNCH_CATEGORIES, LUNCH_CATEGORIES, DINNER_CATEGORIES} from '../../statics/categories.js';
import {MENU_CATEGORY_POST, REMOVE_DISH_URL, DISHES_LIST, RATING_POST} from '../../statics/urls.js';

var axios = require('axios');

function categorySort(a, b){

  // Change the order of these to change the order of menu categories
  // List of menu categories can be found in menus/models.py
  
  var first = categories_array.indexOf(a.category);
  var second = categories_array.indexOf(b.category);

  if (first < second)
    return -1;
  else
    return 1
}

function getPossibleCategories(categories){
  var possibleNewCategories = [];
  if (categories){
      const x = categories_array.map(function(categoryName){
        if (categories.find(function(x){return x.category===categoryName})==undefined){
          possibleNewCategories.push(categoryName);
        } 
      }.bind(this))
  }
  return possibleNewCategories;
}

class EditMeal extends Component {
  constructor(props){
    super(props);
    this.renderDishes=this.renderDishes.bind(this);
    this.renderMenu=this.renderMenu.bind(this);
  }

  addCategory(categoryName){
    var type = ('post')
    console.log(categoryName);
    var url = (MENU_CATEGORY_POST)
    var csrftoken = Cookies.get('csrftoken');
    var post_category_data =
    {
      meal:this.props.name,
      date:this.props.date,
      category:categoryName,
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
      this.props.fetchData();
    }.bind(this))
    .catch(function(jqXHR, textStatus, errorThrown){
      console.log(textStatus);
      console.log(jqXHR);
      console.log("Something broke trying to post a new menu category")
    })
  }

  deleteDish(id, menu_id){
    var type = ('delete')
    var url = (REMOVE_DISH_URL(id))
    var csrftoken = Cookies.get('csrftoken');
    var delete_data = {menu: menu_id}
    axios({
      method:type,
      url:url,
      responseType:'json',
      headers: { "X-CSRFToken": csrftoken},
      data:delete_data
    })
    .then(function(){ 
      this.props.fetchData();
    }.bind(this))
    .catch(function(jqXHR, textStatus, errorThrown){
      console.log(textStatus);
      console.log(jqXHR);
      console.log("You have already reviewed this and we messed up")
    })
  }

  // Render all the dishes in this category
  renderDishes(category, data) {
    var dishInput = <DishInput url={DISHES_LIST}
                               renderMenu={this.props.fetchData}
                               menu_id={category.id}/>

    return (<div> {category.dishes.map((dish) => {
          const deleteButton = <FlatButton  key={dish.id}
                                            label="Delete Dish"
                                            primary={true}
                                            onTouchTap={function(){this.deleteDish(dish.id, category.id);}.bind(this)}/>

          return (<ListItem key={dish.id} 
                            primaryText={dish.name} 
                            secondaryText={"Rating: "+ dish.avg_rating} 
                            onClick={(e) => this.props.showModal(
                                                (<Rating your_rating={dish.rating}   
                                                         avg_rating={dish.avg_rating}
                                                         url={RATING_POST}
                                                         editable={false}
                                                         finishSubmit={this.props.finishSubmit}
                                                         id={dish.id}
                                                         rating_id={dish.rating_id} />), 
                                                  'Rate '+ dish.name,
                                                  deleteButton
                                    )} />
                  )
    })}{dishInput}</div>)
  }

  renderMenu(categories) {
    if (categories.length === 0) return (<div></div>);
    return categories.map((category) => {
      return(
        <div key={category.category}>
          <Subheader key={category.category}>
            {category.category}
          </Subheader>
          {this.renderDishes(category)}
          <Divider />
        </div>
      )
    })
  }

  render() {
    
    let categories = new Array();

    // If the meal data has come down to the component and there are menuCategories that have not been initialized for this day
    if (this.props.meal){
      this.props.meal.map((entry) => {
        const {category, id, dishes}  = entry;
        categories.push({category, id, dishes}); 
      })

      // If there are no menu categories yet, we have not initialized them
      if (categories.length === 0){
        switch(this.props.name){
          case "Lunch":
            LUNCH_CATEGORIES.map((category) => this.addCategory(category))
            break;
          case "Dinner":
            DINNER_CATEGORIES.map((category) => this.addCategory(category))
            break;
          case "Brunch":
            BRUNCH_CATEGORIES.map((category) => this.addCategory(category))
            break;
        }
      }
    } 

    if (this.props.meal) {
      categories.sort(categorySort);
      return(
        <div>
          <h3>
            {this.props.name}
          </h3>
          <div style={{borderStyle: 'solid', borderWidth: '1px', borderColor: '#9ea5af'}}>
            <List className='text-left'>
              {this.renderMenu(categories)}
            </List>
          </div>
        </div>
      )
      // No menus entered today
    }
    return(
      <div>
        <h3>
          {this.props.name}
        </h3>
        <div style={{borderStyle: 'solid', borderWidth: '1px', borderColor: '#9ea5af'}}>
          <List className='text-left'>
            <ListItem secondaryText="Waiting for menus to load" />
          </List>
        </div>
      </div>
    )
  }
}

export default EditMeal;
