
module("ただのデバグ", {
    setup: function() {
        mancalaInit();
    }
});

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


