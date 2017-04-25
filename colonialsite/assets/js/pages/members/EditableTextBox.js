import {Component} from 'react';
import InlineEdit from 'react-edit-inline';

class EditableTextBox extends Component{
	constructor(props){
		super(props);
		var text = "";
		if (this.props.default_text === "")
			text = "Enter text here";
		else{
			text = this.props.default_text
		}
		console.log(text);
		this.state={
			text:text
		}
		this.dataChanged = this.dataChanged.bind(this);
	}

	dataChanged(data){
		console.log(data);
		this.setState({text:data.message});
	}
	render(){
		return (<div className="container-fluid">
            <InlineEdit
              className={this.props.className}
              staticElement={this.props.staticElement}
              editingElement={this.props.editingElement}
              activeClassName={this.props.activeClassName}
              maxLength={this.props.maxLength}
              text={this.state.text}
              paramName="message"
              change={this.dataChanged}
              style={this.props.customStyle}
            />
        </div>)
	}
}

export default EditableTextBox;