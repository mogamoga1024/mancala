function mancalaDebugInit(playerStoneCountList, cpuStoneCountList) {
    canClick = true;
    playerHoles.length = 0;
    cpuHoles.length = 0;

    let prevHole = null;
    let i = 0
    $playerHoles.each(function() {
        const stoneCount = playerStoneCountList[i++];
        $(this).text(stoneCount);
        const hole = new Hole($(this), stoneCount);
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

    let j = 0
    $cpuHoles.each(function() {
        const stoneCount = cpuStoneCountList[j++];
        $(this).text(stoneCount);
        const hole = new Hole($(this), stoneCount);
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