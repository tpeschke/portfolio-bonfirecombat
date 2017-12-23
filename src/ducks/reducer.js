import axios from 'axios'

const initialState = {
    count: 0,
    combatId: 0,
    fighterTotal: []
}
//TYPES

const GET_COMBAT_FIGHTERS = 'GET_COMBAT_FIGHTERS' 
const GET_ALL_COMBATANTS = 'GET_ALL_COMBATANTS'

//ACTION BUILDERS

export function GETCOMBATFIGHTERS(id) {
    return {
        type: GET_COMBAT_FIGHTERS,
        payload: id,
    }
}

export function GETALLCOMBATANTS(id) {
    return {
        type: GET_ALL_COMBATANTS,
        payload: axios.get(`/api/combat/${id}`).then()
    }
}

//REDUCER

export default function reducer( state = initialState, action) {

    switch ( action.type ) {

        case GET_COMBAT_FIGHTERS:   
            return Object.assign({}, state, { combatId: action.payload })

        case GET_ALL_COMBATANTS:
            Object.assign({}, state, { fighterTotal: action.payload } )
            return console.log(state.fighterTotal)

        default: return state
    }
}