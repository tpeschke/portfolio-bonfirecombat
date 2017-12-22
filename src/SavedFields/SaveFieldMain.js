import React, { Component } from 'react';

import axios from 'axios'

import BattleFieldMain from '../BattleField/BattleFieldMain'


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

            console.log(req.data)

        })
    }


    render() {

        var { combats } = this.state

        if (combats)    {
            var combatList = combats.map((d, i) => {

                return  <div key={d.namecombat + i}>

                            <p>{d.namecombat}</p>

                            <p>{d.countnum}</p>

                            <p>{d.fighternum}</p>

                            <p>{d.deadnum}</p>

                            <button>To War</button>

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

export default SaveFieldMain