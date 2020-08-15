
function Hole(jObj, nextHole) {
    this.jObj = jObj;
    this.nextHole = nextHole;
}

const playerHoles = [];
const cpuHoles = [];
let playerStore = new Hole(null, null);
let cpuStore = new Hole(null, null);
const holes = [];

let prevHole = null;
$(".player-holes > .hole").each(function() {
    const hole = new Hole($(this), null);
    if (prevHole !== null) {
        prevHole.nextHole = hole
    }
    prevHole = hole;
    playerHoles.push(hole);
});

playerStore = new Hole(
    $(".store > .hole").eq(1),
    null
);
prevHole.nextHole = playerStore;
prevHole = playerStore;

$($(".cpu-holes > .hole").get().reverse()).each(function() {
    const hole = new Hole($(this), null);
    prevHole.nextHole = hole;
    prevHole = hole;
    cpuHoles.push(hole);
});

cpuStore = new Hole(
    $(".store > .hole").eq(0),
    null
);
prevHole.nextHole = cpuStore;
cpuStore.nextHole = playerHoles[0];

// ---

$(".player-holes > .hole").click(function() {
    const index = $(".player-holes > .hole").index(this);
    let hole = playerHoles[index];
    const stoneCount = Number(hole.jObj.text());
    console.log(stoneCount);

    hole.jObj.text(0);
    hole = hole.nextHole;
    for (let i = 0; i < stoneCount; i++) {
        hole.jObj.text(Number(hole.jObj.text()) + 1);
        hole = hole.nextHole;
    }
});
