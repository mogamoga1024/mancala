
function Hole(jObj, stoneCount, isStore) {
    this.jObj = jObj;
    this.stoneCount = stoneCount;
    this.isStore = (isStore !== undefined) ? isStore : false;
    this.nextHole = null;
}

const $playerHoles = $(".player-holes > .hole");
const $cpuHoles = $($(".cpu-holes > .hole").get().reverse());
const $playerStore = $(".store > .hole").eq(1);
const $cpuStore = $(".store > .hole").eq(0);
const $message = $(".message");

let canClick = true;
const playerHoles = [];
const cpuHoles = [];

const defaultStoneCount = 4;

let prevHole = null;
$playerHoles.each(function() {
    const hole = new Hole($(this), defaultStoneCount);
    if (prevHole !== null) {
        prevHole.nextHole = hole
    }
    prevHole = hole;
    playerHoles.push(hole);
});

const playerStore = new Hole($playerStore, 0, true);
prevHole.nextHole = playerStore;
prevHole = playerStore;

$cpuHoles.each(function() {
    const hole = new Hole($(this), defaultStoneCount);
    prevHole.nextHole = hole;
    prevHole = hole;
    cpuHoles.push(hole);
});

const cpuStore = new Hole($cpuStore, 0, true);
prevHole.nextHole = cpuStore;
cpuStore.nextHole = playerHoles[0];

// ---

$playerHoles.click(function() {
    if (canClick === false) return;

    const index = $playerHoles.index(this);
    let hole = playerHoles[index];
    if (hole.stoneCount === 0) return;

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
    const stoneCount = hole.stoneCount;
    hole.stoneCount = 0;
    if (hole.jObj !== null) hole.jObj.text(hole.stoneCount);
    hole = hole.nextHole;
    let canPlayAgain = false;
    for (let i = 0; i < stoneCount; i++) {
        hole.stoneCount += 1;
        if (hole.jObj !== null) hole.jObj.text(hole.stoneCount);
        canPlayAgain = hole.isStore;
        hole = hole.nextHole;
    }
    return canPlayAgain;
}

function isWin(holes) {
    for (let i = 0; i < holes.length; i++) {
        if (holes[i].stoneCount !== 0) {
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

// ---

// jObjはコピーしない。cpuThink用
function copyHoles(srcPlayerHoles, srcCpuHoles) {
    const dstPlayerHoles = [];
    const dstCpuHoles = [];

    let prevDstHole = null;
    for (let i = 0; i < srcPlayerHoles.length; i++) {
        let srcHole = srcPlayerHoles[i];
        let dstHole = new Hole(null, srcHole.stoneCount);
        if (prevDstHole !== null) {
            prevDstHole.nextHole = dstHole;
        }
        prevDstHole = dstHole;
        dstPlayerHoles.push(dstHole);
    }
    
    let dstPlayerStore = new Hole(null, 0, true);
    prevDstHole.nextHole = dstPlayerStore;
    prevDstHole = dstPlayerStore;

    for (let i = 0; i < srcCpuHoles.length; i++) {
        let srcHole = srcCpuHoles[i];
        let dstHole = new Hole(null, srcHole.stoneCount);
        prevDstHole.nextHole = dstHole;
        prevDstHole = dstHole;
        dstPlayerHoles.push(dstHole);
    }

    let dstCpuStore = new Hole(null, 0, true);
    prevDstHole.nextHole = dstCpuStore;
    dstCpuStore.nextHole = dstPlayerHoles[0];

    return {
        playerHoles: playerHoles,
        cpuHoles: cpuHoles
    };
}

function cpuThink() {
    let index = Math.floor(Math.random() * 6);

    for (let i = 0; i < 6; i++) {
        let hole = cpuHoles[index];
        if (hole.stoneCount !== 0) {
            return index;
        }
        else {
            index = (index + 1) % 6
        }
    }
    
    alert("Error: cpuのholeが全て0なので打つ手なし");
}