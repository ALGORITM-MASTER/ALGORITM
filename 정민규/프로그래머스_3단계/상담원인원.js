const getAry = (n, k, ary) => {
  let ret = [];
  if (n <= 0) return false;
  if (k === 1) return [[...ary, n]];
  for (let i = 1; i < n; i++) {
    const attached = getAry(n - i, k - 1, [...ary, i]);
    if (!attached) break;
    ret.push(...attached);
  }

  return ret;
};

function solution(k, n, reqs) {
  const combination = getAry(n, k, []);

  let ret = Infinity;

  for (const combi of combination) {
    const counselorAry = [];
    combi.forEach((el, idx) => {
      for (let i = 0; i < el; i++) {
        counselorAry.push({
          type: idx + 1,
          end: 0,
        });
      }
    });

    let time = 0;
    for (const [start, period, type] of reqs) {
      let minCounselor = {
        end: Infinity,
      };
      for (const counselor of counselorAry) {
        if (counselor.type === type && counselor.end < minCounselor.end) {
          minCounselor = counselor;
        }
      }

      if (start < minCounselor.end) {
        time += minCounselor.end - start;
        minCounselor.end = minCounselor.end + period;
      } else {
        minCounselor.end = start + period;
      }
    }
    ret = time < ret ? time : ret;
  }
  return ret;
}
