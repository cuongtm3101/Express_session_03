// B1: Require các module cần dùng
const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fs = require("fs");

// Serving static file
app.use(express.static("public"));

// B2: Sử dụng các module đó
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev")); // development

// api for questions c/r/u/d

function checkExistById(req, res, next) {
  let { id } = req.params;
  fs.readFile("./dev-data/questions.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ err, status: "fail", message: err.message });
    }
    data = JSON.parse(data);
    let find = data.find((e, i) => `${e.id}` === id);
    if (!find) {
      res.status(500).json({ message: "Question not found" });
    }
    next();
  });
}

// GET ALL
app.get("/api/v1/questions", (req, res) => {
  fs.readFile("./dev-data/questions.json", "utf8", (err, data) => {
    if (err)
      res.status(500).json({ err, status: "fail", message: err.message });

    data = JSON.parse(data);
    res.status(200).json({
      questions: data,
    });
  });
});

// GET ONE BY ID
app.get("/api/v1/questions/:id", checkExistById, (req, res) => {
  let { id } = req.params;
  fs.readFile("./dev-data/questions.json", "utf8", (err, data) => {
    if (err)
      res.status(500).json({ err, status: "fail", message: err.message });

    data = JSON.parse(data);
    // Tìm kiếm câu hỏi với id nằm trong mảng data
    let find = data.find((e, i) => `${e.id}` === id);
    res.status(200).json({
      data: find,
    });
  });
});

// CREATE
app.post("/api/v1/questions", (req, res) => {
  let { content, like, dislike } = req.body;
  let id = Math.floor(Math.random() * 1000000000);
  let question = {
    id,
    content,
    like: Number(like),
    dislike: Number(dislike),
  };
  fs.readFile("./dev-data/questions.json", "utf8", (err, data) => {
    if (err)
      res.status(500).json({ err, status: "fail", message: err.message });

    data = JSON.parse(data);
    data.push(question);
    fs.writeFile("./dev-data/questions.json", JSON.stringify(data), (err) => {
      if (err)
        res.status(500).json({ err, status: "fail", message: err.message });

      res.status(200).json({
        message: "Create successfully",
        status: "success",
      });
    });
  });
});

// UPDATE ONE
app.put("/api/v1/questions/:id", checkExistById, (req, res) => {
  let { id } = req.params;
  console.log(req.body); // req.body = {dislike: 1} || {like: 2}

  fs.readFile("./dev-data/questions.json", "utf8", (err, data) => {
    if (err)
      res.status(500).json({ err, status: "fail", message: err.message });

    data = JSON.parse(data);
    // Tìm kiếm câu hỏi với id nằm trong mảng data
    let findIndex = data.findIndex((e, i) => `${e.id}` === id);
    data[findIndex] = {
      ...data[findIndex],
      ...req.body,
    };
    fs.writeFile("./dev-data/questions.json", JSON.stringify(data), (err) => {
      if (err)
        res.status(500).json({ err, status: "fail", message: err.message });

      res.status(200).json({
        message: "Update successfully",
        status: "success",
      });
    });
  });
});

// B3: Khởi tạo và setup các endpoint
app.get("/", (req, res) => {
  res.sendFile("index");
});

app.get("/ask", (req, res) => {
  res.sendFile("ask.html", { root: "public" });
});

app.get("/question-detail/:id", (req, res) => {
  res.sendFile("question-detail.html", { root: "public" });
});

app.get("*", (req, res) => {
  res.send("PAGE NOT FOUND");
});
// B4: Listen server trên cổng ...
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
