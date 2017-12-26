
module.exports = {
    getAllCombats: (req, res) => {

        const db = req.app.get('db')

        db.getAllCombats().then( result => res.status(200).send(result) )

    },

    saveCombat: (req, res) => {

        // const db = req.app.get('db')

        // db.saveCombat().then( result => res.status(200).send(resent) )
    },

    loadCombatants: (req, res) => {

        const db = req.app.get('db')

        var { id } = req.params

        db.getCombatants( id ).then( result => 
            res.status(200).send(result) 
        )

    }
}