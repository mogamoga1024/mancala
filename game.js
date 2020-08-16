
const $playerHoles = $(".player-holes > .hole");
const $cpuHoles = $($(".cpu-holes > .hole").get().reverse());
const $playerStore = $(".store > .hole").eq(1);
const $cpuStore = $(".store > .hole").eq(0);
const $message = $(".message");
let canClick = true;
const playerHoles = [];
const cpuHoles = [];
const defaultStoneCount = 4;

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
        dstCpuHoles.push(dstHole);
    }

    let dstCpuStore = new Hole(null, 0, true);
    prevDstHole.nextHole = dstCpuStore;
    dstCpuStore.nextHole = dstPlayerHoles[0];

    return {
        playerHoles: dstPlayerHoles,
        cpuHoles: dstCpuHoles
    };
}

/*
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
*/

function cpuThink() {

    let selectHolesIndex = -1;
    let maxScore = -999999;
    for (let i = 0; i < cpuHoles.length; i++) {
        const holesList = copyHoles(playerHoles, cpuHoles);
        const cpyPlayerHoles = holesList.playerHoles;
        const cpyCpuHoles = holesList.cpuHoles;

        if (cpyCpuHoles[i].stoneCount === 0) {
            continue;
        }

        stoneMove(cpyCpuHoles[i]);
        const score = getCpuScore(cpyPlayerHoles, cpyCpuHoles);
        if (maxScore < score) {
            maxScore = score;
            selectHolesIndex = i;
        }
    }

    if (selectHolesIndex === -1) {
        alert("Error: cpuのholeが全て0なので打つ手なし");
    }

    return selectHolesIndex;
}

/**
 * CPUのフィールドに0が多いほど、
 * Playerのフィールドに0が少ないほど
 * 高いスコアを返す。
 */
function getCpuScore(playerHoles, cpuHoles) {
    let playerHolesZeroCount = 0
    let cpuHolesZeroCount = 0
    for (let i = 0; i < playerHoles.length; i++) {
        if (playerHoles[i].stoneCount === 0) {
            playerHolesZeroCount++;
        }
        if (cpuHoles[i].stoneCount === 0) {
            cpuHolesZeroCount++;
        }
    }
    
    return cpuHolesZeroCount * 2 - playerHolesZeroCount;
}
