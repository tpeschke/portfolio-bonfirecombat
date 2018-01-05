
module.exports = {
    getAllCombats: (req, res) => {

        const db = req.app.get('db')

        db.getAllCombats().then( result => res.status(200).send(result) )

    },

    // addNewFighter: (req, res) => {

    //     var { colorcode, name, speed, actioncount, combatId } = req.body

    //     const db = req.app.get('db')

    //     db.addCombatant(name, colorcode, speed, actioncount, combatId)

    //     db.getCombatants( combatId ).then( result => res.status(200).send(result) )
        
    // },

    loadCombatants: (req, res) => {

        const db = req.app.get('db')

        var { id } = req.params

        db.getCombatants( id ).then( result => res.status(200).send(result) )

    },

    newField: (req, res) => {

        const db = req.app.get('db')

       db.addNewField().then(result => res.status(200).send(result))

    },

    deleteField: (req, res) => {

        const db = req.app.get('db')

        var { id } = req.params

        db.deleteField(id).then( result => res.status(200).send(result) )

    },

    saveField: (req, res ) => {

        const db = req.app.get('db')


    }

}