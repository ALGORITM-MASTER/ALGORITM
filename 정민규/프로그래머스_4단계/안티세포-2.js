function solution(a, s) {
  const MAX_LIMIT = 10e9 + 7;
  const bs = [];
  let tmp = 0;
  for (const len of s) {
    bs.push(a.slice(tmp, tmp + len));
    tmp += len;
  }

  const concatAry = (ary) => {
    const ret = [[...ary]];
    while (ary.length > 1 && ary[ary.length - 1] === ary[ary.length - 2]) {
      ary.push(ary.pop() + ary.pop());
      ret.push([...ary]);
    }
    return ret;
  };

  const makeDesc = (ary) => {
    let ret = [];
    for (const n of ary) {
      if (!ret.length) ret.push(n);
      else if (n < ret[ret.length - 1]) ret.push(n);
      else ret = [n];
    }
    return ret;
  };

  const ret = [];
  for (const b of bs) {
    const n = b.length;

    let tmp = new Map();
    tmp.set(JSON.stringify([b[0]]), 1);

    console.log("------start=---------");
    for (let i = 1; i < n; i++) {
      const nxTmp = new Map();
      for (let [combi, cnt] of tmp) {
        combi = JSON.parse(combi);
        combi.push(b[i]);
        for (const ary of concatAry(combi)) {
          const nxAry = JSON.stringify(makeDesc(ary));
          if (nxTmp.has(nxAry))
            nxTmp.set(nxAry, (nxTmp.get(nxAry) + cnt) % MAX_LIMIT);
          else nxTmp.set(nxAry, cnt % MAX_LIMIT);
        }
      }
      console.log(nxTmp);
      tmp = nxTmp;
    }

    let thisRoundRet = 0;
    for (const [key, val] of tmp) {
      thisRoundRet = (thisRoundRet + val) % MAX_LIMIT;
    }
    ret.push(thisRoundRet);
  }

  return ret;
}

// 1   -> [1]
// 1,1 -> [1] , [2]
// 1,1,1 -> [1] , [2] , [2,1]
// 1,1,1,1 -> [1],[2,1],[2] , [1] , [2,2] , [4]
