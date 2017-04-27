import {Component} from 'react';
import Member from './Member';
import {Typeahead} from 'react-bootstrap-typeahead';

class MemberList extends Component{
	constructor(props){
		super(props);
		this.state={
			members:[]
		}
	}
	loadContentFromServer() {
        $.ajax({
            url: this.props.url,
            datatype: 'json',
            cache: false,
            success: function(data) {
                this.setState({members:data.results});
            }.bind(this)
        })
    }

    handleSearch(data){
    	console.log(data);
    }
	componentDidMount() {
        this.loadContentFromServer();
        setInterval(this.loadContentFromServer,
            this.props.pollInterval)
    }
	render() {
		return (
			<div className="container">
			<Typeahead onInputChange={this.handleSearch.bind(this)}
					   options={this.state.members}
					   labelKey={'name'}
					   renderMenuItemChildren={(result, props) => {
					   	return (
    						<Member member={result}
									editable={false} />
    						)
					   }}
					   filterBy={['name', 'major', 'dorm', 'hometown', 'netid', 'officer_pos']} 
					    />
		    </div>
			)
	}
}
export default MemberList;