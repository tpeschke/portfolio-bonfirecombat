import axios from 'axios'

import sort from '../components/sort'

const initialState = {
    count: 1,
    combatId: 0,
    combatName: 'New Battle',
    fighterList: []
}
//TYPES

const GET_COMBAT_FIGHTERS = 'GET_COMBAT_FIGHTERS'
const LOAD_COMBATANTS = 'LOAD_COMBATANTS'
const INCREASE_COUNT = 'INCREASE_COUNT'
const ADD_NEW_COMBATANT = 'ADD_NEW_COMBATANT'
const KILL_COMBATANT = 'KILL_COMBATANT'
const REMOVE_FIGHTER = 'REMOVE_FIGHTER'
const ADVANCE_SPEED = "ADVANCE_SPEED"

//ACTION BUILDERS

export function GETCOMBATFIGHTERS(id, name, count) {
    return {
        type: GET_COMBAT_FIGHTERS,
        payload: id,
        name: name,
        count: count
    }
}

export function LOADCOMBATANTS(id) {
    return {
        type: LOAD_COMBATANTS,
        payload: axios.get(`/api/combat/${id}`).then()
    }
}

export function ADDNEWCOMBATANT(fighter) {
    return {
        type: ADD_NEW_COMBATANT,
        payload: fighter
    }
}

export function KILLCOMBATANT(id) {
    return {
        type: KILL_COMBATANT,
        payload: id
    }
}

export function REMOVEFIGHTER(id) {
    return {
        type: REMOVE_FIGHTER,
        payload: id
    }
}

export function ADVANCESPEED(id) {
    return {
        type: ADVANCE_SPEED,
        payload: id
    }
}


//REDUCER

export default function reducer(state = initialState, action) {

    switch (action.type) {

        case GET_COMBAT_FIGHTERS:
            return Object.assign({}, state, { combatId: action.payload, combatName: action.name, count: +action.count })

        case LOAD_COMBATANTS + '_FULFILLED':
            state.fighterList = action.payload.data
            var fighters = sort(state.fighterList, state.count);
            return Object.assign({}, state, { fighterList: fighters })

        case INCREASE_COUNT:
            var newCount = +state.count + 1
            var fighter = sort(state.fighterList, newCount)
            return Object.assign({}, state, { count: newCount, fighterList: fighter })

        case ADD_NEW_COMBATANT:
            var newfighters = sort(state.fighterList.concat(action.payload), state.count)
            return Object.assign({}, state, { fighterList: newfighters })

        case KILL_COMBATANT:
            var removedfighter = state.fighterList.map(val => {
                if (val.id === action.payload) {
                    val.dead === '1' ? val.dead = '0' : val.dead = '1'
                    return val
                } else {
                    return val
                }
            })
            return Object.assign({}, state, { fighterList: removedfighter })

        case REMOVE_FIGHTER:
            var gonefighter = state.fighterList.filter((val, i) => {
                if (val.id === action.payload) {
                } else {
                    return val
                }
            })
            return Object.assign({}, state, { fighterList: gonefighter })

        case ADVANCE_SPEED:
            var speedFighter = sort(state.fighterList.filter((val, i) => {
                if (val.id === action.payload) {
                    val.actioncount+=val.speed
                    return val
                } else {
                    return val
                }
            }), state.count)
            return Object.assign( {}, state, { fighterList: speedFighter })


        default: return state
    }
}