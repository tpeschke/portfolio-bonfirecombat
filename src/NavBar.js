import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class NavBar extends Component {
    constructor() {
        super()

        this.state = {
            activeLink: 'SavedFields'
        }
    }


    render() {

        var { activeLink } = this.state

        return (
            <div className="navBar">
                <Link to='/BattleField'
                style={{ textDecoration: 'none' }}>
                
                <div 
                onClick={_=>this.setState( { activeLink: "BattleField" } )}
                className={activeLink==="BattleField"?'navItemCurrent':'navItem'}>
                Battle Field
                </div>
                
                </Link>

                <Link to='/SavedFields'
                style={{ textDecoration: 'none' }}>
                
                <div
                onClick={_=>this.setState( { activeLink: "SavedFields" } )} 
                className={activeLink==="SavedFields"?'navItemCurrent':'navItem'}>
                Saved Fields</div>
                
                </Link>
            </div>
        )
    }
}

export default NavBar