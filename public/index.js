let baseAPI = "http://localhost:3000/api/v1/questions";
fetch(baseAPI)
  .then((res) => res.json())
  .then((data) => {
    let questions = data.questions; // []
    let randomIndex = Math.floor(Math.random() * questions.length); // [0 -- questions.length - 1]
    let question = questions[randomIndex];

    let questionContainer = document.querySelector("#questionContent h1");
    questionContainer.innerHTML = question.content;

    // Btn Like - Gắn sự kiện onlick - Update like + 1, sau đó điều hướng sang trang
    // question-detail/:id
    let likeBtn = document.getElementById("like");
    likeBtn.addEventListener("click", () => {
      // fetch lên endpoint PUT
      let { id, like } = question;
      fetch(baseAPI + `/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ like: Number(like) + 1 }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // điều hướng sang trang question-detail/id
          window.location.href = `/question-detail/${id}`;
        });
    });
    // Btn dislike  - Gắn sự kiện onlick - Update dislike + 1, sau đó điều hướng sang trang
    // question-detail/:id
    let dislikeBtn = document.getElementById("dislike");
    dislikeBtn.onclick = async function () {
      // fetch lên PUT endpoint
      let { id, dislike } = question;
      try {
        let res = await fetch(baseAPI + `/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dislike: Number(dislike) + 1 }),
        });
        let data = await res.json();
        window.location.href = "/question-detail/" + id;
      } catch (error) {
        alert(error.message);
      }
      // điều hướng sang trang /question-detail/id
    };
  })
  .catch((err) => console.log(err));
