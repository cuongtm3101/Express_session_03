let baseAPI = "http://localhost:3000/api/v1/questions";
let urlArray = window.location.href.split("/");
let id = urlArray[urlArray.length - 1];

fetch(baseAPI + `/${id}`)
  .then((res) => res.json())
  .then((data) => {
    data = data.data;
    let { content, like, dislike, id } = data;
    let questionContainer = document.querySelector("#questionContent h1");
    let vote = document.querySelector("#voteNumber");
    let likeContainer = document.querySelector("#like");
    let dislikeContainer = document.querySelector("#dislike");

    // like: 4, dislike: 2
    // likeContainer: width === 66%
    // dislikeContainer: width == 34%

    let likeWidth = Math.floor((like / (dislike + like)) * 100);
    let dislikeWidth = 100 - likeWidth;
    likeContainer.style.width = `${likeWidth}%`;
    likeContainer.innerHTML = `${likeWidth}%`;
    dislikeContainer.style.width = `${dislikeWidth}%`;
    dislikeContainer.innerHTML = `${dislikeWidth}%`;

    questionContainer.innerHTML = content;
    vote.innerHTML = Number(like) + Number(dislike);
  })
  .catch((err) => alert(err.message));

// phương thức .json() của response trả về từ fetch
// cũng là một promise

// Promise ???
// Promise chain ???
// - Thông thường, một promise có thể sử dụng
// .then() tuần tự và liên tục một cách bình thường
// fetch() -> // kết quả trả về luôn là một promise
// promise.then().then().then()

// - Khi ở trong bất kỳ một .then() nào, return về một giá trị
// gì đó
// ---> Thì giá trị đó sẽ được đẩy xuống dưới tham số của callback
// function của .then() tiếp theo
// ---> Và khi đấy, các chuỗi .then() sẽ được gọi là một promise chain
