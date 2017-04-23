import React from 'react';
import Event from './Event.js'

var EventList = React.createClass({
    loadContentFromServer: function(){
        $.ajax({
            url:this.props.url,
            datatype: 'json',
            cache: false,
            success: function(data) {
                this.setState({data:data.results});
            }.bind(this)
        })
    },

    getInitialState: function() {
        return {data: []}
    },

    componentDidMount: function() {
        this.loadContentFromServer();
        setInterval(this.loadContentFromServer,
            this.props.pollInterval)
    },
    render: function() {
        if (this.state.data){
            var eventNodes = this.state.data.map(function(event){
                return (<Event key={event.pk}
                               name={event.title}/>)
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
