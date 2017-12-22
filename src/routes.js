import React from 'react';
import { Switch, Route } from 'react-router-dom';

import BattleField from './BattleField/BattleFieldMain';
import SavedField from './SavedFields/SaveFieldMain'

export default (

    <Switch>
        <Route exact path= '/BattleField' component={ BattleField } />
        <Route path= '/SavedFields' component={ SavedField } />
    </Switch>

)