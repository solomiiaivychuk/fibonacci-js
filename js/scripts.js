(() => {
  let button = document.querySelector(".btn");

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
          resultsSpinner.classList.remove("d-none");
          fibonacci.innerText = data.result;
        })
        .then(async () => {
          await getCalculationsList();
        })
        .catch((error) => {
          //handleError()
          fibonacci.classList.add("d-none");
          calcSpinner.classList.add("d-none");
          serverError.classList.remove("d-none");
          serverError.innerText = error;
        });
    }
  });

  async function getCalculationsList() {
    let url = "http://localhost:5050/getFibonacciResults";
    await fetch(url)
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
      prevResultsList.appendChild(item);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    resultsSpinner.classList.remove("d-none");
    getCalculationsList();
    prevResultsList.innerHTML.reload;
  });

  function sortList(array) {}
})();
