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

        if (combats)    {
            var combatList = combats.map((d, i) => {

                return  <div key={d.namecombat + i}>

                            <h1>{d.namecombat}</h1>

                            <p>{d.countnum}</p>

                            <p>{d.fighternum}</p>

                            <p>{d.deadnum}</p>

                            <Link to='/BattleField'><button onClick={_ => this.props.GETCOMBATFIGHTERS(d.id)}>To War</button></Link>

                        </div>
        })}

        return (
            <div className="SavedField">

                <p>Saved Fields</p>

                <button>New Field</button>

                {combatList}

            </div>
        )
    }
}

function mapStateToProps ( state ) {
    return {}
}

let actionBuilders = {
    GETCOMBATFIGHTERS
}

export default connect ( mapStateToProps, actionBuilders ) ( SaveFieldMain )