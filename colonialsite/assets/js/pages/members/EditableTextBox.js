import {Component} from 'react';
import InlineEdit from 'react-edit-inline';
import {Button} from 'react-bootstrap';

class EditableTextBox extends Component{
	constructor(props){
		super(props);
		var text ="";
		if (this.props.default_text === "" || this.props.default_text===null)
			if (this.props.inputType==="birthday")
				text = "MM/DD/YYYY"
			else
				text = "Enter " + this.props.inputType + " here";
		else{
			text = this.props.default_text
		}
		this.state={
			text:text
		}
	}

	render(){
		return (<div className="container-fluid">
            <InlineEdit {...this.props}
              			text={this.state.text}
              			paramName="message"
            />
        </div>)
	}
}

export default EditableTextBox;
