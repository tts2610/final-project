$(document).ready(function () {
  $(".card").hover(
    function () {
      $(this).prev().find("#card-img-top").css("transform", "scale(1.1, 1.1)");
      $(this).find("#card-img-top").css("transform", "scale(1.1, 1.1)");
    },
    function () {
      $(this).prev().find("#card-img-top").css("transform", "scale(1, 1)");
      $(this).find("#card-img-top").css("transform", "scale(1, 1)");
    }
  );
});
