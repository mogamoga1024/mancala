
module("mancalaInitのテスト");

test("Holesの要素数", function () {
    mancalaInit();

    strictEqual(playerHoles.length, 6, "playerHoles.length");
    strictEqual(cpuHoles.length, 6, "cpuHoles.length");
});

test("Holesの要素", function() {
    mancalaInit();

    for (let i = 0; i < playerHoles.length; i++) {
        let hole = playerHoles[i];
        strictEqual(hole.stoneCount, defaultStoneCount, "playerHoles stoneCount");
        strictEqual(hole.isStore, false, "playerHoles isStore");
    }

    let playerStore = playerHoles[playerHoles.length - 1].nextHole;
    strictEqual(playerStore.stoneCount, 0, "playerStore stoneCount");
    strictEqual(playerStore.isStore, true, "playerStore isStore");
    
    for (let i = 0; i < cpuHoles.length; i++) {
        let hole = cpuHoles[i];
        strictEqual(hole.stoneCount, defaultStoneCount, "cpuHoles stoneCount");
        strictEqual(hole.isStore, false, "cpuHoles isStore");
    }

    let cpuStore = cpuHoles[cpuHoles.length - 1].nextHole;
    strictEqual(cpuStore.stoneCount, 0, "cpuStore stoneCount");
    strictEqual(cpuStore.isStore, true, "cpuStore isStore");
});

module("mancalaDebugInitのテスト");

test("要素の確認", function() {
    mancalaDebugInit(
        [1, 1, 4, 5, 1, 4],
        [3, 6, 4, 3, 6, 4]
    );

    strictEqual(playerHoles[0].stoneCount, 1);
    strictEqual(playerHoles[1].stoneCount, 1);
    strictEqual(playerHoles[2].stoneCount, 4);
    strictEqual(playerHoles[3].stoneCount, 5);
    strictEqual(playerHoles[4].stoneCount, 1);
    strictEqual(playerHoles[5].stoneCount, 4);
    strictEqual(cpuHoles[0].stoneCount, 3);
    strictEqual(cpuHoles[1].stoneCount, 6);
    strictEqual(cpuHoles[2].stoneCount, 4);
    strictEqual(cpuHoles[3].stoneCount, 3);
    strictEqual(cpuHoles[4].stoneCount, 6);
    strictEqual(cpuHoles[5].stoneCount, 4);
});

module("stoneMoveのテスト", {
    setup: function() {
        mancalaInit();
    }
});

test("Holesの要素", function() {
    stoneMove(playerHoles[1]);
    stoneMove(cpuHoles[3]);
    stoneMove(playerHoles[4]);
    stoneMove(cpuHoles[0]);
    stoneMove(playerHoles[5]);

    let hole = playerHoles[0];
    strictEqual(hole.stoneCount, 5, "playerHoles[0].stoneCount");
    hole = hole.nextHole;
    strictEqual(hole.stoneCount, 0, "playerHoles[1].stoneCount");
    hole = hole.nextHole;
    strictEqual(hole.stoneCount, 5, "playerHoles[2].stoneCount");
    hole = hole.nextHole;
    strictEqual(hole.stoneCount, 5, "playerHoles[3].stoneCount");
    hole = hole.nextHole;
    strictEqual(hole.stoneCount, 0, "playerHoles[4].stoneCount");
    hole = hole.nextHole;
    strictEqual(hole.stoneCount, 0, "playerHoles[5].stoneCount");
    hole = hole.nextHole;
    strictEqual(hole.stoneCount, 2, "playerStore.stoneCount");
    hole = hole.nextHole;
    strictEqual(hole.stoneCount, 1, "cpuHoles[0].stoneCount");
    hole = hole.nextHole;
    strictEqual(hole.stoneCount, 7, "cpuHoles[1].stoneCount");
    hole = hole.nextHole;
    strictEqual(hole.stoneCount, 7, "cpuHoles[2].stoneCount");
    hole = hole.nextHole;
    strictEqual(hole.stoneCount, 2, "cpuHoles[3].stoneCount");
    hole = hole.nextHole;
    strictEqual(hole.stoneCount, 7, "cpuHoles[4].stoneCount");
    hole = hole.nextHole;
    strictEqual(hole.stoneCount, 6, "cpuHoles[5].stoneCount");
    hole = hole.nextHole;
    strictEqual(hole.stoneCount, 1, "cpuStore.stoneCount");
});

module("copyHolesのテスト", {
    setup: function() {
        mancalaInit();
        stoneMove(playerHoles[5]);
        stoneMove(cpuHoles[2]);
        stoneMove(playerHoles[3]);
        stoneMove(cpuHoles[0]);
    }
});

test("要素のコピーテスト:要素数", function() {
    const holesList = copyHoles(playerHoles, cpuHoles);
    const cpyPlayerHoles = holesList.playerHoles;
    const cpyCpuHoles = holesList.cpuHoles;
    
    strictEqual(cpyPlayerHoles.length, 6, "cpyPlayerHoles.length");
    strictEqual(cpyCpuHoles.length, 6, "cpyCpuHoles.length");
});

test("要素のコピーテスト:要素", function() {
    const holesList = copyHoles(playerHoles, cpuHoles);
    const cpyPlayerHoles = holesList.playerHoles;
    const cpyCpuHoles = holesList.cpuHoles;
    
    for (let i = 0; i < cpyPlayerHoles.length; i++) {
        let originHole = playerHoles[i];
        let hole = cpyPlayerHoles[i];
        strictEqual(hole.stoneCount, originHole.stoneCount, "cpyPlayerHoles stoneCount");
        strictEqual(hole.isStore, false, "cpyPlayerHoles isStore");
    }

    for (let i = 0; i < cpyCpuHoles.length; i++) {
        let originHole = cpuHoles[i];
        let hole = cpyCpuHoles[i];
        strictEqual(hole.stoneCount, originHole.stoneCount, "cpuHoles stoneCount");
        strictEqual(hole.isStore, false, "cpuHoles isStore");
    }

    cpyPlayerHoles[0].stoneCount = -99;
    notStrictEqual(cpyPlayerHoles[0].stoneCount, playerHoles[0].stoneCount, "playerHoles コピー元と参照が切れていること");
    cpyCpuHoles[0].stoneCount = -66;
    notStrictEqual(cpyCpuHoles[0].stoneCount, cpuHoles[0].stoneCount, "cpuHoles コピー元と参照が切れていること");

});
