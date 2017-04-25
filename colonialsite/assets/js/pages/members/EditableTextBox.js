import {Component} from 'react';
import InlineEdit from 'react-edit-inline';
import {Button} from 'react-bootstrap';

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
		this.setState({text:data.message});
	}
	render(){
		return (<div className="container-fluid">
			<form>
            <InlineEdit
              className={this.props.className}
              staticElement={this.props.staticElement}
              editingElement={this.props.editingElement}
              activeClassName={this.props.activeClassName}
              maxLength={this.props.maxLength}
              text={this.state.text}
              paramName="message"
              change={this.props.dataChanged}
              style={this.props.customStyle}
            />
            <Button onClick={this.props.handleSubmit}
            		>
            		Update
    		</Button>
    		</form> 
        </div>)
	}
}

export default EditableTextBox;