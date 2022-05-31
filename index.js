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

  $(function () {
    let mouseDown = false;

    $(".window").mousedown(function (e) {
      mouseDown = true;
      $(".selection").show();

      this.clientX = e.clientX - $("#main").offset().left;
      this.clientY = e.clientY - $("#main").offset().top;

      $(".selection").css("left", this.clientX + "px");
      $(".selection").css("top", this.clientY + "px");
    });

    $(".window").mousemove(function (e) { 
      if (mouseDown) {
        this.clientX = e.clientX - $("#main").offset().left;
        this.clientY = e.clientY - $("#main").offset().top;
        this.selectionX = parseInt($(".selection").css("left"));
        this.selectionY = parseInt($(".selection").css("top"));
        
        
        if (this.clientX - this.selectionX < 0) {
           
        }
        
        $(".selection").css("width", Math.abs(this.clientX - this.selectionX) + "px");
        $(".selection").css("height", Math.abs(this.clientY - this.selectionY) + "px");
      }
    });

    $(".window").mouseup(function (e) {
      mouseDown = false;

      $(".selection").hide();
      $(".selection").css("top", 0);
      $(".selection").css("left", 0);
      $(".selection").css("width", 0);
      $(".selection").css("height", 0);
    });
  });
}

$("#main").one("click", function () {
  init();
});
