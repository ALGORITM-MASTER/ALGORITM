const solution = (엄, 준) =>
  준 / 엄 >= 1
    ? Array(엄)
        .fill(~~(준 / 엄))
        .map((식, i) => (i >= 엄 - (준 % 엄) ? 식 + 1 : 식))
    : [-1];
