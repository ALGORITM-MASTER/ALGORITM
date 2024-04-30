function solution(sales, links) {
  sales = [0, ...sales]; // 회사원 수 인덱스랑 맞추기

  const childs = [...Array(sales.length)].map((_) => []);
  for (const [s, e] of links) {
    childs[s].push(e);
  }

  //return [parent를 누른 경우, parent를 안누른 경우]
  const getPoint = (parent) => {
    if (!childs[parent].length) return [sales[parent], 0];
    let isSelect = false;
    let curPoint = 0;

    const childPoints = [];
    for (const child of childs[parent]) {
      const [pushPoint, noPushPoint] = getPoint(child);

      if (pushPoint <= noPushPoint) {
        isSelect = true;
        curPoint += pushPoint;
      } else {
        curPoint += noPushPoint;
      }
      childPoints.push([pushPoint, noPushPoint]);
    }

    if (!isSelect) {
      let minDiff = Infinity;
      for (const [pp, npp] of childPoints) {
        minDiff = Math.min(minDiff, pp - npp);
      }
      return [sales[parent] + curPoint, curPoint + minDiff];
    }
    return [sales[parent] + curPoint, curPoint];
  };

  return Math.min(...getPoint(1));
}
