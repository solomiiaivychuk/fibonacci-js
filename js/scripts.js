(() => {
  const button = document.querySelector(".is");
  const fibonacci = document.getElementById("Y");
  const calcSpinner = document.querySelector(".calc-spinner");
  const dangerAlert = document.querySelector(".alert-danger");
  const input = document.getElementById("X");
  const serverError = document.querySelector(".server-error");
  const resultsSpinner = document.querySelector(".results-spinner");
  const prevResultsList = document.getElementById("prev-results-list");
  const checkbox = document.querySelector("input[type=checkbox]");
  const sortingOption = document.querySelector(".custom-select");
  const RESULTS_ADRESS = "http://localhost:5050/getFibonacciResults";

  // When page loads, all previous results are shown
  document.addEventListener("DOMContentLoaded", displayResults());

  async function displayResults() {
    let list = await getCalculationsList(RESULTS_ADRESS);
    showResults(list);
  }

  function getNumber() {
    return document.getElementById("X").value;
  }

  function validateInput(input) {
    if (input > 50 || input < 0) {
      handleLargeValueError();
    } else {
      resetErrorMessage();
      return input;
    }
  }
  // function checks if the checkbox is checked: if not - it performs calculations locally; if yes - it gets calculations from the server
  button.addEventListener("click", async function () {
    let number = validateInput(getNumber());
    let CALC_ADDRESS = `http://localhost:5050/fibonacci/${number}`;
    if (checkbox.checked) {
      const result = await calculateRemotely(CALC_ADDRESS);
      prepareForResultsDisplay();
      fibonacci.innerText = result;
      displayResults();
    } else {
      calcSpinner.classList.add("d-none");
      fibonacci.innerText = calculateLocally(number);
    }
  });

  function calculateLocally(x) {
    let arr = [];
    arr[0] = 0;
    arr[1] = 1;
    for (let i = 2; i <= x; i++) {
      arr[i] = arr[i - 1] + arr[i - 2];
    }
    return arr[x];
  }

  async function calculateRemotely(url) {
    const response = await fetch(url);
    if (!response.ok) {
      handleErrorBadResponse();
      const error = await response.text();
      serverError.innerText = `Server Error: ${error}`;
    } else {
      const data = await response.json();
      return data.result;
    }
  }

  async function getCalculationsList(url) {
    resultsSpinner.classList.remove("d-none");
    const response = await fetch(url);
    const data = await response.json();
    resultsSpinner.classList.add("d-none");
    return data;
  }

  function showResults(data) {
    for (let i = 0; i < data.results.length; i++) {
      let item = document.createElement("li");
      let text = document.createTextNode(
        "The Fibonacci of " +
          data.results[i].number +
          " is " +
          data.results[i].result +
          ". Calculated at: " +
          new Date(data.results[i].createdDate)
      );
      item.appendChild(text);
      item.classList.add("list-group-item");
      prevResultsList.appendChild(item);
    }
  }

  sortingOption.addEventListener(
    "change",
    async function () {
      let data = await getCalculationsList(RESULTS_ADRESS);
      prevResultsList.innerText = null;
      switch (sortingOption.value) {
        case "date-asc":
          data.results.sort((a, b) => a.createdDate - b.createdDate);
          break;
        case "date-desc":
          data.results.sort((a, b) => b.createdDate - a.createdDate);
          break;
        case "number-asc":
          data.results.sort((a, b) => a.number - b.number);
          break;
        case "number-desc":
          data.results.sort((a, b) => b.number - a.number);
          break;
        default:
          showResults(data);
      }
      showResults(data);
    }
  );

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
    fibonacci.classList.remove("d-none");
    dangerAlert.classList.add("d-none");
    input.classList.remove("danger");
    calcSpinner.classList.remove("d-none");
    serverError.classList.add("d-none");
  }
})();
