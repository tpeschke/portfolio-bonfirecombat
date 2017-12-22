import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios'


class NavBar extends Component {

    testServer = () => {
        axios.get('/api/combat/1').then(

        )
    }

    render() {

        return (
            <div>
                <Link to='/BattleField'>Battle Field</Link>
                <Link to='/SavedFields'>Saved Fields</Link>

                <button onClick={this.testServer}>TEST</button>
            </div>
        )
    }
}

export default NavBar