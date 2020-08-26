
function BestSelectResult(score, selectHolesIndex) {
    this.score = score;
    this.selectHolesIndex = (selectHolesIndex !== undefined) ? selectHolesIndex : -1;
}

const MIN_SCORE = -999999;
const MAX_SCORE = 999999;

/**
 * CPUのフィールドの前に0が多いほど、
 * Playerのフィールド前に0が少ないほど
 * 高いスコアを返す。
 */
function getCpuScore(playerHoles, cpuHoles) {
    let subPlayerScore = 0;
    let subCpuScore = 0;
    let centerIndex = Math.floor(playerHoles.length / 2);
    for (let i = 0; i < playerHoles.length; i++) {
        if (playerHoles[i].stoneCount === 0) {
            subPlayerScore += 1;
            if (i >= centerIndex) {
                subPlayerScore += 1;
            }
        }
        if (cpuHoles[i].stoneCount === 0) {
            subCpuScore += 1;
            if (i >= centerIndex) {
                subCpuScore += 1;
            }
        }
    }
    
    return subCpuScore * 2 - subPlayerScore;
}

// jObjはコピーしない
function copyHoles(srcPlayerHoles, srcCpuHoles) {
    const dstPlayerHoles = [];
    const dstCpuHoles = [];

    let prevDstHole = null;
    for (let i = 0; i < srcPlayerHoles.length; i++) {
        let srcHole = srcPlayerHoles[i];
        let dstHole = new Hole(null, srcHole.stoneCount);
        if (prevDstHole !== null) {
            prevDstHole.nextHole = dstHole;
        }
        prevDstHole = dstHole;
        dstPlayerHoles.push(dstHole);
    }
    
    let dstPlayerStore = new Hole(null, 0, true);
    prevDstHole.nextHole = dstPlayerStore;
    prevDstHole = dstPlayerStore;

    for (let i = 0; i < srcCpuHoles.length; i++) {
        let srcHole = srcCpuHoles[i];
        let dstHole = new Hole(null, srcHole.stoneCount);
        prevDstHole.nextHole = dstHole;
        prevDstHole = dstHole;
        dstCpuHoles.push(dstHole);
    }

    let dstCpuStore = new Hole(null, 0, true);
    prevDstHole.nextHole = dstCpuStore;
    dstCpuStore.nextHole = dstPlayerHoles[0];

    return {
        playerHoles: dstPlayerHoles,
        cpuHoles: dstCpuHoles
    };
}
