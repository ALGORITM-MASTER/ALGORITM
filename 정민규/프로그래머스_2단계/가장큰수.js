function solution(numbers) {
  if (numbers.every((v) => v === 0)) return "0";

  return numbers
    .sort((a, b) =>
      +(String(a) + String(b)) < +(String(b) + String(a)) ? 1 : -1
    )
    .join("");
}
