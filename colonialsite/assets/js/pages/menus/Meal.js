import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Rating from './Rating';
import DishInput from './DishInput';
import FlatButton from 'material-ui/FlatButton';
import Cookies from 'js-cookie';
var axios = require('axios');

export const categories_array = ['On the Grill', 'On the Chafer', 'Hot Line', 'Soups', 'Dessert'];

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

class Meal extends Component {
  constructor(props){
    super(props);
    this.renderDishes=this.renderDishes.bind(this);
    this.renderMenu=this.renderMenu.bind(this);
  }

  // Render all the dishes in this category
  renderDishes(category) {
    return (
      category.dishes.map((dish) => {
              return (<ListItem key={dish.id} primaryText={dish.name} secondaryText={"Rating: "+ dish.avg_rating} 
                onClick={
                  (e) => this.props.showModal((<Rating  your_rating={dish.rating}   
                                                        avg_rating={dish.avg_rating}
                                                        url="/api/ratings/"
                                                        editable={false}
                                                        finishSubmit={this.props.closeModal}
                                                        id={dish.id}
                                                        rating_id={dish.rating_id} />), 
                                                        ('Rate '+ dish.name)
                                              )
                } />)
      }))
  }

  renderMenu(categories) {
    if (categories.length === 0) return (<div></div>);
    return categories.map((category) => {
      if (category.dishes.length > 0){
        return(
          <div key={category.category}>
            <Subheader key={category.category}>
              {category.category}
            </Subheader>
            {this.renderDishes(category)}
            <Divider />
          </div>
        )
      }
      else{
        return <div key={category.category}/>
      }
    })
  }

  render() {
    
    let categories = new Array();
    let dish_count = 0;
    if (this.props.meal) this.props.meal.map((entry) => {
      const {category, id, dishes}  = entry;
      dish_count += dishes.length
      if (!
          (categories.find(function(x){
              return (x.category=== category)
            })
          )

          ) categories.push({category, id, dishes});
    })

    if (this.props.meal && this.props.meal.length !== 0 && dish_count > 0) {
      categories.sort(categorySort);
      return(
        <div>
          <h3>
            {this.props.name}
          </h3>
          <div style={{borderStyle: 'solid', borderWidth: '1px', borderColor: '#9ea5af'}}>
            <List className='text-left' style={{padding:'0px 0px'}}>
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
          <List className='text-left' style={{padding:'0px 0px'}}>
            <ListItem secondaryText="This meal has not yet been posted!" />
          </List>
        </div>
      </div>
    )
  }
}

export default Meal;
