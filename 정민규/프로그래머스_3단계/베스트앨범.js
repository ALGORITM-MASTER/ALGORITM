function solution(genres, plays) {
  const playMap = new Map();
  const genreMap = new Map();

  for (let i = 0; i < genres.length; i++) {
    const genre = genres[i];
    const play = plays[i];
    if (playMap.has(genre)) playMap.set(genre, playMap.get(genre) + play);
    else playMap.set(genre, play);
    if (genreMap.has(genre)) genreMap.get(genre).push([i, play]);
    else genreMap.set(genre, [[i, play]]);
  }

  const ret = [];
  const playAry = [...playMap].sort((a, b) => b[1] - a[1]);
  for (const [genre, play] of playAry) {
    const songs = genreMap.get(genre).sort((a, b) => b[1] - a[1]);
    ret.push(songs[0][0]);
    if (songs.length > 1) ret.push(songs[1][0]);
  }
  return ret;
}
