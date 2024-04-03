const isSameAry = (a, b) => a[0] === b[0] && a[1] === b[1];

const find = (a, parent) => {
  const parentA = parent[a[0]][a[1]];
  if (isSameAry(a, parentA)) return a;
  return (parent[a[0]][a[1]] = find(parentA, parent));
};

const union = (a, b, parent) => {
  a = find(a, parent);
  b = find(b, parent);

  if (a > b) parent[a[0]][a[1]] = b;
  else parent[b[0]][b[1]] = a;
};

function solution(land, height) {
  const { length } = land;
  const dc = [1, 0, -1, 0];
  const dr = [0, 1, 0, -1];

  const parent = [...Array(length)].map((_, i) =>
    [...Array(length)].map((_, j) => [i, j])
  );

  const isCanGo = (r, c) => 0 <= r && r < length && 0 <= c && c < length;
  //union,find로 팀을 합침
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      for (let d = 0; d < 4; d++) {
        const [nR, nC] = [i + dr[d], j + dc[d]];
        if (!isCanGo(nR, nC)) continue;
        if (Math.abs(land[i][j] - land[nR][nC]) <= height) {
          union([i, j], [nR, nC], parent);
        }
      }
    }
  }

  //각 팀별 이동할 수 있는 사다리의 최소값을 그래프 형식으로 정리
  const connectMap = new Map();

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      const [r, c] = find([i, j], parent);
      for (let d = 0; d < 4; d++) {
        const [nR, nC] = [i + dr[d], j + dc[d]];
        if (!isCanGo(nR, nC)) continue;
        const [pnR, pnC] = find([nR, nC], parent);
        if (isSameAry([r, c], [pnR, pnC])) continue;
        const diff = Math.abs(land[nR][nC] - land[i][j]);
        const key = String([r, c]);

        if (!connectMap.has(key)) {
          connectMap.set(key, [{ to: String([pnR, pnC]), diff }]);
        } else {
          const team = connectMap
            .get(key)
            .find((v) => v.to === String([pnR, pnC]));
          if (!team) connectMap.get(key).push({ to: String([pnR, pnC]), diff });
          else if (team.diff > diff) team.diff = diff;
        }
      }
    }
  }

  //가장 작은 사다리 비용부터 정리
  const diffInfo = [];
  for (const [from, diffs] of connectMap) {
    for (const { to, diff } of diffs) {
      diffInfo.push([from, to, diff]);
    }
  }
  diffInfo.sort((a, b) => a[2] - b[2]);

  let ret = 0;

  //가장 작은 사다리 비용부터 순차적으로 합쳐나가기
  for (let [from, to, diff] of diffInfo) {
    from = from.split(",").map((v) => +v);
    to = to.split(",").map((v) => +v);
    if (isSameAry(find(from, parent), find(to, parent))) continue;
    ret += diff;
    union(from, to, parent);
  }
  return ret;
}
