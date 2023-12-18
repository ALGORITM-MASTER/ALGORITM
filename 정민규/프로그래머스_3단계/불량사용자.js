function solution(user_id, banned_id) {
  const bannedIdList = banned_id.map((v) => {
    const reg = new RegExp(
      "^" + [...v].map((v) => (v === "*" ? "." : v)).join("") + "$"
    );
    return user_id.filter((v) => reg.test(v));
  });

  let ret = [];
  const obj = {};
  for (const user of user_id) {
    obj[user] = false;
  }

  const dfs = (depth) => {
    if (depth === banned_id.length) {
      const tmp = Array(user_id.length).fill(0);
      for (const [user, val] of Object.entries(obj)) {
        if (val) tmp[user_id.indexOf(user)] = 1;
      }
      ret.push(tmp.join(""));
      return;
    }

    for (const id of bannedIdList[depth]) {
      if (obj[id]) continue;
      obj[id] = true;
      dfs(depth + 1);
      obj[id] = false;
    }
  };

  dfs(0);
  return new Set(ret).size;
}
