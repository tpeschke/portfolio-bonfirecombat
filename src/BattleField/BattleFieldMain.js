import React, { Component } from 'react';

import { connect } from 'react-redux';

import { LOADCOMBATANTS } from '../ducks/reducer'

import Counter from './Count';
import OnDeck from './OnDeck';
import Acting from './Acting';
import Graveyard from './Graveyard';
import AddNew from './AddNew';

class BattleFieldMain extends Component {

    componentDidMount() {
        this.props.LOADCOMBATANTS(this.props.combatId)
    }

    render() {

        return (
            <div className="BattleMain">
                    <div className="BattleHeader">
                        <h1>{this.props.combatName}</h1>
                    </div>

                    <Counter />

                <div className="BattleBody">
                    <div className="BattleField">
                    <h2>the Quick</h2>
                        <OnDeck
                            list={this.props.fighterList}
                            count={this.props.count} />

                        <Acting
                            list={this.props.fighterList}
                            count={this.props.count} />
                    </div>

                    <div className="BattleSidebar">
                        <AddNew />
                        
                        <Graveyard
                            list={this.props.fighterList}
                            count={this.props.count} />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    var { combatId, combatName, fighterList, count } = state

    return {
        combatId,
        combatName,
        fighterList,
        count
    }
}

export default connect(mapStateToProps, { LOADCOMBATANTS })(BattleFieldMain)