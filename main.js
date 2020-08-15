
function Hole(jObj, isStore) {
    this.jObj = jObj;
    this.isStore = (isStore !== undefined) ? isStore : false;
    this.nextHole = null;
}

const $playerHoles = $(".player-holes > .hole");
const $cpuHoles = $(".cpu-holes > .hole");
const $stores = $(".store > .hole");
const $message = $(".message");
let canClick = true;
const playerHoles = [];
const cpuHoles = [];
let playerStore = null;
let cpuStore = null;
const holes = [];

let prevHole = null;
$playerHoles.each(function() {
    const hole = new Hole($(this));
    if (prevHole !== null) {
        prevHole.nextHole = hole
    }
    prevHole = hole;
    playerHoles.push(hole);
});

playerStore = new Hole($stores.eq(1), true);
prevHole.nextHole = playerStore;
prevHole = playerStore;

$($cpuHoles.get().reverse()).each(function() {
    const hole = new Hole($(this));
    prevHole.nextHole = hole;
    prevHole = hole;
    cpuHoles.push(hole);
});

cpuStore = new Hole($stores.eq(0), true);
prevHole.nextHole = cpuStore;
cpuStore.nextHole = playerHoles[0];

// ---

$playerHoles.click(function() {
    if (canClick === false) return;

    const index = $playerHoles.index(this);
    let hole = playerHoles[index];
    const stoneCount = Number(hole.jObj.text());
    if (stoneCount === 0) return;

    canClick = false;

    $playerHoles.css("background-color", "");
    hole.jObj.css("background-color", "yellow");

    const canPlayAgain = stoneMove(hole);

    if (isWin(playerHoles)) {
        $message.text("あなたの勝ちです。");
        return;
    }

    if (canPlayAgain) {
        $message.text("もう一回あなたのターンです。");
        canClick = true;
    }
    else {
        $message.text("CPUのターンです。");
        setTimeout(cpuPlay, 1000);
        return;
    }
});

function stoneMove(hole) {
    const stoneCount = Number(hole.jObj.text());
    hole.jObj.text(0);
    hole = hole.nextHole;
    let canPlayAgain = false;
    for (let i = 0; i < stoneCount; i++) {
        hole.jObj.text(Number(hole.jObj.text()) + 1);
        canPlayAgain = hole.isStore;
        hole = hole.nextHole;
    }
    return canPlayAgain;
}

function isWin(holes) {
    for (let i = 0; i < holes.length; i++) {
        if (Number(holes[i].jObj.text()) !== 0) {
            return false;
        }
    }
    return true;
}

function cpuPlay() {
    const index = cpuThink();

    let hole = cpuHoles[index];

    $cpuHoles.css("background-color", "");
    hole.jObj.css("background-color", "yellow");

    const stoneCount = Number(hole.jObj.text());

    const canPlayAgain = stoneMove(hole);

    if (isWin(cpuHoles)) {
        $message.text("あなたの負けです。");
        return;
    }

    if (canPlayAgain) {
        $message.text("もう一回CPUのターンです。");
        setTimeout(cpuPlay, 1000);
        return;
    }
    else {
        $message.text("あなたのターンです。");
        canClick = true;
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
    
    alert("Error: cpuのholeが全て0なので打つ手なし");
}