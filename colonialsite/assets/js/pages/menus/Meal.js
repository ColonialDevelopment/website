import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Rating from './Rating';

function categorySort(a, b){

  // Change the order of these to change the order of menu categories
  // List of menu categories can be found in menus/models.py
  const categories_array = ['Soups', 'Hot Line', 'On the Chafer', 'On the Grill', 'Dessert'];
  var first = categories_array.indexOf(a);
  var second = categories_array.indexOf(b);

  if (first < second)
    return -1;
  else
    return 1
}

class Meal extends Component {
  // Render all the dishes in this category
  renderDishes(category, data) {
    return data.map((entry) => {
      if (entry.category === category) {
        return entry.dishes.map((dish) => {
          return (<ListItem key={dish.id} primaryText={dish.name} secondaryText={"Rating: "+ dish.avg_rating} onClick={(e) => this.props.showModal(
                                                (<Rating your_rating={dish.rating}   
                                                         avg_rating={dish.avg_rating}
                                                         url="/api/ratings/"
                                                         editable={false}
                                                         finishSubmit={this.props.finishSubmit}
                                                         id={dish.id}
                                                         rating_id={dish.rating_id} />), 'Rate '+dish.name)} />
            )
        })
      }
    })
  }

  renderMenu(categories, data) {
    if (categories.length === 0) return (<div></div>);
    if (!data) return (<div></div>);
    return categories.map((category) => {
      return(
        <div key={category}>
          <Subheader key={category}>
            {category}
          </Subheader>
          {this.renderDishes(category, data)}
          <Divider />
        </div>
      )
    })
  }

  render() {
    let categories = [];

    if (this.props.meal) this.props.meal.map((entry) => {
      const category = entry.category;
      if (!categories.includes(category)) categories.push(category);
    })

    if (this.props.meal && this.props.meal.length !== 0) {
      categories.sort(categorySort);
      return(
        <div>
          <h3>
            {this.props.name}
          </h3>
          <div style={{borderStyle: 'solid', borderWidth: '1px', borderColor: '#9ea5af'}}>
            <List className='text-left'>
              {this.renderMenu(categories, this.props.meal)}
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
            <ListItem secondaryText="This meal has not yet been posted!" />
          </List>
        </div>
      </div>
    )
  }
}

export default Meal;
