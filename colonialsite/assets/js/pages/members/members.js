import React from 'react';
import ReactDOM from 'react-dom';
import MemberList from './MemberList.js';
import {MEMBERS_LIST} from '../../statics/urls.js';

ReactDOM.render(<MemberList url={MEMBERS_LIST} pollInterval={100000}/>, window.react_mount)