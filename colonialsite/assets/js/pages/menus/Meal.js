import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

class Meal extends Component {
  // Render all the dishes in this category
  renderDishes(category, data) {
    return data.map((entry) => {
      if (entry.category === category) {
        return entry.dishes.map((dish) => {
          return <ListItem key={dish.id} primaryText={dish.name} />
        })
      }
    })
  }

  renderMenu(categories, data) {
    if (categories.length === 0) return (<div></div>);
    if (!data) return (<div></div>);
    return categories.map((category) => {
      return(
        <div>
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
            <ListItem secondaryText="No meals have been entered yet" />
          </List>
        </div>
      </div>
    )
  }
}

export default Meal;
