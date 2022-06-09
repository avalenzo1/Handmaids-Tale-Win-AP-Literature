if (location.protocol != 'https:')
{
 location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}

// https://artage.io/en/icon-packs/original-windows-95-icons

(function ($) {
  $.fn.getBoundingClientRect = function () {
    return $(this)[0].getBoundingClientRect();
  };
})(jQuery);

$(".splash-screen").hide();
$(".window").hide();

function init() {
  let timeout = [1000, 2000, 2000, 2500, 4000];
  
  if (localStorage.getItem("remember") == 1) {
    timeout = [100, 20, 20, 100, 0]
  }
  
  setTimeout(function () {
    $(".dos").html("");

    setTimeout(function () {
      $(".dos").append(`
        <p class="dos-prompt">Starting Windows 95...</p>
        <br>
        <br>
        <p class="dos-prompt"></p>
      `);

      setTimeout(function () {
        $(".dos").hide();
        $(".splash-screen").show();

        setTimeout(function () {
          $(".splash-screen").hide();
          startOS();
        }, timeout[3]);
      }, timeout[2]);
    }, timeout[1]);
  }, timeout[0]);

  function startOS() {
    $(".dos").remove();
    $(".splash-screen").remove();
    
    $(".window .taskbar").hide();
    $(".window .file").hide();
    $(".window").show();
    $(".window").addClass("cursor-progress");
    
    let startup = new Audio("https://cdn.glitch.global/31f9c0b6-abdb-466e-82fa-6dcaef7dfb1a/startup.mp3?v=1653963878874");
    
    startup.addEventListener("canplaythrough", function() {
      startup.play();
      
      setTimeout(function() {
        main();
        $(".window").removeClass("cursor-progress");
      }, timeout[4]);
    });
  }
}

$(".dos").show();

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  $(".dos").one("click", function () {
    init();
  });
} else {
  $(".dos").one("keyup", function () {
    init();
  });
}

// the buttons below determine if to remember/forget user

$(".remember-btn").click(function() {
  localStorage.setItem("remember", 1);
});

$(".forget-btn").click(function() {
  localStorage.setItem("remember", 0);
});