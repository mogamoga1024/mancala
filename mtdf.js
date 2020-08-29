
const nodeScoreMemo = {};

function mtdf(playerHoles, cpuHoles, depth, f) {
    if (f === undefined) f = 0;

    let score = f;
    let upperBound = MAX_SCORE;
    let lowerBound = MIN_SCORE;
    let beta = 0;
    let bestSelect = null;

    while (lowerBound < upperBound) {
        if (score === lowerBound) beta = score + 1;
        else beta = score;

        bestSelect = alphabetaWithMemory(playerHoles, cpuHoles, depth, true, beta - 1, beta);
        score = bestSelect.score;

        if (score < beta) upperBound = score;
        else lowerBound = score;
    }
    
    return bestSelect;
}

function alphabetaWithMemory(playerHoles, cpuHoles, depth, isCpuTurn, alpha, beta) {

    const key = nodeToStr(playerHoles, cpuHoles, depth, isCpuTurn);

    if (key in nodeScoreMemo) return nodeScoreMemo[key];

    if (isWin(cpuHoles)) {
        // 勝利する手でも、ターンが少ない方が美しい。
        nodeScoreMemo[key] = new BestSelect(MAX_SCORE - 1 / (depth + 2));
        return nodeScoreMemo[key];
    }
    if (isWin(playerHoles)) {
        // 敗北でも最後まで抗いたい。
        nodeScoreMemo[key] = new BestSelect(MIN_SCORE + 1 / (depth + 2));
        return nodeScoreMemo[key];
    }

    if (depth === 0) {
        nodeScoreMemo[key] = new BestSelect(getCpuScore(playerHoles, cpuHoles));
        return nodeScoreMemo[key];
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
            const cpuScore = alphabetaWithMemory(cpyPlayerHoles, cpyCpuHoles, depth - 1, isCpuTurn, alpha, beta).score;

            // Fail-Softのため
            if (cpuScore > rtnMaxScore) {
                rtnMaxScore = cpuScore;
                selectHolesIndex = index;
            }

            // ベータカット
            if (cpuScore >= beta) break;

            if (alpha < cpuScore) alpha = cpuScore;
        }
        nodeScoreMemo[key] = new BestSelect(rtnMaxScore, selectHolesIndex);
        return nodeScoreMemo[key];
    }
    else {
        let rtnMinScore = MAX_SCORE;
        for (let i = 0; i < searchOrderIndexList.length; i++) {
            const index = searchOrderIndexList[i];
            const holesList = copyHoles(playerHoles, cpuHoles);
            const cpyPlayerHoles = holesList.playerHoles;
            const cpyCpuHoles = holesList.cpuHoles;

            const isPlayerTurn = stoneMove(cpyPlayerHoles[index]);
            let cpuScore = alphabetaWithMemory(cpyPlayerHoles, cpyCpuHoles, depth - 1, !isPlayerTurn, alpha, beta).score;

            // Fail-Softのため
            if (cpuScore < rtnMinScore) {
                rtnMinScore = cpuScore;
                selectHolesIndex = index;
            }

            // アルファカット
            if (cpuScore <= alpha) break;

            if (beta > cpuScore) beta = cpuScore;
        }
        nodeScoreMemo[key] = new BestSelect(rtnMinScore, selectHolesIndex);
        return nodeScoreMemo[key];
    }
}

function nodeToStr(playerHoles, cpuHoles, depth, isCpuTurn) {
    const strPlayerHoles = playerHoles.map(function(e) { return e.stoneCount; }).join(",");
    const strCpuHoles = cpuHoles.map(function(e) { return e.stoneCount; }).join(",");
    return strPlayerHoles + "#" + strCpuHoles + "#" + depth + "#" + isCpuTurn;
}
