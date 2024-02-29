function solution(food_times, k) {
  const total = food_times.reduce((a, c) => a + c, 0);
  if (total <= k) return -1;

  food_times = food_times.map((v, i) => [v, i + 1]);
  food_times.sort((a, b) => b[0] - a[0]);

  for (let i = 0; i < food_times.length - 1; i++) {
    food_times[i][0] -= food_times[i + 1][0];
  }

  while (1) {
    if (!food_times.length) break;
    const min = food_times[food_times.length - 1][0];
    if (k < min * food_times.length) break;
    k -= min * food_times.length;
    food_times.pop();
    while (food_times.length && !food_times[food_times.length - 1][0])
      food_times.pop();
  }

  k = k % food_times.length;
  return food_times
    .sort((a, b) => a[1] - b[1])
    .filter((v, idx) => idx === k)[0][1];
}
