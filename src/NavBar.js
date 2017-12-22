import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class NavBar extends Component {


    render() {

        return (
            <div>
                <Link to='/BattleField'>Battle Field</Link>
                <Link to='/SavedFields'>Saved Fields</Link>
            </div>
        )
    }
}

export default NavBar