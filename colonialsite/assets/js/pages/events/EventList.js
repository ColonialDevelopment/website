import React from 'react';
import Event from './Event.js'

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
        return {data: [{name:"Casual Wednesday", id:20}, {name:"Monday Madness", id:21},
        {name:"Casual Wednesday", id:0}, {name:"Monday Madness", id:1},
        {name:"Casual Wednesday", id:2}, {name:"Monday Madness", id:3},
        {name:"Casual Wednesday", id:4}, {name:"Monday Madness", id:5},
        {name:"Casual Wednesday", id:6}, {name:"Monday Madness", id:7},
        {name:"Casual Wednesday", id:8}, {name:"Monday Madness", id:9},
        {name:"Casual Wednesday", id:10}, {name:"Monday Madness", id:11},
        {name:"Casual Wednesday", id:12}, {name:"Monday Madness", id:13},
        {name:"Casual Wednesday", id:14}, {name:"Monday Madness", id:15},
        {name:"Casual Wednesday", id:16}, {name:"Monday Madness", id:17},
        {name:"Casual Wednesday", id:18}, {name:"Monday Madness", id:19},
        ]}
    },

    componentDidMount: function() {
        this.loadContentFromServer();
        setInterval(this.loadContentFromServer,
            this.props.pollInterval)
    },
    render: function() {
        if (this.state.data){
            var eventNodes = this.state.data.map(function(event){
                return (<Event key={event.id}
                               name={event.name}/>)
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
               )
    }
})

export default EventList;
