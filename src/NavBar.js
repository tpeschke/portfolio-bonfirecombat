import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class NavBar extends Component {


    render() {

        return (
            <div className="navBar">
                <Link to='/BattleField'><h1>Battle Field</h1></Link>
                <Link to='/SavedFields'><h1>Saved Fields</h1></Link>
            </div>
        )
    }
}

export default NavBar