const express = require('express');
const bodyParser = require('body-parser');
const multer = require("multer");

const app = express();
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

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
  });
  

app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

app.get("/ex1", (request, response) => {
  response.sendFile(`${__dirname}/views/ex1.html`);
});

app.get("/ex2", (request, response) => {
  response.sendFile(`${__dirname}/views/ex2.html`);
});

app.get("/ex3", (request, response) => {
  response.sendFile(`${__dirname}/views/ex3.html`);
});

app.post("/ex1", upload.array(), (request, response) => {

  //For testing
  console.log("============  FORM POST ============");
  console.log("request body is: ", request.body);

  const name = request.body.username;
  const email = request.body.email;

  response.send(`<strong>${name}</strong>, thank you for your order. We will keep you posted on delivery status at <strong>${email}</strong>.`)
});

const username = "Hedgar";

const countriesVisited = [
    { name: "USA", year: 2004 },
    { name: "Mexico", year: 2008 }
];

const data = {
  name: username,
  countries: countriesVisited
};

app.get("/api/countries", (request, response) => {
  const responseData = {
    name: username,
    numberOfCountriesVisited: countriesVisited.length,
    countries: countriesVisited
  };

  response.json(responseData);
});

app.post("/api/countries", (request, response) => {

  const responseData = {
    name: username,
    numberOfCountriesVisited: countriesVisited.length,
    countries: countriesVisited
  };
  
  response.send(`Your name is <strong>${responseData.name}</strong> and you visited ${responseData.numberOfCountriesVisited} countries. Keep traveling!`);
});


const articles = [
  { id: 1, title: "First article", content: "Hello World!" },
  {
    id: 2,
    title: "Lorem ipsum",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut hendrerit mauris ac porttitor accumsan. Nunc vitae pulvinar odio, auctor interdum dolor. Aenean sodales dui quis metus iaculis, hendrerit vulputate lorem vestibulum."
  },
  {
    id: 3,
    title: "Lorem ipsum in French",
    content:
      "J’en dis autant de ceux qui, par mollesse d’esprit, c’est-à-dire par la crainte de la peine et de la douleur, manquent aux devoirs de la vie. Et il est très facile de rendre raison de ce que j’avance."
  }
];

app.post("/ex3", upload.array(), (request, response) => {

  const { title, content } = request.body;

  // Get the max ID and increment it by 1
  const maxId = articles.length > 0 ? Math.max(...articles.map(article => article.id)) : 0;
  const newId = maxId + 1;

  // Add the new article to the array
  const newArticle = { id: newId, title, content };
  articles.push(newArticle);

  // Send the response
  response.send(`New article added successfully with title "${title}" and ID ${newId}!`);
});
