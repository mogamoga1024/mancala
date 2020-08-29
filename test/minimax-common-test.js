
module("getCpuScoreのテスト");

test("計算結果のテスト", function() {
    mancalaDebugInit(
        [0, 0, 0, 0, 0, 0],
        [4, 4, 4, 4, 4, 4]
    );

    strictEqual(getCpuScore(playerHoles, cpuHoles), -9);
});

test("計算結果のテスト", function() {
    mancalaDebugInit(
        [4, 4, 4, 4, 4, 4],
        [0, 0, 0, 0, 0, 0]
    );

    strictEqual(getCpuScore(playerHoles, cpuHoles), 18);
});

test("計算結果のテスト", function() {
    mancalaDebugInit(
        [0, 4, 0, 0, 4, 4],
        [4, 0, 0, 4, 4, 4]
    );

    strictEqual(getCpuScore(playerHoles, cpuHoles), 0);
});

test("計算結果のテスト", function() {
    mancalaDebugInit(
        [0, 4, 0, 4, 4, 4],
        [4, 0, 0, 0, 4, 4]
    );

    strictEqual(getCpuScore(playerHoles, cpuHoles), 6);
});
