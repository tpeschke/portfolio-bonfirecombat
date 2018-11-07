import React from 'react';
import { Link } from 'react-router-dom';


export default function BattleLock({userId, id, theme, page}) {
    if (id === 0 && !userId) {
        return <div
            className={`navItem ${theme}-navItem ${theme}-navLock navInVis`}>
            <p id='navItem'>Battle Field</p></div>
    } else if (id === 0) {
        return <div
            className={`navItem ${theme}-navItem ${theme}-navLock`}>
            <p id='navItem'>Battle Field</p></div>
    } else {
        return <Link to='/BattleField'
            style={{ textDecoration: 'none' }}>

            <div
                className={page === "/BattleField" ? `navItem ${theme}-navItem Current` : `navItem ${theme}-navItem`}>
                <p id='navItem'>Battle Field</p>
            </div>

        </Link>
    }
}