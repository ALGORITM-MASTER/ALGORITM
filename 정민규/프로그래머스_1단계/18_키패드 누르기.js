function solution(numbers, hand) {
  const cod = [
    [3, 1],
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ];
  let [left, right] = [
    [3, 0],
    [3, 2],
  ];

  const getnHand = (a, b, c) => {
    const a_c = Math.abs(c[1] - a[1]) + Math.abs(c[0] - a[0]);
    const b_c = Math.abs(c[1] - b[1]) + Math.abs(c[0] - b[0]);
    return a_c > b_c ? "R" : a_c === b_c ? (hand === "right" ? "R" : "L") : "L";
  };

  return numbers.reduce((a, c) => {
    let hand;
    if ([1, 4, 7].includes(c)) hand = "L";
    else if ([3, 6, 9].includes(c)) hand = "R";
    else hand = getnHand(left, right, cod[c]);

    if (hand === "L") left = cod[c];
    else right = cod[c];
    return a + hand;
  }, "");
}
