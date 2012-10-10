(function ($) {
  'use strict';

  /**
   * open page
   */

  function openPage(e) {
    var $target = $(e.currentTarget)
      , headerHeight = $target.data('header-height')
      , top = $target.offset().top
      , done;

    if (!headerHeight) {
      headerHeight = $target.height();
      $target
        .data('header-height', headerHeight)
        .find('.page-body').css({ top: headerHeight });
    }

    $target
      .toggleClass('open')
      .addClass('anim')
      .animate({ height: '100%' });

    // cross browser scroll
    $('html, body').animate({ scrollTop: top }, function () {
      if (done) return;
      done = true;
      $target.siblings().hide();
      $target.removeClass('anim');
    });

    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * close page by click event of ".page-header"
   */

  function closePage(e) {
    var $header = $(e.currentTarget)
      , $target = $header.parent('.slide-page')
      , height = $target.data('header-height');

    $target
      .toggleClass('open')
      .addClass('anim');

    $target.animate({ height: height }, function () {
      $target.css('height', '');
      $target.removeClass('anim');
    })

    $target.siblings().show();
    $(window).scrollTop(Math.ceil($target.offset().top));

    e.stopPropagation();
    e.preventDefault();
  }

  $(function () {
    $('body')
      .on('click.slidepage', '.slide-page:not(.open, .anim)', openPage)
      .on('click.slidepage', '.slide-page.open:not(.anim) .page-header', closePage);
  });

})(window.jQuery);