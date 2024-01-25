function solution(word, pages) {
  word = word.toLowerCase();
  const pageInfo = new Map();

  const getCurUrl = (page) =>
    page.match(/<meta property="og:url".+>/g)[0].match(/"https:\/\/.+"/g)[0];

  const getLinkUrl = (page) => {
    // const aTag = page.match(/<a href="https:\S*"/gi)
    const aTag = page.match(/<a href="https:.+">/gi);
    return aTag ? aTag.map((str) => str.match(/"https:\/\/.+"/g)[0]) : [];
  };

  const getBasicScore = (page) => {
    page = page.toLowerCase();
    return page.match(/[a-z]+/g).filter((v) => v === word).length;
  };

  pages.forEach((page, idx) => {
    const pageURL = getCurUrl(page);
    const point = getBasicScore(page);
    const outLinks = getLinkUrl(page);

    pageInfo.set(pageURL, { point, outLinks, idx, matchPoint: point });
  });

  for (const [url, info] of pageInfo) {
    for (const link of info.outLinks) {
      const linkInfo = pageInfo.get(link);
      if (linkInfo) linkInfo.matchPoint += info.point / info.outLinks.length;
    }
  }

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
