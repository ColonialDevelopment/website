import React from 'react';
import { Panel } from 'react-bootstrap';

var EventList = React.createClass({
    loadContentFromServer: function(){
        $.ajax({
            url:this.props.url,
            datatype: 'json',
            cache: false,
            success: function(data) {
                this.setState({data:data});
            }.bind(this)
        })
    },

    getInitialState: function() {
        return {data: [{name:"Houseparties"}, {name:"Monday Madness"}]}
    },

    componentDidMount: function() {
        this.loadContentFromServer();
        setInterval(this.loadContentFromServer,
            this.props.pollInterval)
    },
    render: function() {
        if (this.state.data){
            var eventNodes = this.state.data.map(function(event){
                return (<Panel>
                        {event.name}
                       </Panel>)
            })
        }
        return (
                <div>
                <h1> Events: </h1>
                <div className="container">
                <div className="scroll-container">
                {eventNodes}
                </div>
                </div>
                </div>
               )
    }
})

export default EventList;
