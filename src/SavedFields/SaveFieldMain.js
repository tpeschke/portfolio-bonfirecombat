import React, { Component } from 'react';

import axios from 'axios'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { NEWFIELD } from '../ducks/reducer'
import { GETCOMBATFIGHTERS } from '../ducks/CompReducers/CombatantsReducer'

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

    deleteFieldTotal = (id) => {
        axios.delete(`/api/battle/${id}`).then(req => {
            this.setState({ combats: req.data })
        })
    }

    render() {

        var { combats } = this.state

        if (combats) {
            var combatList = combats.map((d, i) => {

                return <div
                    className="savedCombat"
                    key={d.namecombat + i}>

                    <Link to='/BattleField'>
                        <button className="savedItemName"
                            onClick={_ => this.props.GETCOMBATFIGHTERS(d.id, d.namecombat, d.countnum)}>
                            {d.namecombat}
                        </button>
                    </Link>

                    <p className="savedItem"></p>
                    <p className="savedItem">{d.countnum}</p>
                    <p className="savedItem">{d.fighternum}</p>
                    <p className="savedItem">{d.deadnum}</p>
                    <button className="savedItem"
                        onClick={_ => this.deleteFieldTotal(d.id)}
                    >X</button>
                </div>
            })
        }

        return (
            <div className="SavedField">
                <h1 className="fontHeader">Saved Fields</h1>

                <div className="savedMenu">
                    <Link to='/BattleField'>
                        <button onClick={this.props.NEWFIELD}>New Field</button>
                    </Link>
                </div>

                <div className="savedList">
                    <div className="savedListHeader">
                        <p className="savedItemName listHeader">Combat Name</p>
                        <p className="savedItem listHeader"></p>
                        <p className="savedItem listHeader">Count</p>
                        <p className="savedItem listHeader">Fighters</p>
                        <p className="savedItem listHeader">Dead</p>
                        <p className="savedItem listHeader">Delete</p>
                    </div>
                    <div className="border"></div>

                    {combatList}
                    <div className="border savedborder"></div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

let actionBuilders = {
    GETCOMBATFIGHTERS,
    NEWFIELD
}

export default connect(mapStateToProps, actionBuilders)(SaveFieldMain)