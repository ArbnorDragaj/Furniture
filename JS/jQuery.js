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