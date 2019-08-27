import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios'

import BattleField from './BattleField/BattleFieldMain';
import SavedField from './SavedFields/SaveFieldMain';
import PlayerView from './playerview/Playerview';
import PlayerNoBattle from './playerview/PlayerNoBattle';
import Home from './Home/Home'
import App from './App'

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route
                        exact path='/SavedFields'
                        render={_ => <SavedField setHeight={this.props.setHeight} redirect={this.props.redirect} />} />
                    <Route
                        path='/BattleField'
                        render={_ => <BattleField setHeight={this.props.setHeight} />} />

                    <Redirect to='/' />
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
                        path='/player/:battle'
                        component={PlayerView} />
                    <Route
                        path='/player'
                        component={PlayerNoBattle} />
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