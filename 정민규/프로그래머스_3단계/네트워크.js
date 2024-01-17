//union - find
const getParent = (n, arr) => {
  if (arr[n] === n) return n;
  return (arr[n] = getParent(arr[n], arr));
};

const union = (a, b, arr) => {
  a = getParent(a, arr);
  b = getParent(b, arr);
  if (a > b) arr[a] = b;
  else arr[b] = a;
};

function solution(n, computers) {
  //부모배열
  const parent = [...Array(n)].map((_, i) => i);
  //union 연산
  for (const computer of computers) {
    const startIdx = computer.indexOf(1);
    for (let i = 0; i < n; i++) {
      if (computer[i] === 1) union(startIdx, i, parent);
    }
  }
  // 부모 갱신
  for (let i = 0; i < n; i++) getParent(i, parent);
  //set을 활용하여 영역파악
  return new Set(parent).size;
}
