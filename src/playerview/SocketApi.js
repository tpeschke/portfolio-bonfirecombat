import io from 'socket.io-client'
const socket = io(process.env.PORT)

export default function updatePlayer(fighter, count, status, name) {
    var battle = {
        fighterList: fighter,
        count: count,
        statusList: status,
        combatName: name
    }
    
    socket.emit('updateBattle', battle)
}
