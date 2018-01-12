import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TransitionGroup from 'react-transition-group/TransitionGroup'

import BattleField from './BattleField/BattleFieldMain';
import SavedField from './SavedFields/SaveFieldMain'

const firstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
  }

export default (

    <Switch>
        <Route 
            exact path= '/'
            component={ SavedField }
            // children={({ match, ...rest }) => (
            //     <TransitionGroup component={ firstChild }>
            //         {match && <SavedField {...rest} />}
            //     </TransitionGroup>
            // )} 
            />
            <Route 
            path= '/BattleField'
            component={ BattleField }
            // children={({ match, ...rest }) => (
            //     <TransitionGroup component={ firstChild }>
            //         {match && <BattleField {...rest} />}
            //     </TransitionGroup>
            // )} 
            />
    </Switch>

)