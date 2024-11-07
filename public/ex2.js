document.getElementById("button").addEventListener("click", (e) => {

  fetch("/api/countries", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.text())
    .then(result => {
      document.getElementById("result").innerHTML = result;
    })
    .catch(err => {
      console.error(err.message);
    });
})


