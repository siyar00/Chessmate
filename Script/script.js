import {
  BlackPawnMovement,
  WhitePawnMovement,
  BlackRookMovement,
  WhiteRookMovement,
  BlackBishopMovement,
  WhiteBishopMovement,
  WhiteQueenMovement,
  BlackQueenMovement,
  WhiteKingMovement,
  BlackKingMovement,
  WhiteKnightMovement,
  BlackKnightMovement,
} from "./movement.js";

// var FEN = "rnbqkbnr/pppppppp/11111111/11111111/11111111/11111111/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
var FEN = "r111k11r/1pppppp1/11111111/11111111/11111111/11111111/1PPPPPP1/R111K11R w KQkq - 0 1";
//Speichere die FEN in die Datenbank immer wieder rein für den jeweiligen User
//Beim Remis eine bessere UI machen
//Rochade schauen, dass man bei einem verlorenen Turm, der König keine Rochade spielen kann.

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
]);

function addFigureToRow(row, column, figure) {
  let tempFigures = row.split("");
  tempFigures[rows.get(column)] = figure;
  row = tempFigures.join("");
  return row;
}

function deleteMovedFigure(row, column) {
  let tempFigures = row.split("");
  tempFigures[rows.get(column)] = 1;
  row = tempFigures.join("");
  return row;
}

