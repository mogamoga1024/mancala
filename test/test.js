
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

    strictEqual(getCpuScore(playerHoles, cpuHoles), -9);
});

test("計算結果のテスト", function() {
    cpuHoles[0].stoneCount = 0;
    cpuHoles[1].stoneCount = 0;
    cpuHoles[2].stoneCount = 0;
    cpuHoles[3].stoneCount = 0;
    cpuHoles[4].stoneCount = 0;
    cpuHoles[5].stoneCount = 0;

    strictEqual(getCpuScore(playerHoles, cpuHoles), 18);
});

test("計算結果のテスト", function() {
    playerHoles[0].stoneCount = 0;
    playerHoles[2].stoneCount = 0;
    playerHoles[3].stoneCount = 0;
    cpuHoles[1].stoneCount = 0;
    cpuHoles[2].stoneCount = 0;

    strictEqual(getCpuScore(playerHoles, cpuHoles), 0);
});

test("計算結果のテスト", function() {
    playerHoles[0].stoneCount = 0;
    playerHoles[2].stoneCount = 0;
    cpuHoles[1].stoneCount = 0;
    cpuHoles[2].stoneCount = 0;
    cpuHoles[3].stoneCount = 0;

    strictEqual(getCpuScore(playerHoles, cpuHoles), 6);
});

module("minimaxのテスト", {
    setup: function() {
        mancalaInit();
    }
});

test("正常系", function() {
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
});

test("負け確でもあきらめないフリをする", function() {
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
    cpuHoles[4].stoneCount = 0;
    cpuHoles[5].stoneCount = 3;

    const selectHolesIndex = minimax(playerHoles, cpuHoles, 4, true).selectHolesIndex;

    strictEqual(selectHolesIndex, 5);
});

test("負け確でもあきらめないフリをする", function() {
    playerHoles[0].stoneCount = 0;
    playerHoles[1].stoneCount = 0;
    playerHoles[2].stoneCount = 0;
    playerHoles[3].stoneCount = 0;
    playerHoles[4].stoneCount = 0;
    playerHoles[5].stoneCount = 3;
    cpuHoles[0].stoneCount = 1;
    cpuHoles[1].stoneCount = 0;
    cpuHoles[2].stoneCount = 0;
    cpuHoles[3].stoneCount = 0;
    cpuHoles[4].stoneCount = 3;
    cpuHoles[5].stoneCount = 0;

    const selectHolesIndex = minimax(playerHoles, cpuHoles, 13, true).selectHolesIndex;

    strictEqual(selectHolesIndex, 4);
});

test("正常系", function() {
    playerHoles[0].stoneCount = 0;
    playerHoles[1].stoneCount = 0;
    playerHoles[2].stoneCount = 1;
    playerHoles[3].stoneCount = 0;
    playerHoles[4].stoneCount = 0;
    playerHoles[5].stoneCount = 3;
    cpuHoles[0].stoneCount = 0;
    cpuHoles[1].stoneCount = 0;
    cpuHoles[2].stoneCount = 0;
    cpuHoles[3].stoneCount = 1;
    cpuHoles[4].stoneCount = 0;
    cpuHoles[5].stoneCount = 0;

    const selectHolesIndex = minimax(playerHoles, cpuHoles, 12, true).selectHolesIndex;

    strictEqual(selectHolesIndex, 3);
});

test("負けの確信テスト", function() {
    playerHoles[0].stoneCount = 0;
    playerHoles[1].stoneCount = 0;
    playerHoles[2].stoneCount = 0;
    playerHoles[3].stoneCount = 0;
    playerHoles[4].stoneCount = 0;
    playerHoles[5].stoneCount = 7;
    cpuHoles[0].stoneCount = 1;
    cpuHoles[1].stoneCount = 0;
    cpuHoles[2].stoneCount = 0;
    cpuHoles[3].stoneCount = 0;
    cpuHoles[4].stoneCount = 3;
    cpuHoles[5].stoneCount = 0;

    let score = minimax(playerHoles, cpuHoles, 13, true).score;
    ok(MIN_SCORE < score && score < MIN_SCORE + 1);
});

