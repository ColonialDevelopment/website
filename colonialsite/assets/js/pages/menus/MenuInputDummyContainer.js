import { Component } from 'react';
import MenuInput from './MenuInput.js';

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
    	return (
    		<MenuInput dishes={this.state.data} />
		)

    	/*
    	console.log("state in render");
    	console.log(this.state);
        if (this.state.data){
            var eventNodes = this.state.data.map(function(dish){
                return (
                	<div>
                		{dish.name}
                	</div>
        		)
            })
        }
        return (
                <div>
                    <div className="container col-md-12 col-sm-12 col-xs-12 col-lg-6">
                     <div className='scroll-container-header border-bottom-1'> Events: </div>
                        <div className="scroll-container">
                        {eventNodes}
                        </div>
                    </div>
                </div>
               )*/
    }
}

export default MenuInputDummyContainer;