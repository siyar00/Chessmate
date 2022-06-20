function WhitePawnMovement(place){
  const firstPlace = place.charAt(0)+(parseInt(place.charAt(1))-1);
  if($("div.box#"+firstPlace).has("img").length) return;  
  $("div.box#"+firstPlace).addClass("drop highlight")
    if(place.charAt(1) == 7){
      const secondPlace = place.charAt(0)+(parseInt(place.charAt(1))-2);
      if($("div.box#"+secondPlace).has("img").length) return;  
      $("div.box#"+secondPlace).addClass("drop highlight")
    }
}
  
function BlackPawnMove(place){
  const firstPlace = place.charAt(0)+(parseInt(place.charAt(1))+1);
  if($("div.box#"+firstPlace).has("img").length) return;
  $("div.box#"+firstPlace).addClass("drop highlight");
    if(place.charAt(1) == 2){
      const secondPlace = place.charAt(0)+(parseInt(place.charAt(1))+2);
      if($("div.box#"+secondPlace).has("img").length) return;  
      $("div.box#"+secondPlace).addClass("drop highlight")
    }
}

function WhiteRookMovement(place){
  const placeRow = parseInt(place.charAt(1));
  let placeColumn = place.charAt(0);
  let loop = true;
  for (let index = placeRow-1; index > 0 && loop; index--) {
    if($("div.box#"+placeColumn+index+" img").hasClass("white")) break;//Wenn es die eigenen Figuren sind, soll er aufhören
    if($("div.box#"+placeColumn+index+" img").hasClass("black")) loop = false;//Wenn es eine Gegnerische Figur ist, soll er nur auf ihn draufgehen
    $("div.box#"+placeColumn+index).addClass("drop highlight")    
  }//für die positive Y-Achse
  loop= true;
  for (let index = placeRow+1; index <= 8 && loop; index++) {
    if($("div.box#"+placeColumn+index+" img").hasClass("white")) break;//Siehe oben
    if($("div.box#"+placeColumn+index+" img").hasClass("black")) loop = false;//Siehe oben
    $("div.box#"+placeColumn+index).addClass("drop highlight")    
  }//für die negative Y-Achse
  loop = true;
  placeColumn = place.charCodeAt(0)
  for (let index = placeColumn-1; index >= 97 && loop; index--) {
    if($("div.box#"+String.fromCharCode(index)+placeRow+" img").hasClass("white")) break;//Wenn es die eigenen Figuren sind, soll er aufhören
    if($("div.box#"+String.fromCharCode(index)+placeRow+" img").hasClass("black")) loop = false;//Wenn es eine Gegnerische Figur ist, soll er nur auf ihn draufgehen
    $("div.box#"+String.fromCharCode(index)+placeRow).addClass("drop highlight")    
  }//für die linke X-Achse
  loop = true;
  for (let index = placeColumn+1; index <= 104 && loop; index++) {
    if($("div.box#"+String.fromCharCode(index)+placeRow+" img").hasClass("white")) break;//Siehe oben
    if($("div.box#"+String.fromCharCode(index)+placeRow+" img").hasClass("black")) loop = false;//Siehe oben
    $("div.box#"+String.fromCharCode(index)+placeRow).addClass("drop highlight")    
  }//für die rechte X-Achse
}
  
