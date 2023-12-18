function solution(record) {
  const userDB = new Map();
  record = record.map((v) => v.split(" "));

  for (const [order, id, name] of record) {
    if (order !== "Leave") userDB.set(id, name);
  }

  record = record.filter(([order, id, name]) => order !== "Change");
  return record.map(
    ([order, id, name]) =>
      `${userDB.get(id)}님이 ${(ment =
        order === "Leave" ? "나갔습니다." : "들어왔습니다.")}`
  );
}
