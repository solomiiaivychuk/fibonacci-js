(() => {
  let button = document.querySelector(".is");
  let fibonacci = document.getElementById("Y");
  let calcSpinner = document.querySelector(".calc-spinner");
  let dangerAlert = document.querySelector(".alert-danger");
  let input = document.getElementById("X");
  let serverError = document.querySelector(".server-error");
  let resultsSpinner = document.querySelector(".results-spinner");
  let prevResultsList = document.getElementById("prev-results-list");

  button.addEventListener("click", function () {
    let number = document.getElementById("X").value;
    let address = `http://localhost:5050/fibonacci/${number}`;
    prevResultsList.innerHTML = null;
    if (number > 50) {
      handleLargeValueError();
    } else {
      resetErrorMessage();
      fetch(address)
        .then((response) => {
            if (!response.ok) {
              handleErrorBadResponse();
              response.text().then((text) => {
                serverError.innerText = `Server Error: ${text}`;
              })
            }
            return response.json();
        })
        .then((data) => {
          prepareForResultsDisplay();
          fibonacci.innerText = data.result;
        })
        .then(() => {
          getCalculationsList();
        });
    }
  });

  function prepareForResultsDisplay() {
    calcSpinner.classList.add("d-none");
    resultsSpinner.classList.remove("d-none");
  }
  function handleErrorBadResponse() {
    fibonacci.classList.add("d-none");
    calcSpinner.classList.add("d-none");
    serverError.classList.remove("d-none");
  }
  function handleLargeValueError() {
    dangerAlert.classList.remove("d-none");
    input.classList.add("danger");
  }
  function resetErrorMessage() {
    dangerAlert.classList.add("d-none");
    input.classList.remove("danger");
    calcSpinner.classList.remove("d-none");
    serverError.classList.add("d-none");
  }
  function getCalculationsList() {
    let url = "http://localhost:5050/getFibonacciResults";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        showDBresults(data);
        resultsSpinner.classList.add("d-none");
      });
  }

  function showDBresults(data) {
    let sortedData = data.results.sort((a, b) => b.createdDate - a.createdDate);
    console.log(sortedData);
    for (let i = 0; i < sortedData.length; i++) {
      let item = document.createElement("li");
      let text = document.createTextNode(
        "The Fibonacci of " +
          sortedData[i].number +
          " is " +
          sortedData[i].result +
          ". Calculated at: " +
          new Date(sortedData[i].createdDate)
      );
      item.appendChild(text);
      item.classList.add("list-group-item");
      prevResultsList.appendChild(item);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    resultsSpinner.classList.remove("d-none");
    getCalculationsList();
  });
})();
