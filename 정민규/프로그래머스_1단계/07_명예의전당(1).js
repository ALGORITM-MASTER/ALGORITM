function solution(k, score) {
  let ret = [];
  let answer = [];

  for (const scr of score) {
    ret.push(scr);
    const min_ = Math.min(...ret);
    if (ret.length > k) ret.splice(ret.indexOf(min_), 1);
    answer.push(Math.min(...ret));
  }

  return answer;
}
