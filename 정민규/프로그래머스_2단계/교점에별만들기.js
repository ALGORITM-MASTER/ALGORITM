function solution(line) {
  const cod = [];

  for (let i = 0; i < line.length; i++) {
    for (let j = i; j < line.length; j++) {
      const [A, B, E] = line[i];
      const [C, D, F] = line[j];
      if (A * D - B * C === 0) continue;
      const x = (B * F - E * D) / (A * D - B * C);
      const y = (E * C - A * F) / (A * D - B * C);
      if (Number.isInteger(x) && Number.isInteger(y)) cod.push([x, y]);
    }
  }
  cod.sort((a, b) => a[0] - b[0]);
  const [minX, maxX] = [cod[0][0], cod[cod.length - 1][0]];
  cod.sort((a, b) => a[1] - b[1]);
  const [minY, maxY] = [cod[0][1], cod[cod.length - 1][1]];

  const ret = [...new Array(maxY - minY + 1)].map((_) =>
    [...new Array(maxX - minX + 1)].fill(".")
  );
  for (const [x, y] of cod) {
    ret[y - minY][x - minX] = "*";
  }
  return ret.map((el) => el.join("")).reverse();
}
