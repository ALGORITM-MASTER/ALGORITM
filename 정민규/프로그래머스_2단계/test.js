document.querySelector(".test");

const btn = document.querySelector(".btn");

btn.addEventListener("click", (e) => {
  e.innerHTML += "추가되었습니다.";
});
