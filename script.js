//creating board.
let boardContainer = document.getElementById('board-container')

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
                    square.setAttribute('onclick', 'clickPiece(this)')
                    square.setAttribute('id', String(i) + String(q))
                    square.textContent = piece[row[q]]
                    rowDom.appendChild(square)
                }else{
                    //else we put the black square on the DOM.
                    square.textContent = piece[row[q]]
                    square.setAttribute('class', 'square white')
                    square.setAttribute('onclick', 'clickPiece(this)')
                    square.setAttribute('id', String(i) + String(q))
                    rowDom.appendChild(square)

                }

            //cehcking if row index is even,
            }else{
                if (q % 2 == 0){
                    //then we put the white square on the DOM.
                    square.setAttribute('class', 'square white')
                    square.setAttribute('onclick', 'clickPiece(this)')
                    square.setAttribute('id', String(i) + String(q))
                    square.textContent = piece[row[q]]
                    rowDom.appendChild(square)
                }else{
                    //else we put the black square on the DOM.
                    square.setAttribute('class', 'square black')
                    square.setAttribute('onclick', 'clickPiece(this)')
                    square.setAttribute('id', String(i) + String(q))
                    square.textContent = piece[row[q]]
                    rowDom.appendChild(square)

                }
            }              
        }
    }
}


function clickPiece(x){


    //if the square is currently taken by a piece
    if (x.innerHTML != ''){
    
        var pieceSelected = true
        console.log('piece: '+x.innerHTML, 'taken: '+pieceSelected)
        //assinging pos variable
        let pos = x.id
        console.log('Array position: '+pos)

        //storing selected coords as selected piece
        let selectedPiece = board[pos[0]][pos[1]]

        //id is formated to YX. 0 is y, 1 is x. hence they are used to access co ords.
        console.log(board[pos[0]][pos[1]])
        
        console.log('value: ' +values[board[pos[0]][pos[1]]])

        let pieceInfo = document.getElementById('pieceInfo')

        pieceInfo.innerHTML = selectedPiece + ' value: ' +values[board[pos[0]][pos[1]]] +'. array pos: '+pos 

    //if the square is NOT taken by a piece
    }else{
        var pieceSelected = false
        console.log('empty square')
        console.log('piece: '+x.innerHTML, 'taken: '+pieceSelected)
        //assinging pos variable
        let pos = x.id
        console.log('Array position: '+pos)


    }
   
}

//updating pieces on the board
function updateBoard(){
    


}


function findValues(){
    let whiteValues = 0;
    let blackValues = 0;
    for (let i = 0; i <board.length; i++){
    
        let thisRow = board[i]
        for (let q = 0; q < thisRow.length; q++){
            let current = thisRow[q]
            if (current.length != 0 && current[0][0] == 'w'){
                whiteValues = whiteValues + Number(values[current])
            }
            else if (current.length != 0 && current[0][0] == 'b'){
                blackValues = blackValues + Number(values[current])
            }
            
            
        }
    
    }
    let totalH1 = document.getElementById('score')
    total = whiteValues - blackValues
    if (total < 0){
        total = total * -1
        totalH1.innerHTML = 'Score: ' +total
        totalH1.style.color = 'black'
    }else{
        totalH1.innerHTML = 'Score: ' +total
        totalH1.style.color = 'white'
    }
    
}


findValues()


updateBoard()



createBoard()