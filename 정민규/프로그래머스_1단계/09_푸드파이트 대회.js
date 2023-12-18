function solution(food) {
  var str = food.reduce((a, c, idx) => a + `${idx}`.repeat(~~c / 2), "");

  return str + "0" + [...str].reverse().join("");
}
