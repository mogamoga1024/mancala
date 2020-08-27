
function mtdf(playerHoles, cpuHoles, depth, f) {
    if (f === undefined) f = 0;

    let score = f;
    let upperBound = MAX_SCORE;
    let lowerBound = MIN_SCORE;
    let beta = 0;
    let bestSelectResult = null;

    while (lowerBound < upperBound) {
        if (score === lowerBound) beta = score + 1;
        else beta = score;

        // TODO 置換表付きアルファ・ベータ法にする。
        bestSelectResult = alphabeta(playerHoles, cpuHoles, depth, true, beta - 1, beta);
        score = bestSelectResult.score;

        if (score < beta) upperBound = score;
        else lowerBound = score;
    }
    
    return bestSelectResult;
}

function alphabeta(playerHoles, cpuHoles, depth, isCpuTurn, alpha, beta) {

    if (isWin(cpuHoles)) {
        //console.log("cpu win");
        // 勝利する手でも、ターンが少ない方が美しい。
        return new BestSelectResult(MAX_SCORE - 1 / (depth + 2));
    }
    if (isWin(playerHoles)) {
        //console.log("player win");
        // 敗北でも最後まで抗いたい。
        return new BestSelectResult(MIN_SCORE + 1 / (depth + 2));
    }

    if (depth === 0) {
        return new BestSelectResult(getCpuScore(playerHoles, cpuHoles));
    }

    let searchOrderIndexList = [];
    const depthOfSearchOrderSort = 2;
    if (depth >= depthOfSearchOrderSort) {
        searchOrderIndexList = searchOrderSort(playerHoles, cpuHoles, depthOfSearchOrderSort, isCpuTurn, alpha, beta);
    }
    else {
        let holes = isCpuTurn ? cpuHoles : playerHoles;
        for (let i = 0; i < holes.length; i++) {
            if (holes[i].stoneCount === 0) continue;
            searchOrderIndexList.push(i);
        }
    }

    let selectHolesIndex = -1;
    if (isCpuTurn) {
        let rtnMaxScore = MIN_SCORE;
        for (let i = 0; i < searchOrderIndexList.length; i++) {
            const index = searchOrderIndexList[i];
            const holesList = copyHoles(playerHoles, cpuHoles);
            const cpyPlayerHoles = holesList.playerHoles;
            const cpyCpuHoles = holesList.cpuHoles;

            const isCpuTurn = stoneMove(cpyCpuHoles[index]);
            const cpuScore = negascout(cpyPlayerHoles, cpyCpuHoles, depth - 1, isCpuTurn, alpha, beta).score;

            // Fail-Softのため
            if (cpuScore > rtnMaxScore) {
                rtnMaxScore = cpuScore;
                selectHolesIndex = index;
            }

            // ベータカット
            if (cpuScore >= beta) break;

            if (alpha < cpuScore) alpha = cpuScore;
        }
        return new BestSelectResult(rtnMaxScore, selectHolesIndex);
    }
    else {
        let rtnMinScore = MAX_SCORE;
        for (let i = 0; i < searchOrderIndexList.length; i++) {
            const index = searchOrderIndexList[i];
            const holesList = copyHoles(playerHoles, cpuHoles);
            const cpyPlayerHoles = holesList.playerHoles;
            const cpyCpuHoles = holesList.cpuHoles;

            const isPlayerTurn = stoneMove(cpyPlayerHoles[index]);
            let cpuScore = negascout(cpyPlayerHoles, cpyCpuHoles, depth - 1, !isPlayerTurn, alpha, beta).score;

            // Fail-Softのため
            if (cpuScore < rtnMinScore) {
                rtnMinScore = cpuScore;
                selectHolesIndex = index;
            }

            // アルファカット
            if (cpuScore <= alpha) break;

            if (beta > cpuScore) beta = cpuScore;
        }
        return new BestSelectResult(rtnMinScore, selectHolesIndex);
    }
}

