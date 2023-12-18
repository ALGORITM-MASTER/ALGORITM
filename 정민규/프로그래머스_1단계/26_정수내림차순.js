const solution = (n) =>
  BigInt([...n.toString()].sort((a, b) => b - a).join(""));
