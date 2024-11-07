document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  
  console.log("THIS IS RUNNING");
  fetch("/ex3", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => response.text())
    .then(result => {
      document.getElementById("result").innerHTML = result;
    })
    .catch(err => {
      console.error(err.message);
    });
})