var fenBoard;
$(document).ready(
  (fenBoard = () => {
    for (const i in $("div.box")) {
      $("div.box").eq(i).html('<div class="dragdrop"></div>');
      $("div.box").eq(i).addClass("drop");
      $("div.box")
        .eq(i)
        .children()
        .draggable({
          revert: true,
          placeholder: false,
          droptarget: "div.drop",
          drop: async function (evt, droptarget) {
            $(".highlight").removeClass("highlight");
            $(this).appendTo(droptarget).draggable();
            let fen = FEN.split(" ");
            let board = fen[0].split("/");
            const row = parseInt(droptarget.id.charAt(1));
            const column = droptarget.id.charAt(0).toString();
            const rowLast = parseInt(droptarget.lastChild.id.charAt(1));
            const columnLast = droptarget.lastChild.id.charAt(0).toString();
            var figure = this.children().attr("id");
            {
              let zuege = parseInt(fen[5]);
              if (figure == "P" || figure == "p") zuege = 0;
              if (zuege == 100) {
                alert("Unentschieden! Das Spiel endet!")
                $(".drop").removeClass("drop");
                $(".dragdrop").draggable("destroy");
                return;
              }
              fen[5] = zuege + 1;
            } // Halbzüge zählen

            {
              if (figure == "p" && droptarget.id == fen[3]) {
                $("div#" + column + (row - 1) + " img").remove();
                board[row - 2] = deleteMovedFigure(board[row - 2], column); //Löschen der geschlagenen Figur im FEN
              }//En-Passent schwarz
              if (figure == "P" && droptarget.id == fen[3]) {
                $("div#" + column + (row + 1) + " img").remove();
                board[row] = deleteMovedFigure(board[row], column); //Löschen der geschlagenen Figur im FEN
              }//En-Passent weiß 
              fen[3] = "-";
            }// En-Passent

            if (fen[2] != "-") {
              if(droptarget.firstChild.firstChild != null){
                const destroyFigure = droptarget.firstChild.firstChild.id
                if(destroyFigure == "r"  && (droptarget.id == "a1" || droptarget.id == "h1")){
                  fen[2] = BlackRookRochade(fen[2], droptarget.id)
                } else if(destroyFigure == "R"  && (droptarget.id == "a8" || droptarget.id == "h8")){
                  fen[2] = WhiteRookRochade(fen[2], droptarget.id)
                }
              }
              

              if (figure == "K") {
                fen[2] = WhiteKingRochade(fen[2]);
                if (droptarget.id == "c8") {
                  board[row - 1] = addFigureToRow(board[row - 1], "d", "R");
                  board[rowLast - 1] = deleteMovedFigure(
                    board[rowLast - 1],
                    "a"
                  );
                } else if (droptarget.id == "g8") {
                  board[row - 1] = addFigureToRow(board[row - 1], "f", "R");
                  board[rowLast - 1] = deleteMovedFigure(
                    board[rowLast - 1],
                    "h"
                  );
                }
              } else if (figure == "k") {
                fen[2] = BlackKingRochade(fen[2]);
                if (droptarget.id == "c1") {
                  board[row - 1] = addFigureToRow(board[row - 1], "d", "r");
                  board[rowLast - 1] = deleteMovedFigure(
                    board[rowLast - 1],
                    "a"
                  );
                } else if (droptarget.id == "g1") {
                  board[row - 1] = addFigureToRow(board[row - 1], "f", "r");
                  board[rowLast - 1] = deleteMovedFigure(
                    board[rowLast - 1],
                    "h"
                  );
                }
              }
              else if (figure == "R")
                fen[2] = WhiteRookRochade(fen[2], droptarget.lastChild.id);
              else if (figure == "r")
                fen[2] = BlackRookRochade(fen[2], droptarget.lastChild.id);
            } //Rochaden Bewegung des Turmes

            if (figure == "P" && row == 5) fen[3] = column + 6;
            if (figure == "p" && row == 4) fen[3] = column + 3;

            {
              if(figure == "P" && row == 1){
                figure = await modal(0);
                board[row - 1] = addFigureToRow(board[row - 1], column, figure); //Hinzufügen der Figur in der neuen Reihe im FEN
                board[rowLast - 1] = deleteMovedFigure(board[rowLast - 1], columnLast);
              } else if(figure == "p" && row == 8){
                figure = await modal(1);
                board[row - 1] = addFigureToRow(board[row - 1], column, figure); //Hinzufügen der Figur in der neuen Reihe im FEN
                board[rowLast - 1] = deleteMovedFigure(board[rowLast - 1], columnLast);
              } else {
                board[row - 1] = addFigureToRow(board[row - 1], column, figure); //Hinzufügen der Figur in der neuen Reihe im FEN
                board[rowLast - 1] = deleteMovedFigure(board[rowLast - 1], columnLast); //Löschen der bewegten Figur im FEN
              } 
            } // Allgemeine Figurenplatzänderung und Bauernverwandlung

            fen[0] = board.join("/");
            FEN = fen.join(" ");
            if (fen[1] == "w")  FEN = FEN.replace("w", "s");
            else  FEN = FEN.replace("s", "w");
            console.log(FEN);
            fenBoard();
            
            // if(fen[1] == "w") CheckmateBlack();
            // else CheckmateWhite()
          },
        });
    }

    let fen = FEN.split(" ");
    let board = fen[0].split("/");
    let i = -1;
    $("div.box img").remove();
    for (const row of board) {
      for (const figur of row) {
        i++;
        if (!isNaN(parseInt(figur))) {
          i += parseInt(figur) - 1;
          continue;
        }
        $("div.box").eq(i).removeClass("drop");
        $("div.box div").eq(i).attr("id", $("div.box").eq(i).attr("id"));
        switch (figur) {
          case "k":
            $("div.box div").eq(i).html('<img id="k" class="black" src="' +
                  chesspieces.get("k") +'" alt="Black King">');
            break;
          case "q":
            $("div.box div").eq(i).html('<img id="q" class="black" src="' +
                  chesspieces.get("q") +'" alt="Black Queen">');
            break;
          case "b":
            $("div.box div").eq(i).html('<img id="b" class="black" src="' +
                  chesspieces.get("b") +'" alt="Black Bishop">');
            break;
          case "n":
            $("div.box div").eq(i).html('<img id="n" class="black" src="' +
                  chesspieces.get("n") +'" alt="Black Knight">');
            break;
          case "r":
            $("div.box div").eq(i).html('<img id="r" class="black" src="' +
                  chesspieces.get("r") +'" alt="Black Rook">');
            break;
          case "p":
            $("div.box div").eq(i).html('<img id="p" class="black" src="' +
                  chesspieces.get("p") +'" alt="Black Pawn">');
            break;
          case "K":
            $("div.box div").eq(i).html('<img id="K" class="white" src="' +
                  chesspieces.get("K") +'" alt="White King">');
            break;
          case "Q":
            $("div.box div").eq(i).html('<img id="Q" class="white" src="' +
                  chesspieces.get("Q") +'" alt="White Queen">');
            break;
          case "B":
            $("div.box div").eq(i).html('<img id="B" class="white" src="' +
                  chesspieces.get("B") +'" alt="White Bishop">');
            break;
          case "N":
            $("div.box div").eq(i).html('<img id="N" class="white" src="' +
                  chesspieces.get("N") +'" alt="White Knight">');
            break;
          case "R":
            $("div.box div").eq(i).html('<img id="R" class="white" src="' +
                  chesspieces.get("R") +'" alt="White Rook">');
            break;
          case "P":
            $("div.box div").eq(i).html('<img id="P" class="white" src="' +
                  chesspieces.get("P") +'" alt="White Pawn">');
            break;
        }
      }
    }

    if (fen[1] == "w") {
      $("img.black").parent().unbind();
    } else {
      $("img.white").parent().unbind();
    }
  })
); // "Main"

