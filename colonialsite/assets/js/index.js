var React = require('react')
var ReactDOM = require('react-dom')

import MenuInput from './Input/MenuInput.js'
import MenuDisplay from './Display/MenuDisplay.js'

var MenuCreator = React.createClass({
    render: function() {
        return (
            <h1>
            Input Menus
            <MenuInput />
            <MenuDisplay />
            </h1>
            )
    }
})

ReactDOM.render(<MenuCreator />, document.getElementById('MenuContainer'))
