import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home.js'
import registerServiceWorker from './registerServiceWorker';
const App = () => (

    <Home />
)




ReactDOM.render(<App />, document.getElementById('root'));


registerServiceWorker();
