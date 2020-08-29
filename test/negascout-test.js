
module("searchOrderSortのテスト");

test("正常系(CPU)", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 1],
        [0, 0, 0, 3, 1, 0],
    );

    const searchOrderIndexList = searchOrderSort(
        playerHoles, cpuHoles, 2, true, MIN_SCORE, MAX_SCORE
    );

    strictEqual(searchOrderIndexList.length, 2, "要素数");
    strictEqual(searchOrderIndexList[0], 3, "期待通りに並び替えられたか");
});

test("正常系(CPU)", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 7],
        [1, 0, 0, 0, 3, 0],
    );

    const searchOrderIndexList = searchOrderSort(
        playerHoles, cpuHoles, 2, true, MIN_SCORE, MAX_SCORE
    );

    strictEqual(searchOrderIndexList.length, 2, "要素数");
    strictEqual(searchOrderIndexList[0], 4, "期待通りに並び替えられたか");
});

test("正常系(Player)", function() {
    mancalaDebugInit(
        [0, 0, 0, 3, 1, 0],
        [0, 0, 0, 0, 0, 1],
    );

    const searchOrderIndexList = searchOrderSort(
        playerHoles, cpuHoles, 2, false, MIN_SCORE, MAX_SCORE
    );

    strictEqual(searchOrderIndexList.length, 2, "要素数");
    strictEqual(searchOrderIndexList[0], 3, "期待通りに並び替えられたか");
});

module("negascoutのテスト");

test("正常系", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 6],
        [1, 1, 1, 1, 1, 0]
    );

    const selectHolesIndex = negascout(playerHoles, cpuHoles, 4, true, MIN_SCORE, MAX_SCORE).selectHolesIndex;

    notStrictEqual(selectHolesIndex, -1);
});

test("負け確でもあきらめないフリをする", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 2, 2],
        [0, 0, 0, 2, 0, 3]
    );

    const selectHolesIndex = negascout(playerHoles, cpuHoles, 4, true, MIN_SCORE, MAX_SCORE).selectHolesIndex;

    strictEqual(selectHolesIndex, 5);
});

test("負け確でもあきらめないフリをする", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 3],
        [1, 0, 0, 0, 3, 0]
    );

    const selectHolesIndex = negascout(playerHoles, cpuHoles, 13, true, MIN_SCORE, MAX_SCORE).selectHolesIndex;

    strictEqual(selectHolesIndex, 4);
});

test("正常系", function() {
    mancalaDebugInit(
        [0, 0, 1, 0, 0, 3],
        [0, 0, 0, 1, 0, 0]
    );

    const selectHolesIndex = negascout(playerHoles, cpuHoles, 12, true, MIN_SCORE, MAX_SCORE).selectHolesIndex;

    strictEqual(selectHolesIndex, 3);
});

test("負けの確信テスト", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 7],
        [1, 0, 0, 0, 3, 0]
    );

    const score = negascout(playerHoles, cpuHoles, 13, true, MIN_SCORE, MAX_SCORE).score;
    ok(MIN_SCORE < score && score < MIN_SCORE + 1);
});

test("負けの確信テスト", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 3],
        [1, 0, 0, 0, 3, 0]
    );

    const score = negascout(playerHoles, cpuHoles, 13, true, MIN_SCORE, MAX_SCORE).score;
    ok(MIN_SCORE < score && score < MIN_SCORE + 1);
});

test("勝ちの確信テスト", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 2],
        [6, 4, 2, 0, 0, 0]
    );

    const score = negascout(playerHoles, cpuHoles, 7, true, MIN_SCORE, MAX_SCORE).score;
    ok(MAX_SCORE - 1 < score && score < MAX_SCORE);
});

test("勝ちの確信テスト", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 2],
        [6, 4, 2, 3, 1, 1]
    );

    const score1 = negascout(playerHoles, cpuHoles, 10, true, MIN_SCORE, MAX_SCORE).score;
    ok(MAX_SCORE - 1 < score1 && score1 < MAX_SCORE);

    const score2 = negascout(playerHoles, cpuHoles, 13, true, MIN_SCORE, MAX_SCORE).score;
    ok(MAX_SCORE - 1 < score2 && score2 < MAX_SCORE);
});

module("negascout（alphabetaモード）のテスト");

test("正常系", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 6],
        [1, 1, 1, 1, 1, 0]
    );

    const selectHolesIndex = negascout(playerHoles, cpuHoles, 4, true, MIN_SCORE, MAX_SCORE, true).selectHolesIndex;

    notStrictEqual(selectHolesIndex, -1);
});

test("負け確でもあきらめないフリをする", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 2, 2],
        [0, 0, 0, 2, 0, 3]
    );

    const selectHolesIndex = negascout(playerHoles, cpuHoles, 4, true, MIN_SCORE, MAX_SCORE, true).selectHolesIndex;

    strictEqual(selectHolesIndex, 5);
});

test("負け確でもあきらめないフリをする", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 3],
        [1, 0, 0, 0, 3, 0]
    );

    const selectHolesIndex = negascout(playerHoles, cpuHoles, 13, true, MIN_SCORE, MAX_SCORE, true).selectHolesIndex;

    strictEqual(selectHolesIndex, 4);
});

test("正常系", function() {
    mancalaDebugInit(
        [0, 0, 1, 0, 0, 3],
        [0, 0, 0, 1, 0, 0]
    );

    const selectHolesIndex = negascout(playerHoles, cpuHoles, 12, true, MIN_SCORE, MAX_SCORE, true).selectHolesIndex;

    strictEqual(selectHolesIndex, 3);
});

test("負けの確信テスト", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 7],
        [1, 0, 0, 0, 3, 0]
    );

    const score = negascout(playerHoles, cpuHoles, 13, true, MIN_SCORE, MAX_SCORE, true).score;
    ok(MIN_SCORE < score && score < MIN_SCORE + 1);
});

test("負けの確信テスト", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 3],
        [1, 0, 0, 0, 3, 0]
    );

    const score = negascout(playerHoles, cpuHoles, 13, true, MIN_SCORE, MAX_SCORE, true).score;
    ok(MIN_SCORE < score && score < MIN_SCORE + 1);
});

test("勝ちの確信テスト", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 2],
        [6, 4, 2, 0, 0, 0]
    );

    const score = negascout(playerHoles, cpuHoles, 7, true, MIN_SCORE, MAX_SCORE).score;
    ok(MAX_SCORE - 1 < score && score < MAX_SCORE);
});

test("勝ちの確信テスト", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 2],
        [6, 4, 2, 3, 1, 1]
    );

    const score1 = negascout(playerHoles, cpuHoles, 10, true, MIN_SCORE, MAX_SCORE, true).score;
    ok(MAX_SCORE - 1 < score1 && score1 < MAX_SCORE);

    const score2 = negascout(playerHoles, cpuHoles, 13, true, MIN_SCORE, MAX_SCORE, true).score;
    ok(MAX_SCORE - 1 < score2 && score2 < MAX_SCORE);
});
