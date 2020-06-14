let button = document.querySelector(".btn");

let fibonacci = document.getElementById("Y");
let calcSpinner = document.querySelector(".calc-spinner");
let dangerAlert = document.querySelector(".alert-danger");
let input = document.getElementById("X");
let serverError = document.querySelector(".server-error");

button.addEventListener("click", function () {
  let number = document.getElementById("X").value;
  let address = `http://localhost:5050/fibonacci/${number}`;

  if (number > 50) {
    dangerAlert.classList.remove("d-none");
    input.classList.add("danger");
  } else {
    dangerAlert.classList.add("d-none");
    input.classList.remove("danger");
    calcSpinner.classList.remove("d-none");
    fetch(address)
      .then((response) => response.json())
      .then((data) => {
        calcSpinner.classList.add("d-none");
        fibonacci.innerText = data.result;
        getCalculationsList();
      })
      .catch((error) => {
        fibonacci.classList.add("d-none");
        calcSpinner.classList.add("d-none");
        serverError.classList.remove("d-none");
        serverError.innerText = error;
      });
  }
});

function getCalculationsList() {
  let prevResultsList = document.getElementById("prev-results-list");
  let url = 'http://localhost:5050/getFibonacciResults';
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data.results.sort((a, b) => b.createdDate - a.createdDate);
    for (let i = 0; i < data.results.length; i++) {
      let item = document.createElement('li');
      let text = document.createTextNode(
        "The Fibonacci of "+ data.results[i].number 
        + " is " + data.results[i].result
        + ". Calculated at: " + new Date(data.results[i].createdDate));
      item.appendChild(text);
      prevResultsList.appendChild(item);

    }
  });
}
//let body = document.getElementsByTagName("body");
document.addEventListener("DOMContentLoaded", getCalculationsList);


