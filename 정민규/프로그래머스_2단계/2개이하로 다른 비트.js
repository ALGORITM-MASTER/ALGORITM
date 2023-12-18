function solution(numbers) {
  return numbers.map((el) => {
    if (!(el % 2)) return el + 1;
    const bin = "0" + el.toString(2);
    const idx = bin.lastIndexOf("0");
    return parseInt(bin.substring(0, idx) + "10" + bin.substring(idx + 2), 2);
  });
}
