import React, { Component } from 'react';

import axios from 'axios'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { GETCOMBATFIGHTERS } from '../ducks/reducer'

class SaveFieldMain extends Component {
    constructor() {
        super()

        this.state = {
            combats: '',
        }
    }

    componentDidMount() {
        axios.get('/api/fighters').then((req, res) => {
            this.setState({ combats: req.data })
        })
    }

    render() {

        var { combats } = this.state

        if (combats) {
            var combatList = combats.map((d, i) => {

                return <div
                    className={i%2===0?"savedCombat":"savedCombat odd"}
                    key={d.namecombat + i}>
                    
                    <Link to='/BattleField'>
                    <button className="savedItemName" 
                        onClick={_ => this.props.GETCOMBATFIGHTERS(d.id, d.namecombat, d.countnum)}>
                        {d.namecombat} 
                    </button>
                    </Link>

                    <p className="savedItem">{d.countnum}</p>

                    <p className="savedItem">{d.fighternum}</p>

                    <p className="savedItem">{d.deadnum}</p>

                </div>
            })
        }

        return (
            <div className="SavedField">
                <h1>Saved Fields</h1>

                <div className="savedMenu">
                    <button>New Field</button>
                </div>

                <div className="savedListHeader">
                    <p className="savedItemName">Combat Name</p>
                    <p className="savedItem">Count</p>
                    <p className="savedItem">Fighters</p>
                    <p className="savedItem">Dead</p>
                </div>

                <div className="savedList">
                    {combatList}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

let actionBuilders = {
    GETCOMBATFIGHTERS
}

export default connect(mapStateToProps, actionBuilders)(SaveFieldMain)