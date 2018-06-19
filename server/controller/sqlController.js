makeid= () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
    return text;
  }


module.exports = {
    getAllCombats: (req, res) => {

        const db = req.app.get('db')

        var {id} = req.user
        
        db.get.get_All_Combats(id).then( result => res.status(200).send(result) )

    },

    loadCombatants: (req, res) => {

        const db = req.app.get('db')

        var { id } = req.params

        db.get.get_Combatants( id ).then( result => res.status(200).send(result) )

    },

    getAllStatuses: (req, res) => {

        const db = req.app.get('db')

        var { id } = req.params

        db.get.get_All_Statuses( id ).then( result => res.status(200).send(result) )
    },

    getHash: (req, res) => {
        const db = req.app.get('db')

        var { id } = req.params

        db.get.get_Hash( id ).then( result => res.status(200).send(result) )
    },

    getBattleByHash: (req, res) => {
        const db = req.app.get('db')

        var { hash } = req.params

        db.get_Battle_By_Hash(hash).then( result => res.send(result))
    },

    getCombatantsbyHash: (req, res) => {
        const db = req.app.get('db')

        var { hash } = req.params;
        tempArr = []

        tempArr.push(db.get.get_Fighter_By_Hash(hash).then())
        tempArr.push(db.get.get_Status_By_Hash(hash).then())

        Promise.all(tempArr).then( result => res.send(result))
    },

    newField: (req, res) => {
        var urlhash = makeid()

        const db = req.app.get('db')
        var { id } = req.params

        db.get.get_Field_Number(id)
            .then(num => db.add.add_New_Field(num[0].count === '0' ? 'New Battlefield' : 'New Battlefield ' + num[0].count, id, urlhash)
                .then(result => res.status(200).send(result)))

    },

    deleteField: (req, res) => {

        const db = req.app.get('db')

        var { id } = req.params

        db.delete.delete_Field(id, req.user.id).then( result => res.status(200).send(result) )
    },

    saveField: (req, res ) => {

        var { combatName, count, combatId, fighterList, statusList } = req.body
        var { id } = req.params

        const db = req.app.get('db')

        var tempArr = []

        fighterList.forEach(val => {
            if (!isNaN(val.id)) {
                tempArr.push(db.update.update_fighters(val.namefighter, val.colorcode, val.speed, val.actioncount, val.topcheck,val.acting, val.dead, val.id).then().catch(e=>console.log('1------------------------------',e)))
            } else {
                tempArr.push(db.add.add_fighter(val.namefighter, val.colorcode, val.speed, val.actioncount, val.topcheck,val.acting, val.dead, combatId).then().catch(e=>console.log('21------------------------------',e)))
            }
        })

        statusList.forEach(val => {
            val.timestatus <= 0 ? tempArr.push(db.delete.delete_Status(val.id).then().catch(e=>console.log('31------------------------------',e))) : null;
            if (!isNaN(val.id)) {
                tempArr.push(db.update.update_Status(val.namestatus, val.timestatus, val.id).then().catch(e=>console.log('41------------------------------',e)))
            } else {
               tempArr.push(db.add.add_Status(val.namestatus, val.timestatus, combatId).then().catch(e=>console.log('51------------------------------',e)))
            }})

            tempArr.push(db.update.save_Field(count, combatName, req.body.combatId).then().catch(e=>console.log('61------------------------------',e)))
            
        Promise.all(tempArr).then(result => res.send())

    },

    setTooltip: (req, res)=> {

        const db = req.app.get('db')

        var {id, tooltip} = req.body

        db.update.update_Tooltip(tooltip, id).then(result => res.send())
    },

    deleteFighter: (req, res)=> {

        const db = req.app.get('db')

        var { id } = req.params

        db.delete.delete_Fighter(id).then()
    },

    deleteStatus: ( req, res ) => {

        const db = req.app.get('db')

        var { id } = req.params

        db.delete.delete_Status(id).then()
    }

}