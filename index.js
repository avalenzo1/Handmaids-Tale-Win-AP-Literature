// https://artage.io/en/icon-packs/original-windows-95-icons

(function( $ ){
   $.fn.getBoundingClientRect = function() {
      return $(this)[0].getBoundingClientRect();
   }; 
})( jQuery );

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
    // https://stackoverflow.com/a/20471268 SRC

    $(".window").contextmenu(function (e) {
      e.preventDefault();

      $(".context-menu")
        .show()
        .css({
          top: e.clientY - $(this).getBoundingClientRect().top + "px",
          left: e.clientX - $(this).getBoundingClientRect().left + "px",
        });
    });

    $("*[use-context-menu]").bind("mousedown", function (e) {
      if (!$(e.target).parents(".context-menu").length > 0) {
        $(".context-menu").hide();
      }
    });

    $(".context-menu li").click(function () {
      $(".context-menu").hide();
    });
  });

  $(function () {
    let mouseDown = false;

    $(".selection").hide();

    $(".desktop").mousedown(function (e) {
      e.stopImmediatePropagation();
      
      mouseDown = true;
      $(".selection").show();

      this.clientX = e.clientX - $("#main").getBoundingClientRect().left;
      this.clientY = e.clientY - $("#main").getBoundingClientRect().top;

      $(".selection").css("left", this.clientX + "px");
      $(".selection").css("top", this.clientY + "px");
    });

    $(".desktop").mousemove(function (e) {
      if (mouseDown) {
        this.clientX = e.clientX - $("#main").getBoundingClientRect().left;
        this.clientY = e.clientY - $("#main").getBoundingClientRect().top;
        this.selectionX = parseInt($(".selection").css("left"));
        this.selectionY = parseInt($(".selection").css("top"));

        if (this.clientX - this.selectionX < 0) {
          $(".selection").css({
            left: this.selectionX - Math.abs(this.clientX - this.selectionX) + "px",
            width: this.clientX - this.selectionX) + "px"
          });
        } else {
          $(".selection").css({
            left: this.selectionX + "px",
            width: this.clientX - this.selectionX) + "px"
          });
        }

        if (this.clientY - this.selectionY < 0) {
          $(".selection").css({
            top: this.selectionY - Math.abs(this.clientY - this.selectionY) + "px",
            height: this.selectionY - this.clientY + "px"
        });
        } else {
          $(".selection").css({top: this.selectionY + "px", height: this.clientY - this.selectionY + "px"});
        }
      }
    });

    $(".desktop").mouseup(function (e) {
      mouseDown = false;

      $(".selection").removeAttr("style");
      $(".selection").hide();
    });
  });
}

$("#main").one("click", function () {
  init();
});
