import axios from 'axios'

import sort from '../components/sort'

const initialState = {
    count: 1,
    combatId: 0,
    fighterList: {
        total: [],
        acting: [],
        onDeck: [],
        grave: []
    }
}
//TYPES

const GET_COMBAT_FIGHTERS = 'GET_COMBAT_FIGHTERS' 
const LOAD_COMBATANTS = 'LOAD_COMBATANTS'
const INCREASE_COUNT = 'INCREASE_COUNT' 

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
            state.fighterList.total = action.payload.data
            var fighters = sort( state.fighterList , state.count );
            return Object.assign({}, state, { fighterList : fighters } )

        case INCREASE_COUNT:
            var newCount = state.count + 1
            var fighter = sort( state.fighterList , newCount)
            return Object.assign({}, state, { count : newCount, fighterList: fighter })


        default: return state
    }
}