import React from 'react'
import './Theme.css'
import axios from 'axios'

export default function ThemeChanger({ theme, setTheme }) {

    return (
        <div className="themeSelectorShell">
            <p className="ThemeSelectorTitle">Theme Selector</p>
            <div className="themeSelectorInner">
                <div className="themeSelectorChoice"
                    onClick={_=> theme!=='a' ? axios.patch('/api/theme/a').then(_=>setTheme('a')) : null}>
                    <div className={theme==="a"?"choice selected":"choice"}></div><p className="themeSelectorChoice>Bonfire">Agnostic</p>
                </div>
                <div className="themeSelectorChoice"
                    onClick={_=> theme!=='h' ? axios.patch('/api/theme/h').then(_=>setTheme('h')) : null}>
                    <div className={theme==="h"?"choice selected":"choice"}></div><p className="themeSelectorChoice">Bonfire</p>
                </div>
            </div>
        </div>
    )
}