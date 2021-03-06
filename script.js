let board = ['-','-','-','-','-','-','-','-','-'] // array representing board

const divBoard = document.querySelector('#board') // element reprenting board
let legend = document.querySelector('legend') // legend used to display turn info and winner
let checkSpaces 
let Spaces = {}
let boardSpaces = {}
let winner
let winningSpace 
//make board
i=1
while (i < 10) { // rendering of board, storing of elements for future reference
    let space = document.createElement('div') 
    space.classList= 'space'
    iStr = 'spc'+String(i)
    space.id = iStr
    space.style.backgroundColor = "whitesmoke"
    divBoard.appendChild(space)
    Spaces[i]=space
    let spaceBtn = document.createElement('button')
    spaceBtn.classList.add= ('space-btn')
    spaceBtn.style.display=('block')
    spaceBtn.style.width=('100%')
    iStr = 'btn'+String(i)
    spaceBtn.id = iStr
    space.appendChild(spaceBtn)
    boardSpaces[i]=spaceBtn
    i++
}

const winningSpaces = {
    'h1': [1,2,3,],
    'h2': [4,5,6],
    'h3': [7,8,9],
    'v1': [1,4,7],
    'v2': [2,5,8],
    'v3': [3,6,9],
    'd1': [1,5,9],
    'd2': [3,5,7]
}

// slices out the spaces for each of the 8 possible winning board spaces with key's denoting 
// type (h1=1st horizontal, d1=1st diagonal) and paints winning spaces once winner assigned

function check(board) {
    let test = board.slice()

    checkSpaces = {
    'h1' : test.slice(0,3),
    'h2' : test.slice(3,6),
    'h3' : test.slice(6,9),
    'v1' : [test.slice(0,1).toString(),test.slice(3,4).toString(),test.slice(6,7).toString()],
    'v2' : [test.slice(1,2).toString(),test.slice(4,5).toString(),test.slice(7,8).toString()],
    'v3' : [test.slice(2,3).toString(),test.slice(5,6).toString(),test.slice(8,9).toString()],
    'd1' : [test.slice(0,1).toString(),test.slice(4,5).toString(),test.slice(8,9).toString()],
    'd2' : [test.slice(2,3).toString(),test.slice(4,5).toString(),test.slice(6,7).toString()]
    }
    for (key in checkSpaces) {
        test = checkSpaces[key].join("")
        x = 'XXX'
        o = 'OOO'

        console.log(test,x,o)
        if (test == x) {
            // alert(key)
            winner = 'X'
            winningSpace = winningSpaces[key]
            winningSpace.forEach(space => {
                Spaces[space].style.backgroundColor = 'whitesmoke'
                Spaces[space].style.color = "red"
            });
            legend.innerText = 'Player X WON!'
            for (key in boardSpaces) {
                boardSpaces[key].remove()   
            }
            // alert(winningSpaces[key])
            
            // winningSpace.forEach(element => {
                
            // });
        } else if (test == o) {
            // alert(key)
            winner = 'O'
            winningSpace = winningSpaces[key]
            winningSpace.forEach(space => {
                Spaces[space].style.backgroundColor = 'whitesmoke'
                Spaces[space].style.color = "red"            });
            legend.innerText = 'Player O WON!'
            for (key in boardSpaces) {
                boardSpaces[key].remove()
                
            }
            
        }
        
    }
    // alert(winner)
    return winner
}

let token // instantiates this variable to be re-assigned during play
let counter = 1 //used to switch players
let tokens = ['O','X']

// makes sure program is listening for button clicks and changes player turn accordingly, as well as runs check function
// to make sure game is finished 
for (key in boardSpaces) {
    let index = key
    let boardSpace = boardSpaces[key]
    let spc = Spaces[key]
    
    boardSpace.addEventListener('click',function() {

        boardSpace.style.display = 'none'
        if (counter % 2 === 0) {
            legend.innerText = 'Player X'
            token = tokens[0]
            spc.innerText = token
            spc.style.fontSize = ('10vh')
            console.log(token)
            console.log(spc)
            let key = Object.keys(Spaces).find(k=>Spaces[k]===spc)
            console.log(key)
            board.splice(key-1,1,token)
            console.log(board)
            winner = check(board)
            console.log(winner)
            if (winner == 'X' || winner == 'O') {
                // alert(winner) 
            }
        
        } else {
            legend.innerText = 'Player O'
            token = tokens[1]
            boardSpace.innerText = token
            spc.style.fontSize = ('10vh')
            spc.innerText = token
            console.log(token)
            console.log(spc)
            let key = Object.keys(Spaces).find(k=>Spaces[k]===spc)
            console.log(key)
            board.splice(key-1,1,token)
            console.log(board)
            winner = check(board)   
            console.log(winner)     
            if (winner == 'X' || winner == 'O') {
                // alert(winner) 
            } 
        } 
    counter++
    })
}

