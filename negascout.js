
function negascout(playerHoles, cpuHoles, depth, isCpuTurn, alpha, beta, isAlphaBeta) {

    if (isAlphaBeta === undefined) isAlphaBeta = false;

    if (isWin(cpuHoles)) {
        //console.log("cpu win");
        // 勝利する手でも、ターンが少ない方が美しい。
        return new BestSelect(MAX_SCORE - 1 / (depth + 2));
    }
    if (isWin(playerHoles)) {
        //console.log("player win");
        // 敗北でも最後まで抗いたい。
        return new BestSelect(MIN_SCORE + 1 / (depth + 2));
    }

    if (depth === 0) {
        return new BestSelect(getCpuScore(playerHoles, cpuHoles));
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
            let cpuScore = 0;
            if (isAlphaBeta || i === 0) {
                cpuScore = negascout(cpyPlayerHoles, cpyCpuHoles, depth - 1, isCpuTurn, alpha, beta).score;
            }
            else {
                cpuScore = negascout(cpyPlayerHoles, cpyCpuHoles, depth - 1, isCpuTurn, alpha, alpha + 1).score;
            }

            // Fail-Softのため
            if (cpuScore > rtnMaxScore) {
                rtnMaxScore = cpuScore;
                selectHolesIndex = index;
            }

            // ベータカット
            if (cpuScore >= beta) break;

            if (alpha < cpuScore) {
                alpha = cpuScore;
                if (isAlphaBeta || i === 0) continue;
                cpuScore = negascout(cpyPlayerHoles, cpyCpuHoles, depth - 1, isCpuTurn, alpha, beta).score;
                // Fail-Softのため
                if (cpuScore > rtnMaxScore) {
                    rtnMaxScore = cpuScore;
                    selectHolesIndex = index;
                }
                // ベータカット
                if (cpuScore >= beta) break;
                if (alpha < cpuScore) alpha = cpuScore;
            }
        }
        return new BestSelect(rtnMaxScore, selectHolesIndex);
    }
    else {
        let rtnMinScore = MAX_SCORE;
        for (let i = 0; i < searchOrderIndexList.length; i++) {
            const index = searchOrderIndexList[i];
            const holesList = copyHoles(playerHoles, cpuHoles);
            const cpyPlayerHoles = holesList.playerHoles;
            const cpyCpuHoles = holesList.cpuHoles;

            const isPlayerTurn = stoneMove(cpyPlayerHoles[index]);
            let cpuScore = 0;
            if (isAlphaBeta || i === 0) {
                cpuScore = negascout(cpyPlayerHoles, cpyCpuHoles, depth - 1, !isPlayerTurn, alpha, beta).score;
            }
            else {
                cpuScore = negascout(cpyPlayerHoles, cpyCpuHoles, depth - 1, !isPlayerTurn, beta - 1, beta).score;
            }

            // Fail-Softのため
            if (cpuScore < rtnMinScore) {
                rtnMinScore = cpuScore;
                selectHolesIndex = index;
            }

            // アルファカット
            if (cpuScore <= alpha) break;

            if (beta > cpuScore) {
                beta = cpuScore;
                if (isAlphaBeta || i === 0) continue;
                cpuScore = negascout(cpyPlayerHoles, cpyCpuHoles, depth - 1, !isPlayerTurn, alpha, beta).score;
                // Fail-Softのため
                if (cpuScore < rtnMinScore) {
                    rtnMinScore = cpuScore;
                    selectHolesIndex = index;
                }
                // アルファカット
                if (cpuScore <= alpha) break;
                if (beta > cpuScore) beta = cpuScore;
            }
        }
        return new BestSelect(rtnMinScore, selectHolesIndex);
    }
}

function searchOrderSort(playerHoles, cpuHoles, depth, isCpuTurn, alpha, beta) {
    const selectionOrderList = [];

    if (isCpuTurn) {
        for (let i = 0; i < cpuHoles.length; i++) {
            const holesList = copyHoles(playerHoles, cpuHoles);
            const cpyPlayerHoles = holesList.playerHoles;
            const cpyCpuHoles = holesList.cpuHoles;

            if (cpyCpuHoles[i].stoneCount === 0) {
                continue;
            }

            const isCpuTurn = stoneMove(cpyCpuHoles[i]);
            const cpuScore = negascout(cpyPlayerHoles, cpyCpuHoles, depth - 1, isCpuTurn, alpha, beta, true).score;
            selectionOrderList.push(new BestSelect(cpuScore, i));
        }
    }
    else {
        for (let i = 0; i < playerHoles.length; i++) {
            const holesList = copyHoles(playerHoles, cpuHoles);
            const cpyPlayerHoles = holesList.playerHoles;
            const cpyCpuHoles = holesList.cpuHoles;

            if (cpyPlayerHoles[i].stoneCount === 0) {
                continue;
            }

            const isPlayerTurn = stoneMove(cpyPlayerHoles[i]);
            const cpuScore = negascout(cpyPlayerHoles, cpyCpuHoles, depth - 1, !isPlayerTurn, alpha, beta, true).score;
            selectionOrderList.push(new BestSelect(cpuScore, i));
        }
    }

    const selectionOrderIndexList = selectionOrderList.sort(function(a, b) {
        return isCpuTurn ? b.score - a.score : a.score - b.score;
    }).map(function(e) {
        return e.selectHolesIndex;
    });

    return selectionOrderIndexList;
}