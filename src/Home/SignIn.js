import React, { Component } from 'react';


export default class SignIn extends Component {
    render() {
        return (
            <div className='signIn'>
                <div className='signInInner'>
                    <h4 className="logoWords">Combat Counter</h4>
                    <a href={`${process.env.REACT_APP_LOGIN}`}>
                        <button id="signInButton">Sign In Here</button>
                    </a>
                    <p className='signInText'>with your Google, FaceBook, Twitter, or Yahoo account</p>
                </div>
            </div>
        )
    }
}

