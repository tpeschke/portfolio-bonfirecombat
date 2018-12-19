import React from 'react'
import './Home.css'
import axios from 'axios'

import SignIn from './SignIn'

export default function Home(props) {
    axios.get('/auth/me').then(v => {
        if (v.status === 200) {
            props.history.push('/SavedFields')
        }
    })

    return (
        <div className="outHome" id="home">
            <div className="foreground">
                <div className='logoHome'></div>
                <SignIn/>
            </div>
        </div>
    )
}