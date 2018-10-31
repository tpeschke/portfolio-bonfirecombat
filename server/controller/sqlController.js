makeid = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


module.exports = {
    getAllCombats: (req, res) => {

        const db = req.app.get('db')

        var { id } = req.user

        db.get.all_Combats(id).then(result => res.status(200).send(result))

    },

    loadCombatants: (req, res) => {

        const db = req.app.get('db')
        var { id } = req.params

        db.get.combatants(id).then(result => {
            let tempArr = []
            result.forEach( val => tempArr.push( db.get.weapon(val.id).then(weapons => {
                if (weapons.length === 0) {
                    return {...val, weapons: [{id: 1, weapon: "unarmed", selected: '1', speed: 10}] }
                }
                return {...val, weapons: [...weapons, {id: 1, weapon: "unarmed", selected: '0', speed: 10}]}
            }) ) )
            
            Promise.all(tempArr).then( final => res.send(final) )
        })
    },

    getAllStatuses: (req, res) => {

        const db = req.app.get('db')

        var { id } = req.params

        db.get.all_Statuses(id).then(result => res.status(200).send(result))
    },

    getHash: (req, res) => {
        const db = req.app.get('db')

        var { id } = req.params

        db.get.hash(id).then(result => res.status(200).send(result))
    },

    getBattleByHash: (req, res) => {
        const db = req.app.get('db')

        var { hash } = req.params

        db.get.battle_By_Hash(hash).then(result => res.send(result))
    },

    getCombatantsbyHash: (req, res) => {
        const db = req.app.get('db')

        var { hash } = req.params;
        tempArr = []

        tempArr.push(db.get.fighter_By_Hash(hash).then())
        tempArr.push(db.get.status_By_Hash(hash).then())

        Promise.all(tempArr).then(result => res.send(result))
    },

    newField: (req, res) => {
        var urlhash = makeid()

        const db = req.app.get('db')
        var { id } = req.params

        db.get.field_Number(id)
            .then(num => db.add.new_Field(num[0].count === '0' ? 'New Battlefield' : 'New Battlefield ' + num[0].count, id, urlhash)
                .then(result => res.status(200).send(result)))

    },

    deleteField: (req, res) => {

        const db = req.app.get('db')

        var { id } = req.params

        db.delete.field(id, req.user.id).then(result => res.status(200).send(result))
    },

    saveField: (req, res) => {

        var { combatName, count, combatId, fighterList, statusList } = req.body
        var { id } = req.params

        const db = req.app.get('db')

        var tempArr = []

        fighterList.forEach(val => {
            if (!isNaN(val.id)) {
                tempArr.push(db.update.fighters(val.namefighter, val.colorcode, val.speed, val.actioncount, val.topcheck, val.acting, val.dead, val.id).then())
            } else {
                tempArr.push(db.add.fighter(val.namefighter, val.colorcode, val.speed, val.actioncount, val.topcheck, val.acting, val.dead, combatId).then())
            }
        })

        statusList.forEach(val => {
            val.timestatus <= 0 ? tempArr.push(db.delete.status(val.id).then()) : null;
            if (!isNaN(val.id)) {
                tempArr.push(db.update.status(val.namestatus, val.timestatus, val.id).then())
            } else {
                tempArr.push(db.add.status(val.namestatus, val.timestatus, combatId).then())
            }
        })

        tempArr.push(db.update.field(count, combatName, req.body.combatId).then())

        Promise.all(tempArr).then(result => res.send())

    },

    setTooltip: (req, res) => {

        const db = req.app.get('db')

        var { id, tooltip } = req.body

        db.update.tooltip(tooltip, id).then(result => res.send())
    },

    deleteFighter: (req, res) => {

        const db = req.app.get('db')

        var { id } = req.params

        db.delete.fighter(id).then()
    },

    deleteStatus: (req, res) => {

        const db = req.app.get('db')

        var { id } = req.params

        db.delete.status(id).then()
    }

}