function figureMovement(figure, place) {
  $("div.highlight").removeClass("highlight");
  $("div.box").removeClass("drop");
  switch (figure) {
    case "k":
      BlackKingMovement(place, FEN);
      break;
    case "q":
      BlackQueenMovement(place);
      break;
    case "b":
      BlackBishopMovement(place);
      break;
    case "n":
      BlackKnightMovement(place);
      break;
    case "r":
      FEN = BlackRookMovement(place, FEN);
      break;
    case "p":
      FEN = BlackPawnMovement(place, FEN);
      break;
    case "K":
      WhiteKingMovement(place, FEN);
      break;
    case "Q":
      WhiteQueenMovement(place);
      break;
    case "B":
      WhiteBishopMovement(place);
      break;
    case "N":
      WhiteKnightMovement(place);
      break;
    case "R":
      FEN = WhiteRookMovement(place, FEN);
      break;
    case "P":
      FEN = WhitePawnMovement(place, FEN);
      break;
  }
}

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

$(document).ready(() => {
  $("#btn").click(function () {
    FEN =
      "rnbqkbnr/pppppppp/11111111/11111111/11111111/11111111/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    $("div.highlight").removeClass("highlight");
    fenBoard();
  });
});

// $(document).ready(function() {
//   $(".chess-table").on("contextmenu", function(e) {
//       return false;
//     });
// }) //Damit Rechtsklicken nicht auf dem Schachbrett funktioniert

function WhiteKingRochade(fenRochade) {
  if (fenRochade.match(/Q/) != null && fenRochade.match(/K/) != null) {
    fenRochade = fenRochade.replace(/Q/, "");
    fenRochade = fenRochade.replace(/K/, "");
  } else if (fenRochade.match(/Q/) != null)
    fenRochade = fenRochade.replace(/Q/, "");
  else if (fenRochade.match(/K/) != null)
    fenRochade = fenRochade.replace(/K/, "");
  if (fenRochade.length == 0) return "-";
  else return fenRochade;
}

function BlackKingRochade(fenRochade) {
  if (fenRochade.match(/q/) != null && fenRochade.match(/k/) != null) {
    fenRochade = fenRochade.replace(/q/, "");
    fenRochade = fenRochade.replace(/k/, "");
  } else if (fenRochade.match(/q/) != null)
    fenRochade = fenRochade.replace(/q/, "");
  else if (fenRochade.match(/k/) != null)
    fenRochade = fenRochade.replace(/k/, "");
  if (fenRochade.length == 0) return "-";
  else return fenRochade;
}

