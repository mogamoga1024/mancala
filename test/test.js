
module("mancalaInitのテスト", {
    setup: function() {
        mancalaInit();
    }
});

test("Holesの要素数", function () {
    strictEqual(playerHoles.length, 6, "playerHoles");
    strictEqual(cpuHoles.length, 6, "cpuHoles");
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

module("copyHolesのテスト", {
    setup: function() {
        mancalaInit();
    }
});

test("要素のコピーテスト", function() {

});