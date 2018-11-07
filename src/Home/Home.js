import React from 'react'
import './Home.css'

import SignIn from './SignIn'


export default function Home(props) {
    return (
        <div className="outHome" id="home">
            <div className="foreground">
                <div className='logoHome'></div>
                <SignIn />
            </div>
        </div>
    )
}