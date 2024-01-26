const getParent = (a, arr) => {
  if (arr[a] === a) return a;
  return (arr[a] = getParent(arr[a], arr));
};

const union = (a, b, arr) => {
  a = getParent(a, arr);
  b = getParent(b, arr);

  if (a > b) arr[a] = b;
  else arr[b] = a;
};

const isUnion = (a, b, arr) => {
  a = getParent(a, arr);
  b = getParent(b, arr);
  return a === b ? true : false;
};

//모든 섬이 연결되었는지 확인
const checkIsConnect = (arr) => {
  return arr.every((v) => v === 0);
};

function solution(n, costs) {
  costs.sort((a, b) => a[2] - b[2]);
  let parents = [...Array(n)].map((_, i) => i);

  let ret = 0;
  for (const [s, e, c] of costs) {
    if (!isUnion(s, e, parents)) {
      union(s, e, parents);
      ret += c;
      parents = parents.map((v) => getParent(v, parents));
      if (checkIsConnect(parents)) return ret;
    }
  }
}
