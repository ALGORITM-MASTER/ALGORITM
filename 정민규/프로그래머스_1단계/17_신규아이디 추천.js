function solution(new_id) {
  var ret = new_id
    .toLowerCase()
    .replace(/[^\w-\.]/g, "")
    .replace(/[\.]+/g, ".")
    .replace(/^\.|\.$/, "")
    .replace(/^$/, "a")
    .substring(0, 15)
    .replace(/\.$/, "");

  while (ret.length <= 2) ret = ret + ret[ret.length - 1];
  return ret;
}
