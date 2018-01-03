export default function sort(fightArr, count) {

    fightArr.sort((a, b) => a.actioncount - b.actioncount);

    fightArr.forEach(val => {
        if (val.actioncount > count) {
            val.acting = '1'
        } else {
            val.acting = '0'
            val.top = '0'
        }
    })

    var fighters = fightArr

    return fighters

}