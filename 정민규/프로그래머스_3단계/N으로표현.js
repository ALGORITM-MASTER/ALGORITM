function solution(N, number) {
  //dp[i] 는 N i개로 만들수 있는 숫자
  const dp = [...Array(9)].map((_) => new Set());

  for (let i = 1; i <= 8; i++) {
    //숫자가 붙여져서 나오는 경우의 수
    dp[i].add(parseInt(String(N).repeat(i)));

    //지금까지 구한 dp의 조합으로 새 dp를 만듬
    for (let j = 0; j < i; j++) {
      for (const num1 of dp[j]) {
        for (const num2 of dp[i - j]) {
          dp[i].add(num1 * num2);
          dp[i].add(~~(num1 / num2));
          dp[i].add(num1 - num2);
          dp[i].add(num1 + num2);
        }
      }
    }
    if (dp[i].has(number)) return i;
  }

  return -1;
}
