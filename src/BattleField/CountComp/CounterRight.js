import React, { Component } from 'react'

import ReactTooltip from 'react-tooltip'

export default function CounterRight (props) {

    var { user, theme } = props

    if (user.data && user.data.tooltip === '1') {
        return (
            <div>
                <div className="counterSide">
                    <button className={`counterButton ${theme}-counterButton`}
                        onClick={props.INCREASECOUNT}
                        data-tip="+1 Count"
                    >+</button>
                    <button className={`counterButton ${theme}-counterButton`}
                        onClick={props.autoTimer1}
                        data-tip="+1 Count/1 Sec"
                    >></button>
                    <button className={`counterButton ${theme}-counterButton`}
                        onClick={props.autoTimer2}
                        data-tip="+1 Count/.5 Sec"
                    >>></button>
                </div>

                <ReactTooltip place="bottom"/>

            </div>
        )
    } else {
        return (<div>
            <div className="counterSide">
                <button className={`counterButton ${theme}-counterButton`}
                    onClick={props.INCREASECOUNT}
                >+</button>
                <button className={`counterButton ${theme}-counterButton`}
                    onClick={props.autoTimer1}
                >></button>
                <button className={`counterButton ${theme}-counterButton`}
                    onClick={props.autoTimer2}
                >>></button>
            </div>

        </div>
        )
    }
}