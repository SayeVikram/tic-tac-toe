let box = document.getElementById("outer-box");
let reset = document.querySelector(".reset-btn");
let turn = document.querySelector(".turn-token");
let cells; 


let current = "X";
let running = true;

const win_conditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


let options = ["","","","","","","","",""];

window.onload = function (){

    alert("Click on a square to start!")
    let num = 9;

    box.style.gridTemplateColumns = "repeat(" + 3 + " , 1fr)";
    box.style.gridTemplateRows = "repeat(" + 3 + " , 1fr)";

    for(let i = 0; i < num; i++){
        let item = document.createElement('div');
        item.setAttribute("class", "grid-items");
        item.setAttribute("index", i);
        item.style.backgroundColor = "white";
        item.style.border = "1px solid black";
        box.appendChild(item);
    }
    cells = document.querySelectorAll(".grid-items");
    initialize();
}



function initialize(){

    console.log(cells);
    cells.forEach( cell => {
        cell.addEventListener("click", cellClicked)
    });
    reset.addEventListener("click", resetGame);
    turn.textContent = `${current}'s turn`;
}



function cellClicked(){
    
    let cell_index = this.getAttribute('index');

    if(!(options[cell_index] == "") || !running){
        return;
    }

    updateCell(this, cell_index);
    checkWinner();
}

function updateCell(cell, cell_index){
    options[cell_index] = current;
    cell.textContent =   current;
}


function resetGame(){

    for(let i = 0; i < options.length; i++){
        options[i] = "";
    }
    cells.forEach( cell => {
        cell.textContent = "";
    })

    turn.textContent = `${current}'s turn`

}



function checkWinner(){
    let won = false;
    for(let i = 0; i < win_conditions.length; i++){
        let arr = win_conditions[i];
        
        let A = options[arr[0]];
        let B = options[arr[1]];
        let C = options[arr[2]];

        if(A == "" || B == "" || C == ""){
            continue;
        } else{
            if(A == B && B == C){
                won = true;
            }
        }
        
        
    }
    if(won){
        alert(`${current} WINS`)
        turn.textContent = `${current} WINS`
        running = false;
    } else if(!(options.includes(""))){
        alert(`DRAW`);
        turn.textContent = `DRAW`
        running = false;
    }
    else{
        changeCurrent();
    }
    

    
}

function changeCurrent(){
    if(current == "X"){
        current = "O";
        turn.textContent = `${current}'s turn`;

    }else{
        current = "X";
        turn.textContent = `${current}'s turn`;
    }
}






