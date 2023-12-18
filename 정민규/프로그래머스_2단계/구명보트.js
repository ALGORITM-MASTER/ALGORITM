function solution(people, limit) {
  people.sort((a, b) => a - b);
  let answer = 0;

  while (people.length > 0) {
    let p = people.pop();
    let left = false;
    while (p < limit && people.length > 0) {
      if (left && p + people[people.length - 1] <= limit) {
        p += people.pop();
        left = false;
      } else if (!left && p + people[0] <= limit) {
        p += people.shift();
        left = true;
      } else {
        break;
      }
    }
    answer++;
  }

  return answer;
}