function BlackRookMovement(place){
  const placeRow = parseInt(place.charAt(1));
  let placeColumn = place.charAt(0);
  let loop = true;
  for (let index = placeRow-1; index > 0 && loop; index--) {
    if($("div.box#"+placeColumn+index+" img").hasClass("black")) break;//Siehe WhiteRookMovement
    if($("div.box#"+placeColumn+index+" img").hasClass("white")) loop = false;//Siehe WhiteRookMovement
    $("div.box#"+placeColumn+index).addClass("drop highlight")    
  }
  loop = true;
  for (let index = placeRow+1; index <= 8 && loop; index++) {
    if($("div.box#"+placeColumn+index+" img").hasClass("black")) break;//Siehe WhiteRookMovement
    if($("div.box#"+placeColumn+index+" img").hasClass("white")) loop = false;//Siehe WhiteRookMovement
    $("div.box#"+placeColumn+index).addClass("drop highlight")    
  }
  loop = true
  placeColumn = place.charCodeAt(0)
  for (let index = placeColumn - 1; index >= 97 && loop; index--) {
    if($("div.box#"+String.fromCharCode(index)+placeRow+" img").hasClass("black")) break;//Wenn es die eigenen Figuren sind, soll er aufhören
    if($("div.box#"+String.fromCharCode(index)+placeRow+" img").hasClass("white")) loop = false;//Wenn es eine Gegnerische Figur ist, soll er nur auf ihn draufgehen
    $("div.box#"+String.fromCharCode(index)+placeRow).addClass("drop highlight")    
  }
  loop= true;
  for (let index = placeColumn+1; index <= 104 && loop; index++) {
    if($("div.box#"+String.fromCharCode(index)+placeRow+" img").hasClass("black")) break;//Siehe oben
    if($("div.box#"+String.fromCharCode(index)+placeRow+" img").hasClass("white")) loop = false;//Siehe oben
    $("div.box#"+String.fromCharCode(index)+placeRow).addClass("drop highlight")    
  }
}

function WhiteBishopMovement(place){
  const placeRow = parseInt(place.charAt(1));
  let placeColumn = place.charCodeAt(0);
  let loop = true;
  for (let index = placeRow-1; index > 0 && loop; index--) {
    placeColumn--;
    if(placeColumn == 96) break;
    if($("div.box#"+String.fromCharCode(placeColumn)+index+" img").hasClass("white")) break;//Siehe WhiteRookMovement
    if($("div.box#"+String.fromCharCode(placeColumn)+index+" img").hasClass("black")) loop = false;//Siehe WhiteRookMovement
    $("div.box#"+String.fromCharCode(placeColumn)+index).addClass("drop highlight")
  }
  loop = true;
  placeColumn = place.charCodeAt(0)
  for (let index = placeRow-1; index > 0 && loop; index--) {
    placeColumn++;
    if(placeColumn == 105) break;
    if($("div.box#"+String.fromCharCode(placeColumn)+index+" img").hasClass("white")) break;//Siehe WhiteRookMovement
    if($("div.box#"+String.fromCharCode(placeColumn)+index+" img").hasClass("black")) loop = false;//Siehe WhiteRookMovement
    $("div.box#"+String.fromCharCode(placeColumn)+index).addClass("drop highlight")
  }
  loop = true;
  placeColumn = place.charCodeAt(0)
  for (let index = placeRow+1; index <= 8 && loop; index++) {
    placeColumn++;
    if(placeColumn == 105) break;
    if($("div.box#"+String.fromCharCode(placeColumn)+index+" img").hasClass("white")) break;//Siehe WhiteRookMovement
    if($("div.box#"+String.fromCharCode(placeColumn)+index+" img").hasClass("black")) loop = false;//Siehe WhiteRookMovement
    $("div.box#"+String.fromCharCode(placeColumn)+index).addClass("drop highlight")    
  }
  loop = true;
  placeColumn = place.charCodeAt(0)
  for (let index = placeRow+1; index <= 8 && loop; index++) {
    placeColumn--;
    if(placeColumn == 96) break;
    if($("div.box#"+String.fromCharCode(placeColumn)+index+" img").hasClass("white")) break;//Siehe WhiteRookMovement
    if($("div.box#"+String.fromCharCode(placeColumn)+index+" img").hasClass("black")) loop = false;//Siehe WhiteRookMovement
    $("div.box#"+String.fromCharCode(placeColumn)+index).addClass("drop highlight")    
  }
}

