import React from 'react'
import './Home.css'
import axios from 'axios'

export default function Home(props) {
    axios.get('/auth/me').then(v => {
        if (v.status === 200) {
            props.history.push('/SavedFields')
        }
    })

    return (
        <div className="outHome" id="home">
            <div className='logoHome'></div>
            <div className="topBorder">
                <h4 className="logoWords">Combat Counter</h4>
            </div>
            <div className="foreground">
                <p className='signInText'>For the <a class="bonfireLink" href="https://bonfire.dragon-slayer.net/">Bonfire Roleplaying System.</a></p>
                <a class="bonfireLink" id="signInButton" href={`${process.env.REACT_APP_LOGIN}`}>
                    Sign In Here
                    </a>
                <p className='signInText'>with your Google, FaceBook, Twitter, or Yahoo account</p>
            </div>
        </div>
    )
}