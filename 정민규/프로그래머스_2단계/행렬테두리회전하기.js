function solution(rows, columns, queries) {
  const map = [...new Array(rows)].map((_, i) =>
    [...new Array(columns)].map((_, j) => columns * i + j + 1)
  );

  const rotate = (query, map) => {
    const [sY, sX, eY, eX] = query.map((v) => v - 1);
    const rotateList = [];
    const tmp = map[sY][sX];
    let ret = tmp;

    for (let y = sY; y <= eY; y++) rotateList.push([y, sX]);
    for (let x = sX; x < eX; x++) rotateList.push([eY, x]);
    for (let y = eY; y >= sY; y--) rotateList.push([y, eX]);
    for (let x = eX; x > sX; x--) rotateList.push([sY, x]);

    for (let i = 0; i < rotateList.length - 1; i++) {
      const [y, x] = rotateList[i];
      const [nY, nX] = rotateList[i + 1];
      map[y][x] = map[nY][nX];
      ret = Math.min(map[y][x], ret);
    }
    // console.log(rotateList)
    if (rotateList.length) {
      const [y, x] = rotateList[rotateList.length - 1];
      map[y][x] = tmp;
    }
    return ret;
  };

  return queries.map((query) => rotate(query, map));
}
