export default function sort (fightArr, count) {

    fightArr = fightArr.total.sort((a, b) => a.action - b.action);


    fightArr.forEach(val => {
        if (val.actioncount > count) {
            val.acting = '0'
        } else {
            val.acting = '1'
            val.top = '0'
        }
    })

    var onDeck = [];
    var acting = [];
    var grave = [];


    fightArr.forEach(val => {
        if (val.acting === '1' && val.dead === '0') {
            onDeck.push(val)
        } else if (val.acting === '0' && val.dead === '0') {
            acting.push(val)
        } else (
            grave.push(val)
        )
    })

    var fighters = {
        total: fightArr,
        acting: acting,
        onDeck: onDeck,
        grave: grave
    }

    return fighters

}