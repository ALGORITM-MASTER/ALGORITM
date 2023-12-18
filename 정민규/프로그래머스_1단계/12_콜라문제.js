function solution(a, b, n) {
  var answer = 0;
  while (n >= a) {
    answer += ~~(n / a) * b;
    n = n - ~~(n / a) * a + ~~(n / a) * b;
  }
  return answer;
}
