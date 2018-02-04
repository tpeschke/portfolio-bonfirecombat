import React, { Component } from 'react'
import './Home.css'

import SignIn from './SignIn'


export default class Home extends Component {

    render() {
        return (
            <div className="outHome" id="home">

                <div className="foreground">
                    {/* <div className="videoBox">
                        <iframe src="https://www.youtube.com/embed/3nR_KGnaSD4?rel=0&amp;controls=0&amp;showinfo=0&autoplay=1&loop=1&mute=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                        <div className="coverUp"></div>
                    </div> */}

                    <div className="outDiveHome">
                        <div className="logoHome">
                            <h4 className="logoWords">Combat Counter</h4></div>

                        <SignIn />

                    </div>
                </div>

            </div>
        )
    }
}