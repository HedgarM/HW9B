const express = require('express');
const bodyParser = require('body-parser');
const multer = require("multer");

const app = express();
const port = 3000;
const upload = multer();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static("css"));
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

app.get("/ex1", (request, response) => {
  response.sendFile(`${__dirname}/views/ex1.html`);
});

app.post("/ex1", upload.array(), (request, response) => {

  //For testing
  console.log("============  FORM POST ============");
  console.log("request body is: ", request.body);

  const name = request.body.username;
  const email = request.body.email;

  response.send(`<strong>${name}</strong>, thank you for your order. We will keep you posted on delivery status at <strong>${email}</strong>.`)
});