function WhiteRookRochade(fenRochade, id) {
  if (id == "a8" && fenRochade.match(/Q/) != null) {
    fenRochade = fenRochade.replace(/Q/, "");
  } else if (id == "h8" && fenRochade.match(/K/) != null) {
    fenRochade = fenRochade.replace(/K/, "");
  }
  if (fenRochade.length == 0) return "-";
  else return fenRochade;
}

function BlackRookRochade(fenRochade, id) {
  if (id == "a1" && fenRochade.match(/q/) != null) {
    fenRochade = fenRochade.replace(/q/, "");
  } else if (id == "h1" && fenRochade.match(/k/) != null) {
    fenRochade = fenRochade.replace(/k/, "");
  }
  if (fenRochade.length == 0) return "-";
  else return fenRochade;
}

function modal(color) {
  $("div.modal-body").children().remove()
  if(color){
    $("div.modal-body").append(
    '<img id="q" class="black chess-modal" src="' + chesspieces.get("q") +'" alt="Black Queen">'+
    '<img id="b" class="black chess-modal" src="' + chesspieces.get("b") +'" alt="Black Bishop">'+
    '<img id="n" class="black chess-modal" src="' + chesspieces.get("n") +'" alt="Black Knight">'+
    '<img id="r" class="black chess-modal" src="' + chesspieces.get("r") +'" alt="Black Rook">');
  } else {
    $("div.modal-body").append(
    '<img id="Q" class="white chess-modal" src="' + chesspieces.get("Q") +'" alt="White Queen">'+
    '<img id="B" class="white chess-modal" src="' + chesspieces.get("B") +'" alt="White Bishop">'+
    '<img id="N" class="white chess-modal" src="' + chesspieces.get("N") +'" alt="White Knight">'+
    '<img id="R" class="white chess-modal" src="' + chesspieces.get("R") +'" alt="White Rook">');
  }

  return new Promise((resolve, reject) => {
    // Get the modal
    var modal = document.getElementById("myModal");
    // Open the modal
    modal.style.display = "block";
    // Close modal            
    document.querySelectorAll(".chess-modal").forEach( element => {
        element.addEventListener("click", function(evt){
        modal.style.display = "none";
        resolve(evt.target.id)
      })
    })
    
  })
}

function CheckmateWhite(){
  $("img#p").each((index, element) => BlackPawnMovement($(element).parent().attr("id"), FEN, true))
  $("img#n").each((index, element) => BlackKnightMovement($(element).parent().attr("id"), true))
  $("img#b").each((index, element) => BlackBishopMovement($(element).parent().attr("id"), true))
  $("img#r").each((index, element) => BlackRookMovement($(element).parent().attr("id"), FEN, true))
  BlackQueenMovement($("#q").parent().attr("id"), true)

  if($("div.box.threat img").hasClass("black")){
    if($("div.KingCheck").hasClass("highlight"))


    $("div.box.threat img").each((index, figure) => {
      switch($(figure).attr("id")){
        case "q":
          BlackQueenMovement($("#q").parent().attr("id"))
          break;
        case "b":
          BlackBishopMovement(place);
          break;
        case "n":
          BlackKnightMovement(place);
          break;
        case "r":
          FEN = BlackRookMovement(place, FEN);
          break;
        case "p":
          FEN = BlackPawnMovement(place, FEN);
          break;
    }
  }) 
}
  $("div.box").removeClass("highlight drop");
}

function CheckmateBlack(){
  WhiteQueenMovement($("#Q").parent().attr("id"), true)
  $("img#N").each((index, element) => WhiteKnightMovement($(element).parent().attr("id"), true))
  $("img#B").each((index, element) => WhiteBishopMovement($(element).parent().attr("id"), true))
  $("img#R").each((index, element) => WhiteRookMovement($(element).parent().attr("id"), FEN, true))
  $("img#P").each((index, element) => WhitePawnMovement($(element).parent().attr("id"), FEN, true))

  if($("div.box.threat img").hasClass("white")){
    console.log("Check Black")
  } 
  $("div.box").removeClass("highlight drop");
}

export { fenBoard, figureMovement, FEN };
