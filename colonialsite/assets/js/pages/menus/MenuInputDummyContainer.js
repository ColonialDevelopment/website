import { Component } from 'react';
import MenuInput from './MenuInput.js';
import Dish from './Dish.js';

class MenuInputDummyContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {data: []};
	}

    loadContentFromServer() {
        $.ajax({
            url: this.props.url,
            datatype: 'json',
            cache: false,
            success: function(data) {
                this.setState({data:data.results});
            }.bind(this)
        })
    }

	componentDidMount() {
        this.loadContentFromServer();
        setInterval(this.loadContentFromServer,
            this.props.pollInterval)
    }

    render() {
        var dishes = this.state.data.map(function(dish){
            return (
                <Dish   dish={dish}
                        editable={true}
                        ratable={true}
                  />
            );
        })

    	return (
            <div className='container'>
    		<MenuInput dishes={this.state.data} />
            {dishes}
            </div>
		)
    }
}

export default MenuInputDummyContainer;