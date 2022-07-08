window.onscroll = function() {scrollstick()};
let menu = document.querySelector("#menu");

let scrollStick = menu.offsetTop;

function scrollstick() {
  if (window.pageYOffset > scrollStick) {
    menu.classList.add("scrollstick")
    

  } else {
    menu.classList.remove("scrollstick")
  }
} 