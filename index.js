// https://artage.io/en/icon-packs/original-windows-95-icons

(function ($) {
  $.fn.getBoundingClientRect = function () {
    return $(this)[0].getBoundingClientRect();
  };
})(jQuery);

function init() {
  let startup = new Audio(
    "https://cdn.glitch.global/31f9c0b6-abdb-466e-82fa-6dcaef7dfb1a/startup.mp3?v=1653963878874"
  );

  startup.play();

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
    // https://stackoverflow.com/a/30985975/16557976 THANK YOU!!!!!!!!!!!!
    
    let startX = 0;
    let startY = 0;
    
    function selectionBox(e) {
        this.clientX = e.clientX - $("#main").getBoundingClientRect().left;
        this.clientY = e.clientY - $("#main").getBoundingClientRect().top;
        this.selectionX = parseInt($(".selection").css("left"));
        this.selectionY = parseInt($(".selection").css("top"));

        $(".selection").css({
          width: this.clientX - this.selectionX + "px",
          height: this.clientY - this.selectionY + "px",
        });
        
          $(".selection").height(Math.abs(parseInt(this.clientY) - parseInt($(".selection").css("top"))));
          $(".selection").width(Math.abs(parseInt(this.clientX) - parseInt($(".selection").css("left"))));


          if (parseInt(this.clientY) < startY) {
            $(".selection").css({
              "top": this.clientY
            });
            $(".selection").height(Math.abs(parseInt(this.clientY) - startY));
          }
          if (parseInt(this.clientX) < startX) {
            $(".selection").css({
              "left": this.clientX
            });
            $(".selection").width(Math.abs(parseInt(this.clientX) - startX));
          }
    }

    $(".desktop").mousedown(function (e) {
      e.stopImmediatePropagation();
      
      $(".selection").show();

      this.clientX = e.clientX - $("#main").getBoundingClientRect().left;
      this.clientY = e.clientY - $("#main").getBoundingClientRect().top;
      
      startX = this.clientX;
      startY = this.clientY;

      $(".selection").css("left", this.clientX + "px");
      $(".selection").css("top", this.clientY + "px");
      
      $(this).on("mousemove", selectionBox);
    });

    $(".desktop").mouseup(function (e) {
      $(this).off("mousemove", selectionBox);
      
      $(".selection").removeAttr("style");
      $(".selection").hide();
    });
  });
}

$(".dos").one("keyup", function () {
  init();
});
