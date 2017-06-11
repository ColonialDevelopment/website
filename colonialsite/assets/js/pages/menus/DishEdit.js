import { Component } from 'react';
import { Checkbox } from 'react-bootstrap';
import { RaisedButton, TextField } from 'material-ui';
import Cookies from 'js-cookie';
import DishInputDetails from './DishInputDetails';

var axios = require('axios');

class DishEdit extends Component{
	constructor(props){
		super(props);
	}
	render(){
		const detail = <DishInputDetails dish={this.props.dish}
										 
										 finishSubmit={this.props.closeModal}
										 menu_id={this.props.menu_id} />
	 	return (<div>
	 				{detail}
 				</div>)
	}
}

export default DishEdit;