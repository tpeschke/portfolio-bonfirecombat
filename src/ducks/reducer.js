// import axios from 'axios'

const initialState = {
    count: 0,
    combatId: 0
}
//TYPES

const GET_COMBAT_FIGHTERS = 'GET_COMBAT_FIGHTERS' 

//ACTION BUILDERS

export function GETCOMBATFIGHTERS(id) {
    return {
        type: GET_COMBAT_FIGHTERS,
        payload: id
    }
}

//REDUCER

export default function reducer( state = initialState, action) {

    switch ( action.type ) {

        case GET_COMBAT_FIGHTERS:
            return Object.assign({}, state, { combatId: action.payload })

        default: return state
    }
}