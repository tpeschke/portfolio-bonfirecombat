
module.exports = {
    getAllCombats: (req, res) => {

        const db = req.app.get('db')

        db.getAllCombats().then( result => res.status(200).send(result) )

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

        db.GetFieldNumber()
            .then(num => db.addNewField('New Battlefield ' + num[0].count)
                .then(result => res.status(200).send(result)))

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