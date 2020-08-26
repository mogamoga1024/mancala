
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
