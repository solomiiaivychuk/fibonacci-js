let fibonacci = document.getElementById("Y");
let button = document.querySelector('.btn');


button.addEventListener("click", function(){
    let counter = document.getElementById("X").value;
    let arr = [];
    arr[0] = 0;
    arr[1] = 1;
    for (let i = 2; i <= counter; i++) {
        arr[i] = arr[i-1] + arr[i-2];
    }
    fibonacci.innerText = arr[counter];
});

