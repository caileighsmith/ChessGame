//creating board.
let boardContainer = document.getElementById('board-container')

var takenPieces = []


//var moveFx = document.getElementById("myAudio"); 

var moveFx = new Audio('sounds/move.mp3');
var taken = new Audio('sounds/taken.mp3');



//Turn based system
//White is always first. Meaning that if we count first go as 0, white will have every even go. Black will always be able to go on odd moves.
let currentTurn = 0;



//board array instantiating
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
                    square.setAttribute('onmouseover','cursorChange(this)')
                    square.textContent = piece[row[q]]
                    rowDom.appendChild(square)
                }else{
                    //else we put the black square on the DOM.
                    square.textContent = piece[row[q]]
                    square.setAttribute('class', 'square white')
                    square.setAttribute('onclick', 'point(this)')
                    square.setAttribute('onmouseover','cursorChange(this)')
                    square.setAttribute('id', String(i) + String(q))
                    rowDom.appendChild(square)

                }

            //cehcking if row index is even,
            }else{
                if (q % 2 == 0){
                    //then we put the white square on the DOM.
                    square.setAttribute('class', 'square white')
                    square.setAttribute('onclick', 'point(this)')
                    square.setAttribute('onmouseover','cursorChange(this)')

                    square.setAttribute('id', String(i) + String(q))
                    square.textContent = piece[row[q]]
                    rowDom.appendChild(square)
                }else{
                    //else we put the black square on the DOM.
                    square.setAttribute('class', 'square black')
                    square.setAttribute('onclick', 'point(this)')
                    square.setAttribute('onmouseover','cursorChange(this)')

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
var allowedKnightMovements = []
var allowedPawnMoves = []
var allowedRookMoves = []
var allowedBishopMoves = []
var allowedQueenMoves = []
var allowedKingMoves = []

var correctSideMoving = false

var allowedToMove = false
function point(x){
    allowedToMove = false

    if (selectedTF == false){

        

        //if there is a piece 
        if (x.innerHTML != ''){

            x.style.cursor = 'pointer'
            if (currentTurn % 2 == 0){
                console.log('white turn')
                if (x.innerHTML == '♙' || x.innerHTML == '♘' || x.innerHTML == '♗' || x.innerHTML == '♖' || x.innerHTML == '♕' || x.innerHTML == '♔'){
                    correctSideMoving = true
                    selectedTF = true
          
                    
                }

            }else{
                console.log('black turn ')
                
                if (x.innerHTML == '♟' || x.innerHTML == '♞' || x.innerHTML == '♝' || x.innerHTML == '♜' || x.innerHTML == '♛' || x.innerHTML == '♚' ){
                    correctSideMoving = true
                    selectedTF = true
                    
                }

            }

            if (correctSideMoving == true){

                selectedChessPiece = x
                console.log(selectedChessPiece.id)

                var piecePos = [Number(x.id[0]), Number(x.id[1])]

                //if its a knight,  these are the allowed pos's. no pathfinding yet.
                if (selectedChessPiece.innerHTML == '♘' || selectedChessPiece.innerHTML == '♞'){
                    allowedKnightMovements = knightMovement(piecePos)
                }

                //checking if pawn (black and white)
                if (selectedChessPiece.innerHTML == '♟'){
                    allowedPawnMoves = pawnMovement(piecePos, 'black')
                }
                if (selectedChessPiece.innerHTML == '♙'){
                    allowedPawnMoves = pawnMovement(piecePos, 'white')
                }

                //checking if rook
                if (selectedChessPiece.innerHTML == '♜' || selectedChessPiece.innerHTML == '♖'){
                    allowedRookMoves = rookMovement(piecePos)
                    
                }

                if (selectedChessPiece.innerHTML == '♝' || selectedChessPiece.innerHTML == '♗'){
                    allowedBishopMoves = bishopMovement(piecePos)
                    console.log('bishop')
                }

                if (selectedChessPiece.innerHTML == '♕' || selectedChessPiece.innerHTML == '♛'){
                    allowedQueenMoves = queenMovement(piecePos)
                }

                if (selectedChessPiece.innerHTML == '♔' || selectedChessPiece.innerHTML == '♚'){
                    allowedKingMoves = kingMovement(piecePos)
                }

            
                
            


        }
        
    }
            
    //this means if the current piece has been selected:    
    }else if (selectedTF & selectedChessPiece != x){

        //make sure u cant eat your own sided pieces.
        //loop through and check if it is black or white moving.
        if (currentTurn % 2 == 0){
            //whites turn
            if (x.innerHTML != '♙' && x.innerHTML != '♘' && x.innerHTML != '♗' && x.innerHTML != '♖' && x.innerHTML != '♕' &&x.innerHTML != '♔'){
                
                //check if we are taking over a piece
                if (x.innerHTML == '♟' || x.innerHTML == '♞' || x.innerHTML == '♝' || x.innerHTML == '♜' || x.innerHTML == '♛' || x.innerHTML == '♚' ){
                    //code for if a piece is being captured
                    console.log('black piece captured')
                    takenPieces.push(x.innerHTML)
                    console.log(takenPieces)
                    document.getElementById('black-taken').innerHTML += x.innerHTML

                }
                
                //calling the function above for all types of pieces.
                allowMove(allowedKnightMovements)
                allowMove(allowedPawnMoves)
                allowMove(allowedRookMoves)
                allowMove(allowedBishopMoves)
                allowMove(allowedQueenMoves)
                allowMove(allowedKingMoves)
            }
            else{
                selectedTF = false
            }
        }else{
            //black's turn
            if (x.innerHTML != '♟' && x.innerHTML != '♞' && x.innerHTML != '♝' && x.innerHTML != '♜' && x.innerHTML != '♛' && x.innerHTML != '♚' ){
                
                //check if we are taking over a piece
                if (x.innerHTML == '♙' || x.innerHTML == '♘' || x.innerHTML == '♗' || x.innerHTML == '♖' || x.innerHTML == '♕' || x.innerHTML == '♔'){
                    //code for if a piece is being captured
                    console.log('white piece captured')
                    takenPieces.push(x.innerHTML)
                    console.log(takenPieces)
                    document.getElementById('taken-list').innerHTML += x.innerHTML
                    
                }
                allowMove(allowedKnightMovements)
                allowMove(allowedPawnMoves)
                allowMove(allowedRookMoves)
                allowMove(allowedBishopMoves)
                allowMove(allowedQueenMoves)
                allowMove(allowedKingMoves)
            }
            else{
                selectedTF = false
            }
        }   


        console.log('TARGET PIECE:' +x.innerHTML)
        //this function allows moves to work by checking if the moved to position is a legal pos.
        function allowMove(array){
            if (array != []){
                //logging for debugs.
                console.log([Number(x.id[0]),Number(x.id[1])])
                for (item in array){
                    console.log(array[item])
                    if (String(array[item]) == String([Number(x.id[0]),Number(x.id[1])])){
                        console.log('item', array[item])
                        allowedToMove = true
                        break
                    }
                    selectedTF = false
                }
            } 
        }

        

        

        //if the move is permitted. (remove this if statemnt in order to allow pieces to work if not knight)
        if (allowedToMove == true){

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
            currentTurn = currentTurn + 1

            //Now that we have incremented current turn. If the turn is divisble by 2, update html to say whites turn, else, blacks turn.
            if (currentTurn % 2 == 0){
                document.getElementById('turn').innerHTML = "White's turn."
            }else{
                document.getElementById('turn').innerHTML = "Black's turn."

            }

            checkPoints()
        }
        

        //Checking if piece is taken
        
        
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
        scoreDom.innerHTML = 'neutral'
    }

}








//MISC functions

function cursorChange(x){
    if (x.innerHTML != ''){
        x.style.cursor = 'pointer'
    }
}






//get Key from object value function
function geyKey(object, value) {
    return String(Object.keys(object).find(key => object[key] === value));
}


function musicToggle(){
    let music = document.getElementById('music')
    let button = document.getElementById('musicBtn')
    
    if (music.style.display == 'none'){
        music.style.display = 'flex'
        button.innerHTML = 'Close music options'
    }else{
        music.style.display = 'none'
        button.innerHTML = 'Music options'
    }
    

    
}


function podcastToggle(){
    let podcast = document.getElementById('podcast')
    let podcastBtn = document.getElementById('podcastBtn')

    if (podcast.style.display == 'none'){
        podcast.style.display = 'flex'
        podcastBtn.innerHTML = 'Close podcast options'
    }else{
        podcast.style.display = 'none'
        podcastBtn.innerHTML = 'Podcast options'
    }
}

//chess piece MOVES below


//knight movement function. Current pos should be an array pos. Example: knightMovement(currentPos[0,1]).
function knightMovement(currentPos){
    
    let positions = []

    //These are coordinate transformations. Knight can transform by any of these.
    let moves = [
        
        [-2,+1],
        [-1,+2],  
        
        [-2,-1],  
        [-1,-2],  
        
        [+1,+2],  
        [+2,+1],  
        
        [+2,-1],  
        [-1,-2], 
        [+1,-2]      
    ]


     
    for (item in moves){
        positions.push([(moves[item][0]+currentPos[0]), (moves[item][1]+currentPos[1])])
    }  
    //returns array of all possible positions the knight can move to when called.
    console.log(positions)
    return positions
}

//pawns
function pawnMovement(currentPos, type){

    let positions = []

    

    if (type == 'black'){
        //moves for pawn. Transformations on the array.
        let moves = [
            [+1,0]
        ]

        //check if pawn is on first move by checking if the white index is 1 (second row)
        if (currentPos[0] == 1){
            moves.push([+2,0])
        }

        for (item in moves){
            positions.push([(moves[item][0]+currentPos[0]), (moves[item][1]+currentPos[1])])
        }  
        console.log(positions)
        return positions
        
    }else if (type == 'white'){
        //moves for pawn. Transformations on the array.
        let moves = [

            [-1,0]
        ]

        //check if pawn is on first move by checking if the black index is 6 (7th row)
        if (currentPos[0] == 6){
            moves.push([-2,0])
        }

        for (item in moves){
            positions.push([(moves[item][0]+currentPos[0]), (moves[item][1]+currentPos[1])])
        }  
        console.log(positions)
        return positions

    }
}

//rook movement
function rookMovement(currentPos){

    let positions = []

    //moves. Transformations (yet again!)
    let moves = [
    ]

    //loops until 7. 7 is the maximum index for x and y axis on the board. pushes to moves array.
    for (let i = 0; i <8; i++){
        moves.push([+i,0])
        moves.push([-i,0])
        moves.push([0,+i])
        moves.push([0,-i])
    }

    for (item in moves){
        positions.push([(moves[item][0]+currentPos[0]), (moves[item][1]+currentPos[1])])

    }  

    return positions
}

function settings(){
    if (document.getElementById('settings')){
        document.getElementById('settings').remove()
    }else{
        let settingDom = document.createElement('div')
        settingDom.setAttribute('id', 'settings')
        settingDom.innerHTML = 'Light side: '
        settingDom.style.fontSize = '20px'
        
        let inputC = document.createElement('input')
        inputC.setAttribute('id', 'lightColor')
        inputC.setAttribute('type', 'color')

        
        settingDom.appendChild(inputC)


        document.getElementById('settings-container').appendChild(settingDom)

    }
    
}



//Bishop moves
function bishopMovement(currentPos){
    let positions = []

    let moves = [
        [+1,+1],
        [+2,+2],
        [+3,+3],
        [+4,+4],
        [+5,+5],
        [+6,+6],
        [+7,+7],

        [+1,-1],
        [+2,-2],
        [+3,-3],
        [+4,-4],
        [+5,-5],
        [+6,-6],
        [+7,-7],

        [-1,-1],
        [-2,-2],
        [-3,-3],
        [-4,-4],
        [-5,-5],
        [-6,-6],
        [-7,-7],
        
        [-1,+1],
        [-2,+2],
        [-3,+3],
        [-4,+4],
        [-5,+5],
        [-6,+6],
        [-7,+7]
        

    ]

    
   

    for (item in moves){
        positions.push([(moves[item][0]+currentPos[0]), (moves[item][1]+currentPos[1])])

    }



    return positions
}

//queen moves
function queenMovement(currentPos){
    let positions = []

    //first bit (here) is the same as bishop. Bishop moves:
    let moves = [
        [+1,+1],
        [+2,+2],
        [+3,+3],
        [+4,+4],
        [+5,+5],
        [+6,+6],
        [+7,+7],

        [+1,-1],
        [+2,-2],
        [+3,-3],
        [+4,-4],
        [+5,-5],
        [+6,-6],
        [+7,-7],

        [-1,-1],
        [-2,-2],
        [-3,-3],
        [-4,-4],
        [-5,-5],
        [-6,-6],
        [-7,-7],
        
        [-1,+1],
        [-2,+2],
        [-3,+3],
        [-4,+4],
        [-5,+5],
        [-6,+6],
        [-7,+7]
        

    ]

    //rook moves.
    for (let i = 0; i <8; i++){
        moves.push([+i,0])
        moves.push([-i,0])
        moves.push([0,+i])
        moves.push([0,-i])
    }
    for (item in moves){
        positions.push([(moves[item][0]+currentPos[0]), (moves[item][1]+currentPos[1])])

    }


    return positions
}

//king
function kingMovement(currentPos){
    let positions = []
    let moves = [
        [+1,0],
        [-1,0],
        [0,+1],
        [0,-1],
        //diag moves
        [+1,+1],
        [-1,-1],
        [+1,-1],
        [-1,+1]
    ]  
    for (item in moves){
        positions.push([(moves[item][0]+currentPos[0]), (moves[item][1]+currentPos[1])])

    }

    return positions
}



//capturing pieces logic



createBoard()
checkPoints()
let blackTaken = document.createElement('h1')
blackTaken.setAttribute('id', 'black-taken')

document.getElementById('board-container').appendChild(blackTaken)