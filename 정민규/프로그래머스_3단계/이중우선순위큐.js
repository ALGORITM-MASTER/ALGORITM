function solution(operations) {
  //이분탐색으로 항상 정렬된 리스트 형성
  const push = (value, ary) => {
    if (value.length < 1) {
      ary.push(value);
      return;
    }

    let [left, right] = [0, ary.length - 1];
    while (left <= right) {
      const mid = ~~((left + right) / 2);
      if (ary[mid] < value) left = mid + 1;
      else right = mid - 1;
    }
    return [...ary.slice(0, left), value, ...ary.slice(left)];
  };

  let ary = [];
  for (const operation of operations) {
    const [order, val] = operation.split(" ");
    if (order === "I") ary = push(+val, ary);
    else if (val === "1") ary.pop();
    else ary.shift();
  }

  return ary.length > 0 ? [ary[ary.length - 1], ary[0]] : [0, 0];
}
