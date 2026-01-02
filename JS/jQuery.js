// Animacion qe kur ndodh nje gabim ne ndonje fush specifike input ather ne ate fush ndodh nje lloj dridhje 

function shakeField($el){
  $el.css("position","relative");
  $el.stop(true, true)
     .animate({ left: "-10px" }, 80)
     .animate({ left: "10px" }, 80)
     .animate({ left: "-6px" }, 80)
     .animate({ left: "6px" }, 80)
     .animate({ left: "0px" }, 80);
}

const observer = new MutationObserver(() => {
  $(".input-error").each(function(){
    shakeField($(this));
  });
});

observer.observe(document.body, {
  attributes: true,
  subtree: true,
  attributeFilter: ["class"]
});


// Jquery

$(".order-btn, .payment-btn").on("click", function (e) {
  const $btn = $(this);

  const ripple = $("<span></span>");
  ripple.addClass("ripple-effect");

  const x = e.pageX - $btn.offset().left;
  const y = e.pageY - $btn.offset().top;

  ripple.css({
    left: x,
    top: y
  });

  $btn.append(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
});
