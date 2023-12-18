function solution(places) {
  const dx = [1, 0, -1, 0];

  const dy = [0, 1, 0, -1];

  const dfs = (x, y, dist, place) => {
    if (place[y][x] === "P") return true;
    for (let k = 0; k < 4; k++) {
      const nx = x + dx[k];
      const ny = y + dy[k];
      if (
        0 <= nx &&
        nx < 5 &&
        0 <= ny &&
        ny < 5 &&
        place[ny][nx] !== "X" &&
        dist < 2
      ) {
        if (dfs(nx, ny, dist + 1, place)) return true;
      }
    }
    return false;
  };

  const checkDistance = (place) => {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (place[i][j] !== "P") continue;
        place[i] = place[i].slice(0, j) + "X" + place[i].slice(j + 1);
        if (dfs(j, i, 0, place)) return 0;
      }
    }
    return 1;
  };

  return places.map((place) => checkDistance(place));
}
