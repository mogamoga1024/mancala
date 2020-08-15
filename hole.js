
function Hole(jObj, stoneCount, isStore) {
    this.jObj = jObj;
    this.stoneCount = stoneCount;
    this.isStore = (isStore !== undefined) ? isStore : false;
    this.nextHole = null;
}
