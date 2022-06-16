//Speichere die FEN in die Datenbank immer wieder rein für den jeweiligen User
//Newgame Button, sodass der FEN sich wieder normalisiert 
String.prototype.replaceAt = function(index, replacement) {
  return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

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
]);

const rows = new Map([
  ["a", 0],
  ["b", 1],
  ["c", 2],
  ["d", 3],
  ["e", 4],
  ["f", 5],
  ["g", 6],
  ["h", 7],
])

var FEN = "rnbqkbnr/pppppppp/11111111/11111111/11111111/11111111/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
var mousedown;

function addFigureToRow(row, column, figure){
  let tempFigures = row.split("")
  tempFigures[rows.get(column)] = figure;
  row = tempFigures.join("");
  return row;
}

function deleteMovedFigure(row, column){
  let tempFigures = row.split("")
  tempFigures[rows.get(column)] = 1;
  row = tempFigures.join("");
  return row;
}

var fenBoard;
$(document).ready(fenBoard = () => {
  for (const i in $("div.box")) {
    $("div.box").eq(i).html('<div class="dragdrop"></div>')
    $("div.box").eq(i).addClass("drop");
    $("div.box").eq(i).children().draggable({
      revert: true,
      placeholder: false,
      droptarget: "div.drop",
      drop: function (evt, droptarget) {
        $(this).appendTo(droptarget).draggable();
        let fen = FEN.split(" ");
        let board = fen[0].split("/");
        let row = parseInt(evt.target.id.charAt(1))
        let column = evt.target.id.charAt(0).toString();
        var figure = this.children().attr("id");
        board[row-1] = addFigureToRow(board[row-1], column, figure);//Ändern der Figur in der Reihe, wenn es bewegt wird
        
        row = parseInt(evt.target.lastChild.id.charAt(1))
        column = evt.target.lastChild.id.charAt(0).toString();
        board[row-1] = deleteMovedFigure(board[row-1], column)

        fen[0] = board.join("/")
        FEN = fen.join(" ")
        if(fen[1] == "w") FEN = FEN.replace("w", "s")
        else FEN = FEN.replace("s", "w")
        fenBoard()
      }})
  }

  let fen = FEN.split(" ");
  let board = fen[0].split("/");
  let i = -1;
  $("img").remove()
  for (const row of board) {
    for (const figur of row) {
      i++;
      if (!isNaN(parseInt(figur))) {
        i += parseInt(figur) - 1;
        continue;
      }
      $("div.box").eq(i).removeClass("drop")
      $("div.box div").eq(i).attr("id", $("div.box").eq(i).attr("id"))
      switch (figur) {
        case "k":
          $("div.box div").eq(i).html('<img id="k" class="black" src="' + chesspieces.get("k") + '" alt="Black King">');
          break;
        case "q":
          $("div.box div").eq(i).html('<img id="q" class="black" src="' + chesspieces.get("q") + '" alt="Black Queen">');
          break;
        case "b":
          $("div.box div").eq(i).html('<img id="b" class="black" src="' + chesspieces.get("b") + '" alt="Black Bishop">');
          break;
        case "n":
          $("div.box div").eq(i).html('<img id="n" class="black" src="' + chesspieces.get("n") + '" alt="Black Knight">');
          break;
        case "r":
          $("div.box div").eq(i).html('<img id="r" class="black" src="' + chesspieces.get("r") + '" alt="Black Rook">');
          break;
        case "p":
          $("div.box div").eq(i).html('<img id="p" class="black" src="' + chesspieces.get("p") + '" alt="Black Pawn">');
          break;
        case "K":
          $("div.box div").eq(i).html('<img id="K" class="white" src="' + chesspieces.get("K") + '" alt="White King">');
          break;
        case "Q":
          $("div.box div").eq(i).html('<img id="Q" class="white" src="' + chesspieces.get("Q") + '" alt="White Queen">');
          break;
        case "B":
          $("div.box div").eq(i).html('<img id="B" class="white" src="' + chesspieces.get("B") + '" alt="White Bishop">');
          break;
        case "N":
          $("div.box div").eq(i).html('<img id="N" class="white" src="' + chesspieces.get("N") + '" alt="White Knight">');
          break;
        case "R":
          $("div.box div").eq(i).html('<img id="R" class="white" src="' + chesspieces.get("R") + '" alt="White Rook">');
          break;
        case "P":
          $("div.box div").eq(i).html('<img id="P" class="white" src="' + chesspieces.get("P") + '" alt="White Pawn">');
          break;
      }
    }
  }

  if(fen[1] == "w"){
    $("img.black").parent().unbind()
  } else {
    $("img.white").parent().unbind()
  }
  console.log(board);
});

$(document).ready(function () {
  $(".draggables").draggable({ delegate: "button", placeholder: true });
  $(".draghandle").draggable({ handle: ".handle", placeholder: true });
  $(".dragdrop").draggable({
    revert: true,
    placeholder: false,
    droptarget: "div.drop",
    drop: function (evt, droptarget) {
      $(this).appendTo(droptarget).draggable();
    },
  });
});


$(function () {
  $(document).mousedown(".dragdrop", function(event) {
    console.log(1)
    console.log(event.target.id, event.target.parentElement.id, event);
    // console.log(event.currentTarget.lastChild.firstChild)
  })
  $(document).on("mouseup", "img", function(event) {
    console.log("j");
    // console.log(event.currentTarget.lastChild.firstChild)
  })
})

$(document).ready(()=>{
  $("button").click(function(){
    FEN = "rnbqkbnr/pppppppp/11111111/11111111/11111111/11111111/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    fenBoard();
  }) 
})

// $(document).ready(function() {
//   $(".chess-table").on("contextmenu", function(e) {
//       return false;
//     });
// });//Damit Rechtsklicken nicht auf dem Schachbrett funktioniert
