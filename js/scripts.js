let button = document.querySelector('.btn');

function fibonacciCalculator(x){
    if (x <= 1) {
        return x;
    } else {
        return fibonacciCalculator(x-1) + fibonacciCalculator(x-2);
    }
}

button.addEventListener("click", function() {
    let counter = document.getElementById("X").value;
    let fibonacci = document.getElementById("Y"); 
    fibonacci.innerText = fibonacciCalculator(counter);
});
