//creating board.
let boardContainer = document.getElementById('board-container')

//var moveFx = document.getElementById("myAudio"); 

var moveFx = new Audio('sounds/move.mp3');
var taken = new Audio('sounds/taken.mp3');

let board = [
    [['bR'],['bK'],['bB'],['bQ'],['bKn'],['bB'],['bK'],['bR']],
    [['bP'],['bP'],['bP'],['bP'],['bP'],['bP'],['bP'],['bP']],
    [[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[]],
    [['wP'],['wP'],['wP'],['wP'],['wP'],['wP'],['wP'],['wP']],
    [['wR'],['wK'],['wB'],['wQ'],['wKn'],['wB'],['wK'],['wR']] 
]



//building pieces
let piece = {
    //black pieces with ascii
    bP : '♟',
    bK : '♞',
    bB : '♝',
    bR : '♜',
    bQ : '♛',
    bKn : '♚',

    //white pieces with ascii
    wP : '♙',
    wK : '♘',
    wB : '♗',
    wR : '♖',
    wQ : '♕',
    wKn : '♔'
}

//values of pieces
let values = {
    //black pieces with ascii
    bP : 1,
    bK : 3,
    bB : 3,
    bR : 5,
    bQ : 9,
    bKn : 0,

    //white pieces with ascii
    wP : 1,
    wK : 3,
    wB : 3,
    wR : 5,
    wQ : 9,
    wKn : 0
}

//creating the board tiles
function createBoard(){
    for (let i = 0; i <board.length; i++){
        //assinging a row variable.
        let row = board[i]

        //creating a container row div and adding it to DOM.
        let rowDom = document.createElement('div')
        rowDom.setAttribute('class', 'row n-'+i)
        boardContainer.appendChild(rowDom)
        console.log(i)
        //looping through each row
        for (let q = 0; q<row.length; q++){
            
            //creating the tile object, adding a class 'tile' and adding to row DOM.
            let square = document.createElement('div')

            //checking if row index is odd
            if (i % 2 != 0){
                //if current square is on an even pos
                if (q % 2 == 0){
                    //then we put the white square on the DOM.
                    square.setAttribute('class', 'square black')
                    square.setAttribute('onclick', 'point(this)')
                    square.setAttribute('id', String(i) + String(q))
                    square.textContent = piece[row[q]]
                    rowDom.appendChild(square)
                }else{
                    //else we put the black square on the DOM.
                    square.textContent = piece[row[q]]
                    square.setAttribute('class', 'square white')
                    square.setAttribute('onclick', 'point(this)')
                    square.setAttribute('id', String(i) + String(q))
                    rowDom.appendChild(square)

                }

            //cehcking if row index is even,
            }else{
                if (q % 2 == 0){
                    //then we put the white square on the DOM.
                    square.setAttribute('class', 'square white')
                    square.setAttribute('onclick', 'point(this)')
                    square.setAttribute('id', String(i) + String(q))
                    square.textContent = piece[row[q]]
                    rowDom.appendChild(square)
                }else{
                    //else we put the black square on the DOM.
                    square.setAttribute('class', 'square black')
                    square.setAttribute('onclick', 'point(this)')
                    square.setAttribute('id', String(i) + String(q))
                    square.textContent = piece[row[q]]
                    rowDom.appendChild(square)

                }
            }              
        }
    }
}
//selected should be false if function has not been called yet.
var selectedTF = false
var selectedChessPiece = ''
function point(x){
    

    if (!selectedTF){
        //if there is a piece 
        if (x.innerHTML != ''){
            selectedTF = true
            selectedChessPiece = x
            console.log(selectedChessPiece.id)
            if (selectedChessPiece.innerHTML == '♟'){
                console.log('clicked once')


            }
        }
    //this means if the current piece has been selected:    
    }else if (selectedTF & selectedChessPiece != x){

        console.log('THIS IS: '+x.innerHTML)

        //Checking if piece is taken
        if (x.innerHTML){
            //if the taken piece is the white queen, black wins.
            if (x.innerHTML == '♔'){
                alert('BLACK WON')
            }
            //if the taken piece is the black queen, white wins.
            if (x.innerHTML == '♚'){
                alert('WHITE WON')
            }
            taken.play()

        //and if piece is not taken
        }else{
            moveFx.play()
        }
        
        //destination piece
        let destinationPiece = x

        //create distanceBetween, equal to the difference between the selected pice and the destination piece
        
        let distanceBetween = String(selectedChessPiece.id)[0] - String(x.id)[0] + ' ' + String(selectedChessPiece.id[1] - String(x.id[1]))

        console.log('destination: '+destinationPiece.id)
        selectedTF = false
        console.log('distance between: ' +distanceBetween)

        //move the chess piece
       
        console.log([board[selectedChessPiece.id[0]][selectedChessPiece.id[1]]])

        board[selectedChessPiece.id[0]][selectedChessPiece.id[1]] = ''

        board[x.id[0]][x.id[1]] = geyKey(piece, selectedChessPiece.innerHTML)

        x.innerHTML = selectedChessPiece.innerHTML

        selectedChessPiece.innerHTML = ''

        
        console.log(board)
        checkPoints()
        
    }
}



//function checks points on board.
function checkPoints(){
    let scoreDom = document.getElementById('score')
    let whiteScore = 0;
    let blackScore = 0;
    for (let i = 0; i < board.length; i++){
        
        let currentRow = board[i]
        for (let q  = 0; q<currentRow.length; q++){

            if (currentRow[q].length != 0 && currentRow[q][0][0] == 'w'){
                whiteScore = whiteScore + values[currentRow[q]]
            }else if (currentRow[q].length != 0 && currentRow[q][0][0] == 'b'){
                blackScore = blackScore + values[currentRow[q]]
            }
        
        }

    }

    score = blackScore - whiteScore
    console.log('SCOOOORE',score)
    let bar = document.getElementById('bar');

    bar.style.width = 50+score+'%'


    if (score < 0){
        let finalScore = 'W+'+score * -1
        console.log(finalScore)
        scoreDom.innerHTML = finalScore
        
        
    }else if (score > 0){
        let finalScore = 'B+'+score
        console.log(finalScore)
        scoreDom.innerHTML = finalScore
    }else{
        finalScore = score
        console.log(finalScore)
        scoreDom.innerHTML = finalScore
    }

}








//MISC functions

function geyKey(object, value) {
    return String(Object.keys(object).find(key => object[key] === value));
}

var musicOn = true;
function hideMusic(){
    let music = document.getElementById('music')
    let button = document.getElementById('musicBtn')
    
    if (music.style.display == 'none'){
        music.style.display = 'flex'
        button.innerHTML = 'Close'
    }else{
        music.style.display = 'none'
        button.innerHTML = 'Music options'
    }
    

    
}



createBoard()