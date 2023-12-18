function solution(phone_book) {
  phone_book.sort((a, b) => a.length - b.length);

  const map = new Map();

  for (const phone of phone_book) {
    let number = "";
    for (const n of phone) {
      number += n;
      if (map.get(number)) return false;
    }
    map.set(phone, true);
  }

  return true;
}
