import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// 全局挂载Axios
import * as services from './services'
React.Component.prototype.http = services

ReactDOM.render(<App />, document.getElementById('root'));
