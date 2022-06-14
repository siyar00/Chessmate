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

var FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

$(document).ready(function fenBoard() {
  let fen = FEN.split(" ");
  let board = fen[0].split("/");
  let i = -1;
  for (const row of board) {
    for (const figur of row) {
      i++;
      if (!isNaN(parseInt(figur))) {
        i += parseInt(figur) - 1;
        continue;
      }
      switch (figur) {
        case "k":
          $("div.box div").eq(i).html('<img src="' + chesspieces.get("k") + '" alt="Black King">');
          break;
        case "q":
          $("div.box div").eq(i).html('<img src="' + chesspieces.get("q") + '" alt="Black Queen">');
          break;
        case "b":
          $("div.box div").eq(i).html('<img src="' + chesspieces.get("b") + '" alt="Black Bishop">');
          break;
        case "n":
          $("div.box div").eq(i).html('<img src="' + chesspieces.get("n") + '" alt="Black Knight">');
          break;
        case "r":
          $("div.box div").eq(i).html('<img src="' + chesspieces.get("r") + '" alt="Black Rook">');
          break;
        case "p":
          $("div.box div").eq(i).html('<img src="' + chesspieces.get("p") + '" alt="Black Pawn">');
          break;
        case "K":
          $("div.box div").eq(i).html('<img src="' + chesspieces.get("K") + '" alt="White King">');
          break;
        case "Q":
          $("div.box div").eq(i).html('<img src="' + chesspieces.get("Q") + '" alt="White Queen">');
          break;
        case "B":
          $("div.box div").eq(i).html('<img src="' + chesspieces.get("B") + '" alt="White Bishop">');
          break;
        case "N":
          $("div.box div").eq(i).html('<img src="' + chesspieces.get("N") + '" alt="White Knight">');
          break;
        case "R":
          $("div.box div").eq(i).html('<img src="' + chesspieces.get("R") + '" alt="White Rook">');
          break;
        case "P":
          $("div.box div").eq(i).html('<img src="' + chesspieces.get("P") + '" alt="White Pawn">');
          break;
      }
    }
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
      console.log($(this).children())
    },
  });
});
