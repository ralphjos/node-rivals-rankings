$( document ).ready(function() {
  $('.dropdown-list').hide().removeClass('fallback');
  $('.js-dropdown').hover(
    function () {
      $('.dropdown-list', this).stop().slideDown(100);
    },
    function () {
      $('.dropdown-list', this).stop().slideUp(100);
    }
  );
});