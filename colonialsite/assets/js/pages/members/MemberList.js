import {Component} from 'react';
import Member from './Member';
import {Typeahead} from 'react-bootstrap-typeahead';

class MemberList extends Component{
	constructor(props){
		super(props);
		this.state={
			members:[],
			displayed_members:[]
		}
	}
	loadContentFromServer() {
        $.ajax({
        	context:this,
            url: this.props.url,
            datatype: 'json',
            cache: false,
            success: function(data) {
                this.setState({members:data.results});
            }.bind(this)
        })
    }

    handleSearch(data){
    	const new_display = this.state.members.filter(member => {
    				return member.name===data
    			});
    	this.setState({displayed_members:new_display})
    }
	componentDidMount() {
        this.loadContentFromServer();
    }
	render() {
		if (this.state.displayed_members.length > 0){
			var displayedMembers = this.state.displayed_members.map(function(member){
				return (<Member 	key={member.netid}
									member={member}
						 			editable={false} />)
			})
			var display_header = (<h2>Selected Member</h2>);
		}

		return (
			<div>
			<h2>Search through Members</h2>
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
			<br/>
			{display_header}
			{displayedMembers}
		    </div>
			)
	}
}
export default MemberList;