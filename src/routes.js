import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import BattleField from './BattleField/BattleFieldMain';
import SavedField from './SavedFields/SaveFieldMain';
import Home from './Home/Home'
import App from './App'

export default class Routes extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route
                        exact path='/SavedFields'
                        render={_ => <SavedField setHeight={this.props.setHeight} />} />
                    <Route
                        path='/BattleField'
                        render={_ => <BattleField setHeight={this.props.setHeight} />} />
                </Switch>
            </div>
        )
    }
}

export class LandingPage extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route
                        exact path='/'
                        component={Home} />
                    <Route
                        component={App} />
                </Switch>
            </div>
        )
    }
}