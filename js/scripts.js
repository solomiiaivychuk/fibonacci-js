let button = document.querySelector(".btn");

let fibonacci = document.getElementById("Y");
let spinner = document.querySelector(".spinner-border");
let dangerAlert = document.querySelector('.alert-danger');
let input = document.getElementById("X");
let serverError = document.querySelector('.server-error');

button.addEventListener("click", function () {
  let number = document.getElementById("X").value;
  let address = `http://localhost:5050/fibonacci/${number}`;

  if (number > 50) {
      dangerAlert.classList.remove("d-none");
      input.classList.add("danger");
    } 
    else {
        dangerAlert.classList.add("d-none");
        input.classList.remove("danger");
        spinner.classList.remove("d-none");
        fetch(address)
        .then((response) => response.json())
        .then((data) => {
        spinner.classList.add("d-none");
        fibonacci.innerText = data.result;
      })
      .catch((error) => {
        fibonacci.classList.add("d-none");
        spinner.classList.add("d-none");
        serverError.classList.remove("d-none");
        serverError.innerText = error;
      });     
}
});
