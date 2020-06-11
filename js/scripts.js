let counter = document.getElementById("X");
let fibonacci = document.getElementById("Y");

function fibonacciCalculator(x) {
    let arr = [];
    counter.innerText = x;
    arr[0] = 0;
    arr[1] = 1;
    for (let i = 2; i <= x; i++) {
        arr[i] = arr[i-1] + arr[i-2];
    }
    return arr[x];
    }

fibonacci.innerText = fibonacciCalculator(10);
