let baseAPI = "http://localhost:3000/api/v1/questions";
let form = document.getElementById("mainForm");
let textArea = form.askQuestion;

textArea.addEventListener("input", (e) => {
  document.getElementById("letter").innerHTML = e.target.value.length;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let question = {
    like: 0,
    dislike: 0,
    content: form.askQuestion.value,
  };
  fetch(baseAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(question),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message);
      form.askQuestion.value = "";
    })
    .catch((err) => alert(err.message));
});
