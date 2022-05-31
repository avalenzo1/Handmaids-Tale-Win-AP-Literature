function init() {
  let startup = new Audio("https://cdn.glitch.global/31f9c0b6-abdb-466e-82fa-6dcaef7dfb1a/startup.mp3?v=1653963878874");
  
  startup.play();
  
  $(".file").draggable();
};

$("#main").one("click", function() {
  init();
});