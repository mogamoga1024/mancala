
module("nodeToStrのテスト");

test("正常系", function() {
    mancalaDebugInit(
        [0, 1, 2, 3, 7, 5],
        [9, 7, 5, 5, 2, 3]
    );

    strictEqual(
        nodeToStr(playerHoles, cpuHoles, 10, true),
        "0,1,2,3,7,5#9,7,5,5,2,3#10#true"
    );
});

test("正常系", function() {
    mancalaDebugInit(
        [9, 8, 7, 0, 1, 2],
        [2, 2, 3, 6, 0, 3]
    );

    strictEqual(
        nodeToStr(playerHoles, cpuHoles, 3, false),
        "9,8,7,0,1,2#2,2,3,6,0,3#3#false"
    );
});

module("alphabetaWithMemoryのテスト");

test("正常系", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 6],
        [1, 1, 1, 1, 1, 0]
    );

    const selectHolesIndex = alphabetaWithMemory(playerHoles, cpuHoles, 4, true, MIN_SCORE, MAX_SCORE).selectHolesIndex;

    notStrictEqual(selectHolesIndex, -1);
});

test("負け確でもあきらめないフリをする", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 2, 2],
        [0, 0, 0, 2, 0, 3]
    );

    const selectHolesIndex = alphabetaWithMemory(playerHoles, cpuHoles, 4, true, MIN_SCORE, MAX_SCORE).selectHolesIndex;

    strictEqual(selectHolesIndex, 5);
});

test("負け確でもあきらめないフリをする", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 3],
        [1, 0, 0, 0, 3, 0]
    );

    const selectHolesIndex = alphabetaWithMemory(playerHoles, cpuHoles, 13, true, MIN_SCORE, MAX_SCORE).selectHolesIndex;

    strictEqual(selectHolesIndex, 4);
});

test("正常系", function() {
    mancalaDebugInit(
        [0, 0, 1, 0, 0, 3],
        [0, 0, 0, 1, 0, 0]
    );

    const selectHolesIndex = alphabetaWithMemory(playerHoles, cpuHoles, 12, true, MIN_SCORE, MAX_SCORE).selectHolesIndex;

    strictEqual(selectHolesIndex, 3);
});

test("負けの確信テスト", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 7],
        [1, 0, 0, 0, 3, 0]
    );

    const score = alphabetaWithMemory(playerHoles, cpuHoles, 13, true, MIN_SCORE, MAX_SCORE).score;
    ok(MIN_SCORE < score && score < MIN_SCORE + 1);
});

test("負けの確信テスト", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 3],
        [1, 0, 0, 0, 3, 0]
    );

    const score = alphabetaWithMemory(playerHoles, cpuHoles, 13, true, MIN_SCORE, MAX_SCORE).score;
    ok(MIN_SCORE < score && score < MIN_SCORE + 1);
});

test("勝ちの確信テスト", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 2],
        [6, 4, 2, 0, 0, 0]
    );

    const score = alphabetaWithMemory(playerHoles, cpuHoles, 7, true, MIN_SCORE, MAX_SCORE).score;
    ok(MAX_SCORE - 1 < score && score < MAX_SCORE);
});

test("勝ちの確信テスト", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 2],
        [6, 4, 2, 3, 1, 1]
    );

    const score1 = alphabetaWithMemory(playerHoles, cpuHoles, 10, true, MIN_SCORE, MAX_SCORE).score;
    ok(MAX_SCORE - 1 < score1 && score1 < MAX_SCORE);

    const score2 = alphabetaWithMemory(playerHoles, cpuHoles, 13, true, MIN_SCORE, MAX_SCORE).score;
    ok(MAX_SCORE - 1 < score2 && score2 < MAX_SCORE);
});

module("mtdfのテスト");

test("正常系", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 6],
        [1, 1, 1, 1, 1, 0]
    );

    const selectHolesIndex = mtdf(playerHoles, cpuHoles, 4).selectHolesIndex;

    notStrictEqual(selectHolesIndex, -1);
});

test("負け確でもあきらめないフリをする", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 2, 2],
        [0, 0, 0, 2, 0, 3]
    );

    const selectHolesIndex = mtdf(playerHoles, cpuHoles, 4).selectHolesIndex;

    strictEqual(selectHolesIndex, 5);
});

test("負け確でもあきらめないフリをする", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 3],
        [1, 0, 0, 0, 3, 0]
    );

    const selectHolesIndex = mtdf(playerHoles, cpuHoles, 13).selectHolesIndex;

    strictEqual(selectHolesIndex, 4);
});

test("正常系", function() {
    mancalaDebugInit(
        [0, 0, 1, 0, 0, 3],
        [0, 0, 0, 1, 0, 0]
    );

    const selectHolesIndex = mtdf(playerHoles, cpuHoles, 12).selectHolesIndex;

    strictEqual(selectHolesIndex, 3);
});

test("負けの確信テスト", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 7],
        [1, 0, 0, 0, 3, 0]
    );

    const score = mtdf(playerHoles, cpuHoles, 13).score;
    ok(MIN_SCORE < score && score < MIN_SCORE + 1);
});

test("負けの確信テスト", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 3],
        [1, 0, 0, 0, 3, 0]
    );

    const score = mtdf(playerHoles, cpuHoles, 13).score;
    ok(MIN_SCORE < score && score < MIN_SCORE + 1);
});

test("勝ちの確信テスト", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 2],
        [6, 4, 2, 0, 0, 0]
    );

    const score = mtdf(playerHoles, cpuHoles, 7).score;
    ok(MAX_SCORE - 1 < score && score < MAX_SCORE);
});

test("勝ちの確信テスト", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 2],
        [6, 4, 2, 3, 1, 1]
    );

    const score1 = mtdf(playerHoles, cpuHoles, 10).score;
    ok(MAX_SCORE - 1 < score1 && score1 < MAX_SCORE);

    const score2 = mtdf(playerHoles, cpuHoles, 13).score;
    ok(MAX_SCORE - 1 < score2 && score2 < MAX_SCORE);
});
