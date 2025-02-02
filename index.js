const boxes=document.querySelectorAll('.box');
const gameinfo=document.querySelector('.game-info');
const newgamebtn=document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// let create the function to initalize the game

function initgame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    // UI pr empty he krna pade ga box ko
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        box.classList=`box box${index+1}`;
    })
    newgamebtn.classList.remove('active');
    gameinfo.innerText =`Current Player - ${currentPlayer}` ;
}
initgame()

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer= "0";
    }
    else{
        currentPlayer= "X";
    }
    //UI Update
    gameinfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    // newgamebtn.classList.add("active")
    let answer="";

    winningPosition.forEach((position)=>{
        // All three value sholud be non-empty and exectly same in value
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="")
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){

             // check if winner is x or y
            if(gameGrid[position[0]]==="X")
                answer="X";
            else
                answer="0";


            // disable Pointer events
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            });


            // noe we know x/0 is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // it means we have a winner
    if(answer!==""){
        gameinfo.innerText=`Winner Player - ${answer}`;
        newgamebtn.classList.add("active");
        return;
    }

    // let's check whather is tai
    let fillcount=0;
    gameGrid.forEach((box)=>{
        if(box !=="")
            fillcount++;
    });

    // board is fill game is tai
    if(fillcount === 9){
        gameinfo.innerText="Game Ties !";
        newgamebtn.classList.add("active");
    }
}


function handleClick(index){
    if(gameGrid[index]==""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        // swap kro turn koo
        swapTurn();
        // check kro jeet to ni gya
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",() =>{
        handleClick(index);
    })
})

newgamebtn.addEventListener("click",initgame)