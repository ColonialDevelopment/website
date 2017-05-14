import React, { Component } from 'react';
import MenuInput from './MenuInput';

class DishInput extends Component{
	constructor(props){
		super(props);
		this.state = {
			data: []
		};
	}

    loadContentFromServer() {
        $.ajax({
            url: this.props.url,
            datatype: 'json',
            cache: false,
            success: function(data) {
                this.setState({data:data.results});
                this.props.renderMenu()
            }.bind(this)
        })
    }

	componentDidMount() {
        this.loadContentFromServer();
    }
	render(){
		return (<MenuInput updateDishes={this.loadContentFromServer.bind(this)}
						   dishes={this.state.data}
						   menu_id={this.props.menu_id}/>)
	}
}
export default DishInput;