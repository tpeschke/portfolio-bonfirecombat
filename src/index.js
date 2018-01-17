import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux';
import store from './store'
import LandPage, { LandingPage } from './routes'

ReactDOM.render(

    <Provider store={store}>
        <Router>
            <LandingPage />
        </Router>
    </Provider>

    , document.getElementById('root'));
registerServiceWorker();
