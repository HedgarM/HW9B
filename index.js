const express = require('express');

const app = express();
const port = 3000;

app.get("/", (request, response) => {
  response.send("Hello from Express!");
});

app.get('/form', (request, response) => {
  response.sendFile(`${__dirname}/views/form.html`);
})

app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  res.send(`
      <h1>Form Submission Successful</h1>
      <p>Thank you, <strong>${name}</strong>!</p>
      <p>Your email address: <strong>${email}</strong></p>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});