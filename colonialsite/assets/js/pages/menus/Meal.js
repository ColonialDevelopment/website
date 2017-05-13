import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Rating from './Rating';
import DishInput from './DishInput';
import CategoryInput from './CategoryInput';

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
  renderDishes(category, data) {
    var dishInput = this.props.edit ? <DishInput url='/api/dishes/'
                                                 renderMenu={this.props.fetchData}
                                                 menu_id={category.id}
                                                 /> : <div />
    return (<div> {data.map((entry) => {
      if (entry.category === category.category) {
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
    })}{dishInput}</div>)
  }

  renderMenu(categories, data) {
    if (categories.length === 0) return (<div></div>);
    if (!data) return (<div></div>);
    return categories.map((category) => {
      return(
        <div key={category.category}>
          <Subheader key={category.category}>
            {category.category}
          </Subheader>
          {this.renderDishes(category, data)}
          <Divider />
        </div>
      )
    })
  }

  render() {
    
    let categories = new Array();
    if (this.props.meal) this.props.meal.map((entry) => {
      const category = entry.category;
      const id = entry.id;
      if (!
          (categories.find(function(x){
              return (x.category=== category)
            })
          )
          ) categories.push({category:category, id:id});
    })

    if (this.props.edit && categories.length < 4) {var categoryInput=<CategoryInput name={this.props.name}
                                                                                    date={this.props.date}
                                                                                    renderMenu={this.props.fetchData}
                                                                                    existingCategories={categories}/>;}
    else var categoryInput=(<div/>);

    if (this.props.meal && this.props.meal.length !== 0) {
      categories.sort(categorySort);
      return(
        <div>
          <h3>
            {this.props.name}
          </h3>
          <div style={{borderStyle: 'solid', borderWidth: '1px', borderColor: '#9ea5af'}}>
            <List className='text-left'>
              {categoryInput}
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
            {categoryInput}
          </List>
        </div>
      </div>
    )
  }
}

export default Meal;
