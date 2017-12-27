import axios from 'axios'

import sort from '../components/sort'

const initialState = {
    count: 1,
    combatId: 0,
    fighterTotal: {
        acting: [],
        onDeck: [],
        grave: []
    }
}
//TYPES

const GET_COMBAT_FIGHTERS = 'GET_COMBAT_FIGHTERS' 
const LOAD_COMBATANTS = 'LOAD_COMBATANTS'

//ACTION BUILDERS

export function GETCOMBATFIGHTERS(id) {
    return {
        type: GET_COMBAT_FIGHTERS,
        payload: id,
    }
}

export function LOADCOMBATANTS(id) {
    return {
        type: LOAD_COMBATANTS,
        payload: axios.get(`/api/combat/${id}`).then()
    }
}

//REDUCER

export default function reducer( state = initialState, action) {

    switch ( action.type ) {

        case GET_COMBAT_FIGHTERS:   
            return Object.assign({}, state, { combatId: action.payload })

        case LOAD_COMBATANTS + '_FULFILLED':
            var fighters = sort(action.payload.data , state.count);
            return Object.assign({}, state, { fighterTotal: fighters } )


        default: return state
    }
}