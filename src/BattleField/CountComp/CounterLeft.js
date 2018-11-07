import React from 'react'

import ReactTooltip from 'react-tooltip'

export default function CounterLeft (props) {

        var {user, theme} = props

        if (user.data && user.data.tooltip === '1') {
            return (
                <div>
                    <div className="counterSide">
                        <button className={`counterButton ${theme}-counterButton`}
                            onClick={props.RESETCOUNT}
                            data-tip="Reset Count"
                        >0</button>
                        <button className={`counterButton ${theme}-counterButton`}
                            onClick={props.stopTime}
                            data-tip="Stop AutoCount"
                        >X</button>
                        <button className={`counterButton ${theme}-counterButton`}
                            onClick={props.DECREASECOUNT}
                            data-tip="-1 Count"
                        >-</button>
                    </div>
    
                    <ReactTooltip place="bottom" delayShow='2000' />
                </div>
            )
        } else {
            return (
                <div>
                    <div className="counterSide">
                        <button className={`counterButton ${theme}-counterButton`}
                            onClick={props.RESETCOUNT}
                        >0</button>
                        <button className={`counterButton ${theme}-counterButton`}
                            onClick={props.stopTime}
                        >X</button>
                        <button className={`counterButton ${theme}-counterButton`}
                            onClick={props.DECREASECOUNT}
                        >-</button>
                    </div>

                </div>
            )
        }
}