
module("mancalaInitのテスト", {
    setup: function() {
        mancalaInit();
    }
});

test("Holesの要素数", function () {
    strictEqual(playerHoles.length, 6, "playerHoles.length");
    strictEqual(cpuHoles.length, 6, "cpuHoles.length");
});

test("Holesの要素", function() {
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

module("getCpuScoreのテスト", {
    setup: function() {
        mancalaInit();
    }
});

test("計算結果のテスト", function() {
    playerHoles[0].stoneCount = 0;
    playerHoles[1].stoneCount = 0;
    playerHoles[2].stoneCount = 0;
    playerHoles[3].stoneCount = 0;
    playerHoles[4].stoneCount = 0;
    playerHoles[5].stoneCount = 0;

    strictEqual(getCpuScore(playerHoles, cpuHoles), -6);
});

test("計算結果のテスト", function() {
    cpuHoles[0].stoneCount = 0;
    cpuHoles[1].stoneCount = 0;
    cpuHoles[2].stoneCount = 0;
    cpuHoles[3].stoneCount = 0;
    cpuHoles[4].stoneCount = 0;
    cpuHoles[5].stoneCount = 0;

    strictEqual(getCpuScore(playerHoles, cpuHoles), 12);
});

test("計算結果のテスト", function() {
    playerHoles[0].stoneCount = 0;
    playerHoles[2].stoneCount = 0;
    playerHoles[3].stoneCount = 0;
    cpuHoles[1].stoneCount = 0;
    cpuHoles[2].stoneCount = 0;

    strictEqual(getCpuScore(playerHoles, cpuHoles), 1);
});

test("計算結果のテスト", function() {
    playerHoles[0].stoneCount = 0;
    playerHoles[2].stoneCount = 0;
    cpuHoles[1].stoneCount = 0;
    cpuHoles[2].stoneCount = 0;
    cpuHoles[3].stoneCount = 0;

    strictEqual(getCpuScore(playerHoles, cpuHoles), 4);
});

module("minimaxのテスト", {
    setup: function() {
        mancalaInit();
    }
});

test("デバグ", function() {
    playerHoles[0].stoneCount = 0;
    playerHoles[1].stoneCount = 0;
    playerHoles[2].stoneCount = 0;
    playerHoles[3].stoneCount = 0;
    playerHoles[4].stoneCount = 0;
    playerHoles[5].stoneCount = 6;
    cpuHoles[0].stoneCount = 1;
    cpuHoles[1].stoneCount = 1;
    cpuHoles[2].stoneCount = 1;
    cpuHoles[3].stoneCount = 1;
    cpuHoles[4].stoneCount = 1;
    cpuHoles[5].stoneCount = 0;

    const selectHolesIndex = minimax(playerHoles, cpuHoles, 4, true).selectHolesIndex;

    notStrictEqual(selectHolesIndex, -1);
})

test("デバグ", function() {
    playerHoles[0].stoneCount = 0;
    playerHoles[1].stoneCount = 0;
    playerHoles[2].stoneCount = 0;
    playerHoles[3].stoneCount = 0;
    playerHoles[4].stoneCount = 2;
    playerHoles[5].stoneCount = 2;
    cpuHoles[0].stoneCount = 0;
    cpuHoles[1].stoneCount = 0;
    cpuHoles[2].stoneCount = 0;
    cpuHoles[3].stoneCount = 2;
    cpuHoles[4].stoneCount = 2;
    cpuHoles[5].stoneCount = 3;

    const selectHolesIndex = minimax(playerHoles, cpuHoles, 4, true).selectHolesIndex;

    strictEqual(selectHolesIndex, 5);
})