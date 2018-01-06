import axios from 'axios'

const GET_ALL_STATUSES = 'GET_ALL_STATUSES'

// ==========================================

export function GETALLSTATUSES(id) {
    return {
        type: GET_ALL_STATUSES,
        payload: axios.get(`/api/status/${id}`).then()
    }
}