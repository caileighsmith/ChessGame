//notes : using initials for piece names, p for pawn as an example.

//board sets the dimensions for the array. Adding starting pos for pieces.
let board = [
    [ ['bRook'], ['bKnight'], ['bBishop'], ['bQueen'], ['bKing'], ['bBishop'], ['bKnight'], ['bRook']],
    [ ['bPawn'], ['bPawn'], ['bPawn'], ['bPawn'], ['bPawn'], ['bPawn'], ['bPawn'], ['bPawn'] ],
    [ [], [], [], [], [], [], [], [] ],
    [ [], [], [], [], [], [], [], [] ],
    [ [], [], [], [], [], [], [], [] ],
    [ [], [], [], [], [], [], [], [] ],
    [ ['wPawn'], ['wPawn'], ['wPawn'], ['wPawn'], ['wPawn'], ['wPawn'], ['wPawn'], ['wPawn'] ],
    [ ['wRook'], ['wKnight'], ['wBishop'], ['wQueen'], ['wKing'], ['wBishop'], ['wKnight'], ['wRook'] ]
]


//We start a bPawn. index = [1][0] [2][0] [3][0]


//index 1 and board.length-2 index(s) to access initial placement of line of pawns.


//index 0 and board.length-1 index(s) to access 1st rows for white, and for black (king & queen row).
console.log(board[0], board[board.length-1])



let conditions = {
    //Win conditions | ToDo

}

//Pieces attatched to their ascii symbols.
let piece = {
    //black pieces with ascii
    bPawn : '♟',
    bKnight : '♞',
    bBishop : '♝',
    bRook : '♜',
    bQueen : '♛',
    bKing : '♚',

    //white pieces with ascii
    wPawn : '♙',
    wKnight : '♘',
    wBishop : '♗',
    wRook : '♖',
    wQueen : '♕',
    wKing : '♔'
}


//value of the pieces.
let pieceValues = {
    p : 1, //pawn
    k : 3, //knight
    b : 3, //bishop
    r : 5, //rook
    q : 9, //queen
    king : 0 //king - 0 as king taken is impossible
}


//Creating the chessboard using the 2 dimensional array created above.
for (i in board){
    //current row
    let current = board[i]

    //Creating a container div
    let currentRow = document.createElement('div')
    currentRow.setAttribute('id', 'row'+i)
    document.getElementById('board-container').appendChild(currentRow)

    //Looping through each row in array.
    for (q in current){
        if (q % 2 == 0){
            //Creating a square object to push to DOM
            var whiteSquare = document.createElement('div')
            //++ attributes class 'white' and 'square'
            whiteSquare.setAttribute('class', 'white square')
            whiteSquare.setAttribute('id', 'squareId:'+i + ':'+ q)
            whiteSquare.setAttribute('onclick', 'sayHi("white")')
            //loging each piece
            

            //images
            if ( current[q].length != 0){
                console.log('piece: '+current[q])
                console.log(piece[current[q]])
                whiteSquare.textContent = piece[current[q]]
            }else {console.log('Empty square')}
            document.getElementById('row'+i).appendChild(whiteSquare);
        }else{
            var blackSquare = document.createElement('div')
            blackSquare.setAttribute('class', 'black square')
            blackSquare.setAttribute('id', 'squareId:'+i + ':' +q)
            blackSquare.setAttribute('onclick', 'sayHi("black")')
            //loging each piece
            

            //images
            if ( current[q]){
                console.log('piece: '+current[q])
                console.log(piece[current[q]])
                blackSquare.textContent = piece[current[q]]
            }else {console.log('Empty square')}
            document.getElementById('row'+i).appendChild(blackSquare);
        }

    }
}


function sayHi(x){
    if (x == 'black'){
        console.log('black piece')
    }else{
        console.log('white piece')
    }
    
}