function BlackBishopMovement(place){
  const placeRow = parseInt(place.charAt(1));
  let placeColumn = place.charCodeAt(0);
  let loop = true;
  for (let index = placeRow-1; index > 0 && loop; index--) {
    placeColumn--;
    if(placeColumn == 96) break;
    if($("div.box#"+String.fromCharCode(placeColumn)+index+" img").hasClass("black")) break;//Siehe WhiteRookMovement
    if($("div.box#"+String.fromCharCode(placeColumn)+index+" img").hasClass("white")) loop = false;//Siehe WhiteRookMovement
    $("div.box#"+String.fromCharCode(placeColumn)+index).addClass("drop highlight")
  }
  loop = true;
  placeColumn = place.charCodeAt(0)
  for (let index = placeRow-1; index > 0 && loop; index--) {
    placeColumn++;
    if(placeColumn == 105) break;
    if($("div.box#"+String.fromCharCode(placeColumn)+index+" img").hasClass("black")) break;//Siehe WhiteRookMovement
    if($("div.box#"+String.fromCharCode(placeColumn)+index+" img").hasClass("white")) loop = false;//Siehe WhiteRookMovement
    $("div.box#"+String.fromCharCode(placeColumn)+index).addClass("drop highlight")
  }
  loop = true;
  placeColumn = place.charCodeAt(0)
  for (let index = placeRow+1; index <= 8 && loop; index++) {
    placeColumn++;
    if(placeColumn == 105) break;
    if($("div.box#"+String.fromCharCode(placeColumn)+index+" img").hasClass("black")) break;//Siehe WhiteRookMovement
    if($("div.box#"+String.fromCharCode(placeColumn)+index+" img").hasClass("white")) loop = false;//Siehe WhiteRookMovement
    $("div.box#"+String.fromCharCode(placeColumn)+index).addClass("drop highlight")    
  }
  loop = true;
  placeColumn = place.charCodeAt(0)
  for (let index = placeRow+1; index <= 8 && loop; index++) {
    placeColumn--;
    if(placeColumn == 96) break;
    if($("div.box#"+String.fromCharCode(placeColumn)+index+" img").hasClass("black")) break;//Siehe WhiteRookMovement
    if($("div.box#"+String.fromCharCode(placeColumn)+index+" img").hasClass("white")) loop = false;//Siehe WhiteRookMovement
    $("div.box#"+String.fromCharCode(placeColumn)+index).addClass("drop highlight") 
  }
}

function WhiteQueenMovement(place){
  WhiteRookMovement(place);
  WhiteBishopMovement(place);
}

function BlackQueenMovement(place){
  BlackRookMovement(place);
  BlackBishopMovement(place);
}

function WhiteKingMovement(place){
  const placeRow = parseInt(place.charAt(1));
  const placeColumn = place.charCodeAt(0);
  for (let index = -1; index < 2; index++) {
    if(placeRow - index == 0 || placeRow - index == 9) continue;
    for (let j = -1; j < 2; j++) {
      if(placeColumn - j == 96 || placeColumn - j == 105) continue;
      if($("div.box#"+String.fromCharCode(placeColumn - j)+(placeRow - index)+" img").hasClass("white")) continue;
      $("div.box#"+String.fromCharCode(placeColumn - j)+(placeRow - index)).addClass("drop highlight") 
    }
  }
}

function BlackKingMovement(place){
  const placeRow = parseInt(place.charAt(1));
  const placeColumn = place.charCodeAt(0);
  for (let index = -1; index < 2; index++) {
    if(placeRow - index == 0 || placeRow - index == 9) continue;
    for (let j = -1; j < 2; j++) {
      if(placeColumn - j == 96 || placeColumn - j == 105) continue;
      if($("div.box#"+String.fromCharCode(placeColumn - j)+(placeRow - index)+" img").hasClass("black")) continue;
      $("div.box#"+String.fromCharCode(placeColumn - j)+(placeRow - index)).addClass("drop highlight") 
    }
  }
}

