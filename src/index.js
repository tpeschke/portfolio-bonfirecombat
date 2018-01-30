import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux';
import store from './store'
import { LandingPage } from './routes'

ReactDOM.render(

    <Provider store={store}>
        <Router>
            <LandingPage />
        </Router>
    </Provider>

    , document.getElementById('root'));
