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

//board has not been created
let boardCreated = false


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
    bPawn : '1',
    bKnight : '3',
    bBishop : '3',
    bRook : '5',
    bQueen : '9',
    bKing : '0',

    wPawn : '1',
    wKnight : '3',
    wBishop : '3',
    wRook : '5',
    wQueen : '9',
    wKing : '0'

}



//Creating the chessboard using the 2 dimensional array created above.
if (boardCreated == false){
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

                //Displaying the piece
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
}


for (let i = 0; i <board.length; i++){
    let thisRow = board[i]
    for (let q = 0; q < thisRow.length; q++){
        console.log(thisRow[q])
    }

}

