for (let i = 0; i < matrixLength; i += 1) {
    dp[i][i] = 0;
  }

  for (let i = 1; i < matrixLength; i += 1) {
    for (let row = 0; row + i < matrixLength; row += 1) {
      const col = row + i;
      for (let k = row; k < col; k += 1) {
        dp[row][col] = Math.min(
          dp[row][col],
          dp[row][k] +
            dp[k + 1][col] +
            matrix_sizes[row][0] * matrix_sizes[k + 1][0] * matrix_sizes[col][1]
        );
      }
    }