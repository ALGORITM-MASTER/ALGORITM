function solution(m, musicinfos) {
  //시간 차이를 분으로 반환
  const getTimeDiff = (s, e) => {
    const [sH, sM] = s.split(":").map((v) => +v);
    const [eH, eM] = e.split(":").map((v) => +v);

    return eH * 60 + eM - sH * 60 - sM;
  };

  // a배열안에 b배열이 포함되어있는지 확인
  const isIncludeAry = (a, b) => {
    outer: for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[0]) continue;

      for (let j = 0; j < b.length; j++) {
        if (i + j >= a.length || a[i + j] !== b[j]) continue outer;
      }
      return true;
    }
    return false;
  };

  //musicinfo를 보기좋게 변환
  musicinfos = musicinfos
    .map((v) => v.split(","))
    .sort((a, b) => {
      return getTimeDiff(b[0], b[1]) - getTimeDiff(a[0], a[1]);
    });

  const sheetMusics = musicinfos.map(([start, end, name, music]) => {
    //재생되는 악보를 구함
    const sheet = music.match(/C#|D#|F#|G#|A#|C|D|E|F|G|A|B/g);
    const diff = getTimeDiff(start, end);
    const [div, mod] = [~~(diff / sheet.length), diff % sheet.length];

    return music.repeat(div) + sheet.slice(0, mod).join("");
  });

  for (let i = 0; i < sheetMusics.length; i++) {
    const sheetMusic = sheetMusics[i].match(/C#|D#|F#|G#|A#|C|D|E|F|G|A|B/g);
    const mAry = m.match(/C#|D#|F#|G#|A#|C|D|E|F|G|A|B/g);

    if (mAry && sheetMusic && isIncludeAry(sheetMusic, mAry))
      return musicinfos[i][2];
  }
  return "(None)";
}
