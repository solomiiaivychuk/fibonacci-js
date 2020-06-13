let button = document.querySelector('.btn');


button.addEventListener("click", function() {
    let number = document.getElementById("X").value;
    let address = `http://localhost:5050/fibonacci/${number}`;
    let fibonacci = document.getElementById("Y"); 
    fetch(address)
    .then(response => response.json())
    .then(data => fibonacci.innerText = data.result);
});