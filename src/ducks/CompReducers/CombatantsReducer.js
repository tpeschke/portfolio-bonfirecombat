import axios from 'axios'

//TYPES

const GET_COMBAT_FIGHTERS = 'GET_COMBAT_FIGHTERS'
const LOAD_COMBATANTS = 'LOAD_COMBATANTS'
const ADD_NEW_COMBATANT = 'ADD_NEW_COMBATANT'
const KILL_COMBATANT = 'KILL_COMBATANT'
const REMOVE_FIGHTER = 'REMOVE_FIGHTER'
const ADVANCE_SPEED = "ADVANCE_SPEED"
const INPUT_ACTION = "INPUT_ACTION"
const EDIT_FIGHTER = "EDIT_FIGHTER"
const HANDLE_TOP = "HANDLE_TOP"

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

export function INPUTACTION(id, input) {
    return {
        type: INPUT_ACTION,
        payload: input,
        id: id
    }
}


export function EDITFIGHTER(fighter) {
    return {
        type: EDIT_FIGHTER,
        payload: fighter
    }
}

export function HANDLETOP(fighter) {
    return {
        type: HANDLE_TOP,
        payload: fighter
    }
}
