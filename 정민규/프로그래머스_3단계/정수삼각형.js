function solution(triangle) {
  for (let i = 1; i < triangle.length; i++) {
    for (let j = 0; j < triangle[i].length; j++) {
      const left = triangle[i - 1][j] ? triangle[i - 1][j] : 0;
      const right = triangle[i - 1][j - 1] ? triangle[i - 1][j - 1] : 0;
      triangle[i][j] += Math.max(left, right);
    }
  }

  return Math.max(...triangle[triangle.length - 1]);
}
