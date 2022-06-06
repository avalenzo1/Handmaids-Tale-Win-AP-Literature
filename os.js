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
            <button class="btn btn-minimize"><img width="12" height="12" src="https://cdn.glitch.global/31f9c0b6-abdb-466e-82fa-6dcaef7dfb1a/min.png?v=1654311841858"></button>
            <button class="btn btn-maximize"><img width="12" height="12" src="https://cdn.glitch.global/31f9c0b6-abdb-466e-82fa-6dcaef7dfb1a/max-0.png?v=1654311627118"></button>
            <button class="btn btn-close"><img width="12" height="12" src="https://cdn.glitch.global/31f9c0b6-abdb-466e-82fa-6dcaef7dfb1a/close.png?v=1654311100560"></button>
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
      handle: ".title-text",
      snap: ".window",
      snapMode: "inner",
      snapTolerance: 3,
    }); // resizable();
    
    let window = this;
    
    window.focusWindow();

    $(`#${this.uniqueID} .btn-minimize`).click(function() {
      window.minimizeWindow();
    });

    $(`#${this.uniqueID} .btn-maximize`).click(function() {
      window.maximizeWindow();
    });

    $(`#${this.uniqueID} .btn-close`).click(function() {
      window.closeWindow();
    });
    
    $(`.taskbar .programs .btn[program-id="${this.uniqueID}"]:not(.active)`).click(function() {
      $(`#${window.uniqueID}`).toggle();
      window.focusWindow();
    });
    
    $(this.window).click(function() {
      window.focusWindow();
    });
  }

  initApp(packageURL) {
    $(this.window).hide();
    $(".window").addClass("cursor-progress");
    
    this.packageURL = packageURL;
    let uniqueID = this.uniqueID;
    let window = this;
    
    $.ajax({
      type: "GET",
      url: this.packageURL,
      dataType: "html",
      success: function(res) {
        $(`#${uniqueID} .client-area`).html(res);
        $(".window").removeClass("cursor-progress");
        $(window.window).show();
      },
      error: function() {
        new WindowAlert("Error", "File was not found");
        
        window.closeWindow();
        $(".window").removeClass("cursor-progress");
      }
    });
  }
  
  hideFromTaskBar() {
    $(`.taskbar .programs .btn[program-id="${this.uniqueID}"]`).hide();
  }
  
  disableResize() {
    $(this.window).addClass("no-resize");
  }
  
  enableResize() {
    $(this.window).removeClass("no-resize");
  }
  
  focusWindow() {
    $(".window-prompt").removeClass("active");
    $(this.window).addClass("active");
    
    $(".taskbar .programs .btn").removeClass("btn-inset active")
    $(`.taskbar .programs .btn[program-id="${this.uniqueID}"]`).addClass("btn-inset active")
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
      // $(`#${this.uniqueID} .client-area`).removeAttr("style");
      $(`#${this.uniqueID} .btn-maximize img`).attr("src", "https://cdn.glitch.global/31f9c0b6-abdb-466e-82fa-6dcaef7dfb1a/max-1.png?v=1654311627118")
    }

    this.windowIsMaximized = !this.windowIsMaximized;
  }
  
  closeWindow() {
    $(this.window).remove();
    $(`.taskbar .programs .btn[program-id="${this.uniqueID}"]`).remove();
  }
}

class WindowAlert extends Window {
  constructor(title, message) {
    super(title)
    
    this.hideFromTaskBar();
    this.disableResize();
    
    $(this.window).find(".client-area")
      .css("background-color", "transparent")
      .html(`
        <div style="
          display: flex;
          align-items: center;
          gap: 15px;
        ">
          <img src="https://cdn.glitch.global/31f9c0b6-abdb-466e-82fa-6dcaef7dfb1a/error.png?v=1654314691272">
          ${message}
        </div>
      `);
    $(this.window).find(".menu-bar").hide();
    $(this.window).find(".btn-minimize").hide();
    $(this.window).find(".btn-maximize").hide();
    
    new Audio("https://cdn.glitch.global/31f9c0b6-abdb-466e-82fa-6dcaef7dfb1a/error.mp3?v=1654374206053").play();
  }
}

function main() {
  $(".window .taskbar").show();
  $(".window .file").show();
  
//   setInterval(function() {
//     new WindowAlert("Error", "Under His Eye");
//   }, 777);
  
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
  
  $(function () {
    let isFullScreen = false;
    
    $(".btn-fs-toggle").click(function() {
      let window = document.querySelector(".window");

      if (isFullScreen) {
        document.exitFullscreen();
      } else {
        window.requestFullscreen();
      }

      isFullScreen = !isFullScreen;
    });
  });
}


function changeTime() {
  $("#time").text(moment().format('hh:mm a')); 
}


changeTime();
setInterval(changeTime, 1000 * 60);