const chesspieces = new Map([
    ["k", "Images/king-black.png"],
    ["q", "Images/queen-black.png"],
    ["b", "Images/bishop-black.png"],
    ["n", "Images/knight-black.png"],
    ["r", "Images/rook-black.png"],
    ["p", "Images/pawn-black.png"],
    ["K", "Images/king-white.png"],
    ["Q", "Images/queen-white.png"],
    ["B", "Images/bishop-white.png"],
    ["N", "Images/knight-white.png"],
    ["R", "Images/rook-white.png"],
    ["P", "Images/pawn-white.png"],
])

var FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

$(document).ready(function(){
    $("span").draggable({ cursor: "move", cursorAt: { top: 35, left: 35 }});
})

$(document).ready(function fenBoard(){
    let fen = FEN.split(" ");
    let board = fen[0].split("/")
    let i = -1;
    for(const row of board){
        for (const figur of row) {
            i++;
            if(!isNaN(parseInt(figur))){
                i += parseInt(figur) - 1;
                continue; 
            }
            switch(figur){
                case "k": 
                    $("span").eq(i).html('<img src="'+chesspieces.get("k")+'" alt="Black King">')
                    break;
                case "q": 
                    $("span").eq(i).html('<img src="'+chesspieces.get("q")+'" alt="Black Queen">')
                    break;
                case "b": 
                    $("span").eq(i).html('<img src="'+chesspieces.get("b")+'" alt="Black Bishop">')
                    break;
                case "n": 
                    $("span").eq(i).html('<img src="'+chesspieces.get("n")+'" alt="Black Knight">')
                    break;
                case "r": 
                    $("span").eq(i).html('<img src="'+chesspieces.get("r")+'" alt="Black Rook">')
                    break;
                case "p": 
                    $("span").eq(i).html('<img src="'+chesspieces.get("p")+'" alt="Black Pawn">')
                    break;
                case "K": 
                    $("span").eq(i).html('<img src="'+chesspieces.get("K")+'" alt="White King">')
                    break;
                case "Q": 
                    $("span").eq(i).html('<img src="'+chesspieces.get("Q")+'" alt="White Queen">')
                    break;
                case "B": 
                    $("span").eq(i).html('<img src="'+chesspieces.get("B")+'" alt="White Bishop">')
                    break;
                case "N": 
                    $("span").eq(i).html('<img src="'+chesspieces.get("N")+'" alt="White Knight">')
                    break;
                case "R": 
                    $("span").eq(i).html('<img src="'+chesspieces.get("R")+'" alt="White Rook">')
                    break;
                case "P": 
                    $("span").eq(i).html('<img src="'+chesspieces.get("P")+'" alt="White Pawn">')
                    break;    
            }
        }
    }
    console.log(board)
});

