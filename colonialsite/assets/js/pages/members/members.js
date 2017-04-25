import React from 'react';
import ReactDOM from 'react-dom';
import MemberList from './MemberList';

ReactDOM.render(<MemberList url='/api/members' pollInterval={100000}/>, window.react_mount)