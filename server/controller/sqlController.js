
module.exports = {
    getAllCombats: (req, res) => {

        const db = req.app.get('db')

        var {id} = req.user

        db.getAllCombats(id).then( result => res.status(200).send(result) )

    },

    loadCombatants: (req, res) => {

        const db = req.app.get('db')

        var { id } = req.params

        db.getCombatants( id ).then( result => res.status(200).send(result) )

    },

    getAllStatuses: (req, res) => {

        const db = req.app.get('db')

        var { id } = req.params

        db.getAllStatuses( id ).then( result => res.status(200).send(result) )
    },

    newField: (req, res) => {

        const db = req.app.get('db')

        var { id } = req.params

        db.GetFieldNumber(id)
            .then(num => db.addNewField(num[0].count === '0' ? 'New Battlefield' : 'New Battlefield ' + num[0].count, id)
                .then(result => res.status(200).send(result)))

    },

    deleteField: (req, res) => {

        const db = req.app.get('db')

        var { id } = req.params

        db.deleteField(id).then( result => res.status(200).send(result) )

    },

    saveField: (req, res ) => {

        var { combatName, count, combatId, fighterList, statusList } = req.body
        var { id } = req.params

        const db = req.app.get('db')

        var tempArr = []

        fighterList.forEach(val => {
            if (!isNaN(val.id)) {
                tempArr.push(db.update_fighters(val.namefighter, val.colorcode, val.speed, val.actioncount, val.topcheck,val.acting, val.dead, val.id).then().catch(e=>console.log('1------------------------------',e)))
            } else {
                tempArr.push(db.add_fighter(val.namefighter, val.colorcode, val.speed, val.actioncount, val.topcheck,val.acting, val.dead, combatId).then().catch(e=>console.log('21------------------------------',e)))
            }
        })

        statusList.forEach(val => {
            val.timestatus <= 0 ? tempArr.push(db.delete_status(val.id).then().catch(e=>console.log('31------------------------------',e))) : null;
            if (!isNaN(val.id)) {
                tempArr.push(db.update_status(val.namestatus, val.timestatus, val.id).then().catch(e=>console.log('41------------------------------',e)))
            } else {
               tempArr.push(db.add_status(val.namestatus, val.timestatus, combatId).then().catch(e=>console.log('51------------------------------',e)))
            }})

            tempArr.push(db.saveField(count, combatName, req.body.combatId).then().catch(e=>console.log('61------------------------------',e)))
            
        Promise.all(tempArr).then(result => res.send())

    },

    setTooltip: (req, res)=> {

        const db = req.app.get('db')

        var {id, tooltip} = req.body

        db.update_tooltip(tooltip, id).then(result => res.send())
    }

}