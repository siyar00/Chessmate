function WhitePawnMovement(place){
    if(place.charAt(1) == 7){
      const firstPlace = place.charAt(0)+(parseInt(place.charAt(1))-1);
      const secondPlace = place.charAt(0)+(parseInt(place.charAt(1))-2);
      $("div.box#"+firstPlace).addClass("drop highlight")
      $("div.box#"+secondPlace).addClass("drop highlight")
    } else {
      const firstPlace = place.charAt(0)+(parseInt(place.charAt(1))-1);
      $("div.box#"+firstPlace).addClass("drop highlight")
    }
}
  
function BlackPawnMove(place){
  const firstPlace = place.charAt(0)+(parseInt(place.charAt(1))+1);
    if(place.charAt(1) == 2){
      const secondPlace = place.charAt(0)+(parseInt(place.charAt(1))+2);
      $("div.box#"+firstPlace).addClass("drop highlight")
      $("div.box#"+secondPlace).addClass("drop highlight")
    } else {
      $("div.box#"+firstPlace).addClass("drop highlight")
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
  placeColumn = place.charCodeAt(0)
  for (let index = placeColumn-1; index >= 97 && loop; index--) {
    if($("div.box#"+String.fromCharCode(index)+placeRow+" img").hasClass("white")) break;//Wenn es die eigenen Figuren sind, soll er aufhören
    if($("div.box#"+String.fromCharCode(index)+placeRow+" img").hasClass("black")) loop = false;//Wenn es eine Gegnerische Figur ist, soll er nur auf ihn draufgehen
    $("div.box#"+String.fromCharCode(index)+placeRow).addClass("drop highlight")    
  }//für die linke X-Achse
  loop= true;
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

export {BlackPawnMove, WhitePawnMovement, BlackRookMovement, WhiteRookMovement, WhiteBishopMovement,
BlackBishopMovement, WhiteQueenMovement, BlackQueenMovement}