function solution(word, pages) {
  word = word.toLowerCase(); // 단어는 소문자만 비교
  const pageInfo = new Map(); // 페이지의 정보를 map자료형으로 저장

  //meta 태그에서 현재 url을 가져옴
  const getCurUrl = (page) =>
    page.match(/<meta property="og:url".+>/g)[0].match(/"https:\/\/.+"/g)[0];

  //a태그들에서 주소값들만 가져옴
  const getLinkUrl = (page) => {
    // const aTag = page.match(/<a href="https:\S*"/gi)
    const aTag = page.match(/<a href="https:.+">/gi);
    return aTag ? aTag.map((str) => str.match(/"https:\/\/.+"/g)[0]) : [];
  };

  //기본점수를 구함 (단어단위로 자르고 word와 일치하는것만 분리)
  const getBasicScore = (page) => {
    page = page.toLowerCase();
    return page.match(/[a-z]+/g).filter((v) => v === word).length;
  };

  //객체생성 + 기본점수 구하기
  pages.forEach((page, idx) => {
    const pageURL = getCurUrl(page);
    const point = getBasicScore(page);
    const outLinks = getLinkUrl(page);

    pageInfo.set(pageURL, { point, outLinks, idx, matchPoint: point });
  });

  //외부링크와 연관된 점수 더하기
  for (const [url, info] of pageInfo) {
    for (const link of info.outLinks) {
      const linkInfo = pageInfo.get(link);
      if (linkInfo) linkInfo.matchPoint += info.point / info.outLinks.length;
    }
  }

  //최대값 구하기
  let max = 0;
  let ret = 0;
  for (const [url, info] of pageInfo) {
    if (info.matchPoint > max) {
      ret = info.idx;
      max = info.matchPoint;
    }
  }
  return ret;
}