test("負けの確信テスト", function() {
    playerHoles[0].stoneCount = 0;
    playerHoles[1].stoneCount = 0;
    playerHoles[2].stoneCount = 0;
    playerHoles[3].stoneCount = 0;
    playerHoles[4].stoneCount = 0;
    playerHoles[5].stoneCount = 3;
    cpuHoles[0].stoneCount = 1;
    cpuHoles[1].stoneCount = 0;
    cpuHoles[2].stoneCount = 0;
    cpuHoles[3].stoneCount = 0;
    cpuHoles[4].stoneCount = 3;
    cpuHoles[5].stoneCount = 0;

    let score = minimax(playerHoles, cpuHoles, 13, true).score;
    console.log(score);
    ok(MIN_SCORE < score && score < MIN_SCORE + 1);
});

test("勝ちの確信テスト", function() {
    playerHoles[0].stoneCount = 0;
    playerHoles[1].stoneCount = 0;
    playerHoles[2].stoneCount = 0;
    playerHoles[3].stoneCount = 0;
    playerHoles[4].stoneCount = 0;
    playerHoles[5].stoneCount = 2;
    cpuHoles[0].stoneCount = 6;
    cpuHoles[1].stoneCount = 4;
    cpuHoles[2].stoneCount = 2;
    cpuHoles[3].stoneCount = 0;
    cpuHoles[4].stoneCount = 0;
    cpuHoles[5].stoneCount = 0;

    let score = minimax(playerHoles, cpuHoles, 7, true).score;
    ok(MAX_SCORE - 1 < score && score < MAX_SCORE);
});

test("勝ちの確信テスト", function() {
    playerHoles[0].stoneCount = 0;
    playerHoles[1].stoneCount = 0;
    playerHoles[2].stoneCount = 0;
    playerHoles[3].stoneCount = 0;
    playerHoles[4].stoneCount = 0;
    playerHoles[5].stoneCount = 2;
    cpuHoles[0].stoneCount = 6;
    cpuHoles[1].stoneCount = 4;
    cpuHoles[2].stoneCount = 2;
    cpuHoles[3].stoneCount = 3;
    cpuHoles[4].stoneCount = 1;
    cpuHoles[5].stoneCount = 1;

    let score1 = minimax(playerHoles, cpuHoles, 10, true).score;
    ok(MAX_SCORE - 1 < score1 && score1 < MAX_SCORE);

    let score2 = minimax(playerHoles, cpuHoles, 13, true).score;
    ok(MAX_SCORE - 1 < score2 && score2 < MAX_SCORE);
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

module("searchOrderSortのテスト");

test("正常系(CPU)", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 1],
        [0, 0, 0, 3, 1, 0],
    );

    const searchOrderIndexList = searchOrderSort(
        playerHoles, cpuHoles, true, MIN_SCORE, MAX_SCORE
    );

    strictEqual(searchOrderIndexList.length, 2, "要素数");
    strictEqual(searchOrderIndexList[0], 3, "期待通りに並び替えられたか");
});

test("正常系(Player)", function() {
    mancalaDebugInit(
        [0, 0, 0, 3, 1, 0],
        [0, 0, 0, 0, 0, 1],
    );

    const searchOrderIndexList = searchOrderSort(
        playerHoles, cpuHoles, false, MIN_SCORE, MAX_SCORE
    );

    strictEqual(searchOrderIndexList.length, 2, "要素数");
    strictEqual(searchOrderIndexList[0], 3, "期待通りに並び替えられたか");
});

module("ただのデバグ");

test("デバグ", function() {
    const s0 = MIN_SCORE + 1 / (0 + 2);
    const s1 = MIN_SCORE + 1 / (1 + 2);
    const s2 = MIN_SCORE + 1 / (2 + 2);
    const s3 = MIN_SCORE + 1 / (3 + 2);
    const s4 = MIN_SCORE + 1 / (4 + 2);

    ok(MIN_SCORE < s4)
    ok(s4 < s3);
    ok(s3 < s2);
    ok(s2 < s1);
    ok(s1 < s0);
    ok(s0 < MIN_SCORE + 1);
});

/*
test("デバグ", function() {
    const s0 = MIN_SCORE + 1 - (1 / (0 + 2));
    const s1 = MIN_SCORE + 1 - (1 / (1 + 2));
    const s2 = MIN_SCORE + 1 - (1 / (2 + 2));
    const s3 = MIN_SCORE + 1 - (1 / (3 + 2));
    const s4 = MIN_SCORE + 1 - (1 / (4 + 2));

    ok(MIN_SCORE < s0)
    ok(s0 < s1);
    ok(s1 < s2);
    ok(s2 < s3);
    ok(s3 < s4);
    ok(s4 < MIN_SCORE + 1);
});
*/
