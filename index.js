// https://artage.io/en/icon-packs/original-windows-95-icons

(function ($) {
  $.fn.getBoundingClientRect = function () {
    return $(this)[0].getBoundingClientRect();
  };
})(jQuery);

$(".splash-screen").hide();
$(".window").hide();

function init() {
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
        }, 2500);
      }, 2000);
    }, 2000);
  }, 1000);

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
      }, 4000);
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