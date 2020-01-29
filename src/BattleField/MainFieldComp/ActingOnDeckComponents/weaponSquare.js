import React from 'react'

export default function weaponSquare({atk, spd, init, def, encumb, shield_dr, dr, measure, damage, parry}) {
    let shieldDr = <div></div>
    if (shield_dr) {
        shieldDr = <p class="shield_dr">{shield_dr}</p>
    }

    if (atk || atk === 0) {
    return (
        <div className="combat-square-shell">
            <div class="combat-image" />
              <p class="spd">{spd}</p>
              <p class="atk">{atk}</p>
              <p class="init">{init}</p>
              <p class="def">{def}</p>
              <p class="encumb">{encumb}</p>
              <div class="dr">
                <p>{dr}</p>
                {shieldDr}
              </div>
              <p class="measure">{measure}</p>
              <p class="damage">{damage}</p>
              <p class="parry">{parry}</p>
        </div>
    )} 

    return <div></div>
}