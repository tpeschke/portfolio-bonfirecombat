
module.exports = {
    getAll: (req, res) => {

        const db = req.app.get('db')
        const { name } = req.body

        db.getAll().then( result => res.status(200).send(result) )

    },

    saveCombat: (req, res) => {

        const db = req.app.get('db')

        db.saveCombat().then( result => res.status(200).send(resent) )
    }
}