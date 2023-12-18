function solution(commands) {
  const cell = [...Array(51)].map((v) => [...Array(51)].fill("EMPTY"));
  const parents = [...Array(51)].map((_, i) =>
    [...Array(51)].map((_, j) => [i, j])
  );
  const ret = [];

  const find = ([aI, aJ]) => {
    if (parents[aI][aJ][0] === aI && parents[aI][aJ][1] === aJ) return [aI, aJ];
    else return find(parents[aI][aJ]);
  };

  const merge = (a, b) => {
    const [aI, aJ] = find(a);
    const [bI, bJ] = find(b);
    const value = cell[aI][aJ] === "EMPTY" ? cell[bI][bJ] : cell[aI][aJ];

    if ([aI, aJ] < [bI, bJ]) parents[bI][bJ] = [aI, aJ];
    else parents[aI][aJ] = [bI, bJ];

    cell[aI][aJ] = value;
    cell[bI][bJ] = value;
  };

  const updateByCoord = (r, c, value) => {
    const [pR, pC] = find([+r, +c]);
    cell[pR][pC] = value;
  };

  const updateByValue = (value1, value2) => {
    for (let i = 1; i <= 50; i++) {
      for (let j = 1; j <= 50; j++) {
        const [pI, pJ] = find([i, j]);
        if (cell[pI][pJ] === value1) cell[pI][pJ] = value2;
      }
    }
  };

  function update() {
    if (arguments.length === 3) updateByCoord(...arguments);
    else updateByValue(...arguments);
  }

  const unMerge = (r, c) => {
    (r = +r), (c = +c);
    const [pR, pC] = find([r, c]);
    const value = cell[pR][pC];
    const mergedList = [];
    for (let i = 1; i <= 50; i++) {
      for (let j = 1; j <= 50; j++) {
        const [pI, pJ] = find([i, j]);
        if (pR === pI && pC === pJ) mergedList.push([i, j]);
      }
    }

    for (const [i, j] of mergedList) {
      parents[i][j] = [i, j];
      cell[i][j] = "EMPTY";
    }
    cell[r][c] = value;
  };

  const print = (r, c) => {
    const [pR, pC] = find([+r, +c]);
    ret.push(cell[pR][pC]);
  };

  for (const command of commands) {
    const [type, ...arg] = command.split(" ");
    switch (type) {
      case "UPDATE":
        update(...arg);
        break;
      case "MERGE":
        const [aI, aJ, bI, bJ] = arg;
        merge([+aI, +aJ], [+bI, +bJ]);
        break;
      case "UNMERGE":
        unMerge(...arg);
        break;
      case "PRINT":
        print(...arg);
        break;
      default:
        console.log("wrong command");
    }
  }
  return ret;
}
