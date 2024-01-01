function solution(tickets) {
  const graph = new Map();
  // 그래프에 티켓정보 담기
  for (const [start, end] of tickets) {
    if (graph.has(start)) graph.get(start).push(end);
    else graph.set(start, [end]);
  }
  //그래프 정렬
  for (const [start, ends] of graph) {
    graph.set(start, ends.sort());
  }

  const dfs = (city, cnt) => {
    // 모든 티켓을 다 쓴경우 정답이므로 도시 반환
    if (cnt === tickets.length) return [city];
    // 더이상 갈곳이없는경우 빈배열을 반환
    if (!graph.get(city)) return [];
    // 다음 도시들 가져와서 깊은복사
    const nxCities = [...graph.get(city)];

    for (let i = 0; i < nxCities.length; i++) {
      // 해당 티켓을 사용처리 (idx를 사용해서 중복티켓이어도 1장만 사라지게)
      graph.set(
        city,
        nxCities.filter((_, idx) => idx !== i)
      );
      const ret = dfs(nxCities[i], cnt + 1);
      // 티켓을 다시 사용안한걸로 처리
      graph.set(city, nxCities);
      // 결과로나온 배열길이 + cnt가 티켓 수라면 정답인것
      if (ret && ret.length + cnt === tickets.length) return [city, ...ret];
    }
  };

  return dfs("ICN", 0);
}
