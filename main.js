
function Hole(jObj, nextHole) {
    this.jObj = jObj;
    this.nextHole = nextHole;
}

const $playerHoles = $(".player-holes > .hole");
const $cpuHoles = $(".cpu-holes > .hole");
const $stores = $(".store > .hole");
const playerHoles = [];
const cpuHoles = [];
let playerStore = new Hole(null, null);
let cpuStore = new Hole(null, null);
const holes = [];

let prevHole = null;
$playerHoles.each(function() {
    const hole = new Hole($(this), null);
    if (prevHole !== null) {
        prevHole.nextHole = hole
    }
    prevHole = hole;
    playerHoles.push(hole);
});

playerStore = new Hole(
    $stores.eq(1),
    null
);
prevHole.nextHole = playerStore;
prevHole = playerStore;

$($cpuHoles.get().reverse()).each(function() {
    const hole = new Hole($(this), null);
    prevHole.nextHole = hole;
    prevHole = hole;
    cpuHoles.push(hole);
});

cpuStore = new Hole(
    $stores.eq(0),
    null
);
prevHole.nextHole = cpuStore;
cpuStore.nextHole = playerHoles[0];

// ---

$playerHoles.click(function() {
    const index = $playerHoles.index(this);
    let hole = playerHoles[index];

    $playerHoles.css("background-color", "");
    hole.jObj.css("background-color", "yellow");

    const stoneCount = Number(hole.jObj.text());

    hole.jObj.text(0);
    hole = hole.nextHole;
    for (let i = 0; i < stoneCount; i++) {
        hole.jObj.text(Number(hole.jObj.text()) + 1);
        hole = hole.nextHole;
    }

    setTimeout(cpuPlay, 1000);
});

function cpuPlay() {
    const index = cpuThink();

    let hole = cpuHoles[index];

    $cpuHoles.css("background-color", "");
    hole.jObj.css("background-color", "yellow");

    const stoneCount = Number(hole.jObj.text());

    hole.jObj.text(0);
    hole = hole.nextHole;
    for (let i = 0; i < stoneCount; i++) {
        hole.jObj.text(Number(hole.jObj.text()) + 1);
        hole = hole.nextHole;
    }
}

function cpuThink() {
    let index = Math.floor(Math.random() * 6);

    for (let i = 0; i < 6; i++) {
        let hole = cpuHoles[index];
        const stoneCount = Number(hole.jObj.text());
        if (stoneCount !== 0) {
            return index;
        }
        else {
            index = (index + 1) % 6
        }
    }
    
    alert("cpuのholeが全て0なので打つ手なし");
}