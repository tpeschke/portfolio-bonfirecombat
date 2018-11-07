import React from 'react';
import { Link } from 'react-router-dom';


export default function SaveLock ({userId, page, theme}) {

        if (!userId) {
            return <div
                className={`navItem ${theme}-navItem ${theme}-navLock navInVis`}>
                <p id='navItem'></p></div>
        } else {
            return <Link to='/SavedFields'
                style={{ textDecoration: 'none' }}>

                <div
                    className={page === "/SavedFields" ? `navItem ${theme}-navItem Current` : `navItem ${theme}-navItem`}>
                    <p id='navItem'>Saved Fields</p>
                </div>

            </Link>
        }
}