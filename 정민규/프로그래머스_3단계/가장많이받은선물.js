function solution(friends, gifts) {
  const map = new Map();
  const retMap = new Map();

  for (const friend of friends) {
    const initialFrined = {
      send: [],
      get: [],
    };
    map.set(friend, initialFrined);
    retMap.set(friend, 0);
  }

  for (const gift of gifts) {
    const [a, b] = gift.split(" ");
    map.get(a).send.push(b);
    map.get(b).get.push(a);
  }

  const getGiftPoint = (name) => {
    return map.get(name).send.length - map.get(name).get.length;
  };

  const getGift = (name) => {
    retMap.set(name, retMap.get(name) + 1);
  };

  //선물 주고받기
  for (let i = 0; i < friends.length; i++) {
    const A = friends[i];
    for (let j = i + 1; j < friends.length; j++) {
      const B = friends[j];

      const giftCntAToB = map
        .get(A)
        .send.reduce((a, c) => (c === B ? a + 1 : a), 0);
      const giftCntBToA = map
        .get(B)
        .send.reduce((a, c) => (c === A ? a + 1 : a), 0);

      if (giftCntAToB === giftCntBToA) {
        const AGiftPoint = getGiftPoint(A);
        const BGiftPoint = getGiftPoint(B);

        if (AGiftPoint > BGiftPoint) getGift(A);
        else if (BGiftPoint > AGiftPoint) getGift(B);
      } else {
        if (giftCntAToB > giftCntBToA) getGift(A);
        else getGift(B);
      }
    }
  }

  console.log(retMap);
  return Math.max(...[...retMap].map((v) => v[1]));
}
