import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Rating from './Rating';
import DishInput from './DishInput';
import DishEdit from './DishEdit';
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
    this.state = { addedCategoryDates: {} };
    this.addCategoriesIfNeeded = this.addCategoriesIfNeeded.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.renderDishes = this.renderDishes.bind(this);
    this.renderMenu = this.renderMenu.bind(this);

    this.addCategoriesIfNeeded(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.addCategoriesIfNeeded(nextProps);
  }

  addCategoriesIfNeeded(props) {
    // If the meal data has come down to the component and there are menuCategories that have not been initialized for this day
    if (!this.state.addedCategoryDates[props.date] && props.meal && props.meal.length === 0) {
      console.log('Adding categories for', props.name, props.date,);

      let categories = [];
      switch(props.name) {
        case "Lunch":
          categories = LUNCH_CATEGORIES;
          break;
        case "Dinner":
          categories = DINNER_CATEGORIES;
          break;
        case "Brunch":
          categories = BRUNCH_CATEGORIES;
          break;
      }

      const promises = categories.map(this.addCategory.bind(this, props.name, props.date));
      Promise.all(promises).then(props.fetchData.bind(this, props.date, true));
      this.setState({
        addedCategoryDates: Object.assign({ [props.date]: true }, this.state.addedCategoryDates),
      });
    }
  }

  addCategory(name, date, categoryName){
    var csrftoken = Cookies.get('csrftoken');
    var post_category_data = {
      meal: name,
      date: date,
      category:categoryName,
      dishes:[],
      meal_permissions:"ALL",
    };
    return axios({
      method: 'post',
      url: MENU_CATEGORY_POST,
      cache: false,
      responseType: 'json',
      headers: { "X-CSRFToken": csrftoken},
      data: post_category_data
    }).catch(function(jqXHR, textStatus, errorThrown){
      console.log(textStatus);
      console.log(jqXHR);
      console.log("Something broke trying to post a new menu category")
    });
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
    .then(this.props.fetchData.bind(this, this.props.date))
    .catch(function(jqXHR, textStatus, errorThrown){
      console.log(textStatus);
      console.log(jqXHR);
      console.log("You have already reviewed this and we messed up")
    })
  }

  // Render all the dishes in this category
  renderDishes(category, data) {
    var dishInput = <DishInput url={DISHES_LIST}
                               renderMenu={this.props.fetchData.bind(this, this.props.date, true)}
                               menu_id={category.id}/>

    return (
      <div>
        {
          category.dishes.map((dish) => {
            const deleteButton = <FlatButton  key={dish.id}
                                              label="Delete Dish"
                                              primary={true}
                                              onTouchTap={function(){this.deleteDish(dish.id, category.id);}.bind(this)}/>
            const dishEdit = <DishEdit  dish={dish}
                                        closeModal={this.props.fetchData.bind(this, this.props.date, true)}
                                        menu_id={category.id} />
            return (
              <ListItem key={dish.id}
                primaryText={dish.name}
                secondaryText={"Rating: "+ dish.avg_rating}
                onClick={(e) => this.props.showModal(dishEdit, deleteButton, true)} />
            );
          })
        }
        {dishInput}
      </div>
    );
  }

  renderMenu(categories) {
    if (categories.length === 0) return (<div></div>);
    return categories.map(category => (
      <div key={category.category}>
        <Subheader>
          {category.category}
        </Subheader>
        {this.renderDishes(category)}
        <Divider />
      </div>
    ));
  }

  render() {
    const meal = this.props.meal;

    if (meal) {
      meal.sort(categorySort);
      return(
        <div>
          <h3>
            {this.props.name}
          </h3>
          <div style={{borderStyle: 'solid', borderWidth: '1px', borderColor: '#9ea5af'}}>
            <List className='text-left'>
              {this.renderMenu(meal)}
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