function WhiteKnightMovement(place){
  const placeRow = parseInt(place.charAt(1));
  let placeColumn = place.charCodeAt(0);
  for (let index = -2; index < 3; index++) {
    if(placeRow + index <= 0 || placeRow + index >= 9 || index == 0) continue;
    let loop = true;
    if (index == -2 || index == 2) {
      if(placeColumn - 1 == 96) loop = false;
      if(loop){
        if($("div.box#"+String.fromCharCode(placeColumn - 1)+(placeRow + index)+" img").hasClass("white")) loop = false;
        else $("div.box#"+String.fromCharCode(placeColumn - 1)+(placeRow + index)).addClass("drop highlight")
      } 
      loop = true;
      if(placeColumn + 1 == 105) loop = false;
      if(loop){
        if($("div.box#"+String.fromCharCode(placeColumn + 1)+(placeRow + index)+" img").hasClass("white")) loop = false;
        else $("div.box#"+String.fromCharCode(placeColumn + 1)+(placeRow + index)).addClass("drop highlight")
      } 
    } else if (index == -1 || index == 1) {
      if(placeColumn - 2 == 96) loop = false;
      if(loop){
        if($("div.box#"+String.fromCharCode(placeColumn - 2)+(placeRow + index)+" img").hasClass("white")) loop = false;
        else $("div.box#"+String.fromCharCode(placeColumn - 2)+(placeRow + index)).addClass("drop highlight")
      } 
      loop = true;
      if(placeColumn + 2 == 105) loop = false; 
      if(loop){
        if($("div.box#"+String.fromCharCode(placeColumn + 2)+(placeRow + index)+" img").hasClass("white")) loop = false;
        else $("div.box#"+String.fromCharCode(placeColumn + 2)+(placeRow + index)).addClass("drop highlight")
      } 
    }
  }
}

function BlackKnightMovement(place){
  const placeRow = parseInt(place.charAt(1));
  let placeColumn = place.charCodeAt(0);
  for (let index = -2; index < 3; index++) {
    if(placeRow + index <= 0 || placeRow + index >= 9 || index == 0) continue;
    let loop = true;
    if (index == -2 || index == 2) {
      if(placeColumn - 1 == 96) loop = false;
      if(loop){
        if($("div.box#"+String.fromCharCode(placeColumn - 1)+(placeRow + index)+" img").hasClass("black")) loop = false;
        else $("div.box#"+String.fromCharCode(placeColumn - 1)+(placeRow + index)).addClass("drop highlight")
      } 
      loop = true;
      if(placeColumn + 1 == 105) loop = false;
      if(loop){
        if($("div.box#"+String.fromCharCode(placeColumn + 1)+(placeRow + index)+" img").hasClass("black")) loop = false;
        else $("div.box#"+String.fromCharCode(placeColumn + 1)+(placeRow + index)).addClass("drop highlight")
      } 
    } else if (index == -1 || index == 1) {
      if(placeColumn - 2 == 96) loop = false;
      if(loop){
        if($("div.box#"+String.fromCharCode(placeColumn - 2)+(placeRow + index)+" img").hasClass("black")) loop = false;
        else $("div.box#"+String.fromCharCode(placeColumn - 2)+(placeRow + index)).addClass("drop highlight")
      } 
      loop = true;
      if(placeColumn + 2 == 105) loop = false; 
      if(loop){
        if($("div.box#"+String.fromCharCode(placeColumn + 2)+(placeRow + index)+" img").hasClass("black")) loop = false;
        else $("div.box#"+String.fromCharCode(placeColumn + 2)+(placeRow + index)).addClass("drop highlight")
      } 
    }
  }
}

export {BlackPawnMove, WhitePawnMovement, BlackRookMovement, WhiteRookMovement, WhiteBishopMovement,
BlackBishopMovement, WhiteQueenMovement, BlackQueenMovement, WhiteKingMovement, BlackKingMovement,
WhiteKnightMovement, BlackKnightMovement}