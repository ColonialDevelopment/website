import {Component} from 'react';
import Member from './Member';

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

	componentDidMount() {
        this.loadContentFromServer();
        setInterval(this.loadContentFromServer,
            this.props.pollInterval)
    }
	render() {
		var memberNodes= this.state.members.map(function(member){
			return (
				<Member member={member} />
				)
		});
		return (
			<div className="container">
				{memberNodes}
			</div>
			)
	}
}
export default MemberList;