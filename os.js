function kernelPanic() {
  alert("error!")
}

class Window {
  constructor(title) {
    // https://docs.microsoft.com/en-us/windows/win32/winmsg/about-windows
    this.application;
    this.title = title;
    this.windowIsMaximized = false;
    this.uniqueID = 'id-' + Math.random().toString(16).slice(2); // https://stackoverflow.com/a/19842865/16557976
    $(".taskbar .programs").append(`<button class="btn" program-id="${this.uniqueID}">${this.title}</button>`);

    this.window = $(`
      <div id="${this.uniqueID}" class="window-prompt" tabindex="0">
        <div class="title-bar">
          <div class="title-text">
            ${this.title}
          </div>
          <div class="window-options">
            <button class="btn btn-minimize"><img width="12" src="https://cdn.glitch.global/31f9c0b6-abdb-466e-82fa-6dcaef7dfb1a/min.png?v=1654311841858"></button>
            <button class="btn btn-maximize"><img width="12" src="https://cdn.glitch.global/31f9c0b6-abdb-466e-82fa-6dcaef7dfb1a/max-0.png?v=1654311627118"></button>
            <button class="btn btn-close"><img width="12" src="https://cdn.glitch.global/31f9c0b6-abdb-466e-82fa-6dcaef7dfb1a/close.png?v=1654311100560"></button>
          </div>
        </div>
        <div class="menu-bar">
          <button class="btn">
            Options
          </button>
        </div>
        <div class="client-area"></div>
      </div>
    `);

    $(this.window).appendTo(".window").draggable({
      containment: "parent",
      handle: ".title-bar",
      snap: ".window",
      snapMode: "inner",
      snapTolerance: 3,
    }); // resizable();
    
    let window = this;

    $(`#${this.uniqueID} .btn-minimize`).click(function() {
      window.minimizeWindow();
    });

    $(`#${this.uniqueID} .btn-maximize`).click(function() {
      window.maximizeWindow();
    });

    $(`#${this.uniqueID} .btn-close`).click(function() {
      window.closeWindow();
    });
    
    $(`.taskbar .programs .btn[program-id="${this.uniqueID}"]`).click(function() {
      $(`#${window.uniqueID}`).toggle();
    });
  }

  initApp(packageURL) {
    this.packageURL = packageURL;
    let uniqueID = this.uniqueID;
    
    $.ajax({
      type: "GET",
      url: this.packageURL,
      dataType: "html",
      success: function(res) {
        $(`#${uniqueID} .client-area`).html(res);
      },
      error: function() {
        alert("error")
      }
    });
  }

  minimizeWindow() {
    $(this.window).toggle();
  }

  maximizeWindow() {
    if (this.windowIsMaximized) {
      $(this.window).removeClass("full-view");
      $(`#${this.uniqueID} .btn-maximize img`).attr("src", "https://cdn.glitch.global/31f9c0b6-abdb-466e-82fa-6dcaef7dfb1a/max-0.png?v=1654312027307")
    } else {
      $(this.window).addClass("full-view");
      $(`#${this.uniqueID} .btn-maximize img`).attr("src", "https://cdn.glitch.global/31f9c0b6-abdb-466e-82fa-6dcaef7dfb1a/max-1.png?v=1654311627118")
    }

    this.windowIsMaximized = !this.windowIsMaximized;
  }
  
  closeWindow() {
    $(this.window).remove();
    $(`.taskbar .programs .btn[program-id="${this.uniqueID}"]`).remove();
  }
}

$(".window-prompt").click(function() {
  console.log("Sdf")
  $(".window-prompt").removeClass("active");
  $(this).addClass("active");
});

function main() {
  $(".window .taskbar").show();
  $(".window .file").show();

  $(".file").draggable({
    containment: "parent",
    snap: ".window",
    snapMode: "inner",
    snapTolerance: 3,
  })

  $(".file").mousedown(function () {
    $(this).focus();
  });

  $(".file").click(function (e) {
    $(".file");
    new Window(`${$(this).attr("file-name")} - ${$(this).attr("app")}`)
      .initApp($(this).attr("file-url"));
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

    $("*[use-context-menu]").mousedown(function (e) {
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
    // code below is modified from someone else.

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

    $(".bg").mousedown(function (e) {
      $(".selection").show();

      this.clientX = e.clientX - $("#main").getBoundingClientRect().left;
      this.clientY = e.clientY - $("#main").getBoundingClientRect().top;

      startX = this.clientX;
      startY = this.clientY;

      $(".selection").css("left", this.clientX + "px");
      $(".selection").css("top", this.clientY + "px");

      $(".window").on("mousemove", selectionBox);
    });

    $(".bg").mouseup(function (e) {
      $(".window").off("mousemove", selectionBox);

      $(".selection").removeAttr("style");
      $(".selection").hide();
    });
  });
}


function changeTime() {
  $("#time").text(moment().format('hh:mm a')); 
}


changeTime();
setInterval(changeTime, 1000 * 60);