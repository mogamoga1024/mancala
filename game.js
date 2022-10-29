
const $playerHoles = $(".player-holes > .hole");
const $cpuHoles = $($(".cpu-holes > .hole").get().reverse());
const $playerStore = $(".store > .hole").eq(1);
const $cpuStore = $(".store > .hole").eq(0);
const $message = $(".message");
const $thinkingTime = $(".thinking-time");

let canClick = true;
const playerHoles = [];
const cpuHoles = [];
const defaultStoneCount = 4;
let turn = 0;

function mancalaInit() {
    canClick = true;
    playerHoles.length = 0;
    cpuHoles.length = 0;

    let prevHole = null;
    $playerHoles.each(function() {
        $(this).text(defaultStoneCount);
        const hole = new Hole($(this), defaultStoneCount);
        if (prevHole !== null) {
            prevHole.nextHole = hole
        }
        prevHole = hole;
        playerHoles.push(hole);
    });

    $playerStore.text(0);
    const playerStore = new Hole($playerStore, 0, true);
    prevHole.nextHole = playerStore;
    prevHole = playerStore;

    $cpuHoles.each(function() {
        $(this).text(defaultStoneCount);
        const hole = new Hole($(this), defaultStoneCount);
        prevHole.nextHole = hole;
        prevHole = hole;
        cpuHoles.push(hole);
    });

    $cpuStore.text(0);
    const cpuStore = new Hole($cpuStore, 0, true);
    prevHole.nextHole = cpuStore;
    cpuStore.nextHole = playerHoles[0];

    $message.text("あなたの番です。");
}

function plyaerPlay() {
    if (canClick === false) return;

    const index = $playerHoles.index(this);
    let hole = playerHoles[index];
    if (hole.stoneCount === 0) return;

    canClick = false;

    console.log("==" + turn++ + "==");
    //*
    console.log("playerHoles[0].stoneCount: " + playerHoles[0].stoneCount);
    console.log("playerHoles[1].stoneCount: " + playerHoles[1].stoneCount);
    console.log("playerHoles[2].stoneCount: " + playerHoles[2].stoneCount);
    console.log("playerHoles[3].stoneCount: " + playerHoles[3].stoneCount);
    console.log("playerHoles[4].stoneCount: " + playerHoles[4].stoneCount);
    console.log("playerHoles[5].stoneCount: " + playerHoles[5].stoneCount);
    console.log("cpuHoles[0].stoneCount: " + cpuHoles[0].stoneCount);
    console.log("cpuHoles[1].stoneCount: " + cpuHoles[1].stoneCount);
    console.log("cpuHoles[2].stoneCount: " + cpuHoles[2].stoneCount);
    console.log("cpuHoles[3].stoneCount: " + cpuHoles[3].stoneCount);
    console.log("cpuHoles[4].stoneCount: " + cpuHoles[4].stoneCount);
    console.log("cpuHoles[5].stoneCount: " + cpuHoles[5].stoneCount);
    //*/
    console.log("player: " + index);
    
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
}

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

async function cpuPlay() {
    console.log("==" + turn++ + "==");
    //*
    console.log("playerHoles[0].stoneCount: " + playerHoles[0].stoneCount);
    console.log("playerHoles[1].stoneCount: " + playerHoles[1].stoneCount);
    console.log("playerHoles[2].stoneCount: " + playerHoles[2].stoneCount);
    console.log("playerHoles[3].stoneCount: " + playerHoles[3].stoneCount);
    console.log("playerHoles[4].stoneCount: " + playerHoles[4].stoneCount);
    console.log("playerHoles[5].stoneCount: " + playerHoles[5].stoneCount);
    console.log("cpuHoles[0].stoneCount: " + cpuHoles[0].stoneCount);
    console.log("cpuHoles[1].stoneCount: " + cpuHoles[1].stoneCount);
    console.log("cpuHoles[2].stoneCount: " + cpuHoles[2].stoneCount);
    console.log("cpuHoles[3].stoneCount: " + cpuHoles[3].stoneCount);
    console.log("cpuHoles[4].stoneCount: " + cpuHoles[4].stoneCount);
    console.log("cpuHoles[5].stoneCount: " + cpuHoles[5].stoneCount);
    //*/
    const index = await cpuThink();
    console.log("cpu: " + index);

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

function cpuThink() {
    return new Promise(resolve => {
        const depth = 13;// 15 20
        const start = performance.now();
        //const index = negascout(playerHoles, cpuHoles, depth, true, MIN_SCORE, MAX_SCORE).selectHolesIndex;
        const index = mtdf(playerHoles, cpuHoles, depth).selectHolesIndex;
        const end = performance.now();
        $thinkingTime.text(((end - start) / 100).toFixed(2));
        resolve(index);
    });
}

