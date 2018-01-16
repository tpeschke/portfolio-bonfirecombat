import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import BattleField from './BattleField/BattleFieldMain';
import SavedField from './SavedFields/SaveFieldMain';
import Home from './Home/Home'

export default class Routes extends Component {

    render() {
        return (
            <div>
                <Switch>
                <Route
                        exact path='/'
                        render={_ => <Home setHeight={this.props.setHeight} />} />
                    <Route
                        path='/SavedFields'
                        render={_ => <SavedField setHeight={this.props.setHeight} />} />
                    <Route
                        path='/BattleField'
                        render={_ => <BattleField setHeight={this.props.setHeight} />} />
                </Switch>
            </div>
        )
    }
} 