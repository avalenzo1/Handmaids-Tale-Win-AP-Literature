// https://artage.io/en/icon-packs/original-windows-95-icons

function init() {
  let startup = new Audio(
    "https://cdn.glitch.global/31f9c0b6-abdb-466e-82fa-6dcaef7dfb1a/startup.mp3?v=1653963878874"
  );

  // startup.play();

  $(".file").draggable({
    containment: "parent",
    snap: "#main",
    snapMode: "inner",
    snapTolerance: 3,
  });

  $(".file").mousedown(function () {
    $(this).focus();
  });
  
  $(".window").bind("contextmenu", function (e) {
    e.preventDefault();
    
    $(".contextmenu").finish().toggle(100).

      // In the right position (the mouse)
      css({
          top: event.pageY + "px",
          left: event.pageX + "px"
      });
  });

  $(function () {
    let mouseDown = false;
    
    $(".selection").hide();

    $(".bg").mousedown(function (e) {
      mouseDown = true;
      $(".selection").show();

      this.clientX = e.clientX - $("#main").offset().left;
      this.clientY = e.clientY - $("#main").offset().top;

      $(".selection").css("left", this.clientX + "px");
      $(".selection").css("top", this.clientY + "px");
    });

    $(".bg").mousemove(function (e) { 
      if (mouseDown) {
        this.clientX = e.clientX - $("#main").offset().left;
        this.clientY = e.clientY - $("#main").offset().top;
        this.selectionX = parseInt($(".selection").css("left"));
        this.selectionY = parseInt($(".selection").css("top"));
        
        
        if (this.clientX - this.selectionX < 0) {
          $(".selection").css("left", this.selectionX - Math.abs(this.clientX - this.selectionX) + "px");
          $(".selection").css("width", Math.abs(this.clientX - this.selectionX) + "px");
        } else {
          $(".selection").css("left", this.selectionX + "px");
          $(".selection").css("width", Math.abs(this.clientX - this.selectionX) + "px");
        }
        
        if (this.clientY - this.selectionY < 0) {
          $(".selection").css("top", this.selectionY - Math.abs(this.clientY - this.selectionY) + "px");
          $(".selection").css("height", Math.abs(this.clientY - this.selectionY) + "px");  
        } else {
          $(".selection").css("top", this.selectionY + "px");
          $(".selection").css("height", Math.abs(this.clientY - this.selectionY) + "px");  
        }
      }
    });

    $(".bg").mouseup(function (e) {
      mouseDown = false;
      
      $(".selection").removeAttr("style");
      $(".selection").hide();
    });
  });
}

$("#main").one("click", function () {
  init();
});
