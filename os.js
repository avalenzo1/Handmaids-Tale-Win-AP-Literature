class Window {
  constructor() {
    // https://docs.microsoft.com/en-us/windows/win32/winmsg/about-windows
    this.application;
    this.title = $("");

    this.window = $(`
      <div class="window-prompt">
      <div class="title-bar">${this.title}
        <div class="window-options">
          <button class="btn">_</button>
          <button class="btn">O</button>
          <button class="btn">X</button>
        </div>
      </div>
      <div class="menu-bar">
        <button class="btn">
          Hello
        </button>
      </div>
      <div class="client-area">client area</div>
    </div>
    `);

    $(this.window).appendTo(".window").draggable({
      containment: "parent",
      snap: ".window",
      snapMode: "inner",
      snapTolerance: 3,
    });
  }

  setApplication(appName) {
    this.application = appName;
  }
}

function main() {
  $(".window .taskbar").show();
  $(".window .file").show();

  $(".file").draggable({
    containment: "parent",
    snap: ".window",
    snapMode: "inner",
    snapTolerance: 3,
  });

  $(".file").mousedown(function () {
    $(this).focus();
  });

  $(".file").dblclick(function () {
    new Window().app($(this).attr("app"));
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

      $(".selection").height(
        Math.abs(parseInt(this.clientY) - parseInt($(".selection").css("top")))
      );
      $(".selection").width(
        Math.abs(parseInt(this.clientX) - parseInt($(".selection").css("left")))
      );

      if (parseInt(this.clientY) < startY) {
        $(".selection").css({
          top: this.clientY,
        });
        $(".selection").height(Math.abs(parseInt(this.clientY) - startY));
      }
      if (parseInt(this.clientX) < startX) {
        $(".selection").css({
          left: this.clientX,
        });
        $(".selection").width(Math.abs(parseInt(this.clientX) - startX));
      }
    }

    $(".desktop::before").mousedown(function (e) {
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
