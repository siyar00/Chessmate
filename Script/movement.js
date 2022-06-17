function WhitePawnMovement(place){
    if(place.charAt(1) == 7){
      const firstPlace = place.charAt(0)+(parseInt(place.charAt(1))-1);
      const secondPlace = place.charAt(0)+(parseInt(place.charAt(1))-2);
      $("div.box").removeClass("drop")
      $("div.box#"+firstPlace).addClass("drop highlight")
      $("div.box#"+secondPlace).addClass("drop highlight")
    } else {
      const firstPlace = place.charAt(0)+(parseInt(place.charAt(1))-1);
      console.log(firstPlace)
      $("div.box").removeClass("drop")
      $("div.box#"+firstPlace).addClass("drop highlight")
    }
}
  
function BlackPawnMove(place){
    if(place.charAt(1) == 2){
      const firstPlace = place.charAt(0)+(parseInt(place.charAt(1))+1);
      const secondPlace = place.charAt(0)+(parseInt(place.charAt(1))+2);
      $("div.box").removeClass("drop")
      $("div.box#"+firstPlace).addClass("drop highlight")
      $("div.box#"+secondPlace).addClass("drop highlight")
    } else {
      const firstPlace = place.charAt(0)+(parseInt(place.charAt(1))+1);
      console.log(firstPlace)
      $("div.box").removeClass("drop")
      $("div.box#"+firstPlace).addClass("drop highlight")
    }
}

function WhiteRookMovement(place){
    if(place.charAt(1) == 7){
      const firstPlace = place.charAt(0)+(parseInt(place.charAt(1))-1);
      const secondPlace = place.charAt(0)+(parseInt(place.charAt(1))-2);
      $("div.box").removeClass("drop")
      $("div.box#"+firstPlace).addClass("drop highlight")
      $("div.box#"+secondPlace).addClass("drop highlight")
    } else {
      const firstPlace = place.charAt(0)+(parseInt(place.charAt(1))-1);
      console.log(firstPlace)
      $("div.box").removeClass("drop")
      $("div.box#"+firstPlace).addClass("drop highlight")
    }
}
  
function BlackRookMovement(place){
    if(place.charAt(1) == 2){
      const firstPlace = place.charAt(0)+(parseInt(place.charAt(1))+1);
      const secondPlace = place.charAt(0)+(parseInt(place.charAt(1))+2);
      $("div.box").removeClass("drop")
      $("div.box#"+firstPlace).addClass("drop highlight")
      $("div.box#"+secondPlace).addClass("drop highlight")
    } else {
      const firstPlace = place.charAt(0)+(parseInt(place.charAt(1))+1);
      console.log(firstPlace)
      $("div.box").removeClass("drop")
      $("div.box#"+firstPlace).addClass("drop highlight")
    }
}

export {BlackPawnMove, WhitePawnMovement, BlackRookMovement, WhiteRookMovement}