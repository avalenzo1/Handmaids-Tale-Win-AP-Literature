// https://artage.io/en/icon-packs/original-windows-95-icons

function init() {
  let startup = new Audio("https://cdn.glitch.global/31f9c0b6-abdb-466e-82fa-6dcaef7dfb1a/startup.mp3?v=1653963878874")
  
  // startup.play();
  
  $(".file").draggable({
        containment: 'parent',
        snap: "#main", snapMode: "inner",
        snapTolerance: 3       
    });
  
  $(".file").mousedown(function() {
    $(this).focus();
  });
  
  $(".window").mousedown(function(e) {
    $(".selection").show();
    $(".selection").css("top", e.clientY - $("#main").offset().top + 'px');
    $(".selection").css("left", e.clientX - $("#main").offset().left + 'px');
  });
  
  $(".window").mousemove(function(e) {
    this.clientX = 
    $(".selection").css("width", e.clientY - $("#main").offset().top - $("main").css("top") + 'px');
    $(".selection").css("height", e.clientX - $("#main").offset().left - $("main").css("left") + 'px');
  });
  
  $(".window").mouseup(function(e) {
    $(".selection").hide();
  });
};

$("#main").one("click", function() {
  init();
});