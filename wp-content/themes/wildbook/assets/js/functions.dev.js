/**
 * Theme functions file.
 */
(function($) {
  "use strict";

  $(document).ready(function($){

    var $body = $('body');

    if( ! $body.hasClass( 'preloader-off' ) ) {
      $($body).imagesLoaded(function() {
        $body.addClass('loaded');
      }); 
    }
    
    if( $body.hasClass( 'sticky-nav' ) && $( '#top-nav').length ) {
      $('.site-content').css( 'padding-top', $( '#top-nav').outerHeight() );
    }

    $( window ).resize(function() {
      if( $body.hasClass( 'sticky-nav' ) && $( '#top-nav').length ) {
        $('.site-content').css( 'padding-top', $( '#top-nav').outerHeight() );
      }
    });

    // Sidebar Nav Toggle
    $('.nav-toggle').on( 'click', function(e) {
      e.preventDefault();
      $body.toggleClass('nav-open');
    });

    $('#close-canvas-nav').on( 'click', function(e) {
      e.preventDefault();
      $body.removeClass('nav-open');
    });

    $('.search-toggle').on( 'click', function(e) {
      e.preventDefault();
      $body.toggleClass('search-open');
      $body.removeClass('nav-open');
    });

    $('.search-untoggle, .search-modal').on( 'click', function(e) {
      e.preventDefault();
      $body.removeClass('search-open');
    });

    $(".search-modal .search-wrap").click(function(event) {
      event.stopPropagation();
    });

    // Sidebar Nav
    var $navMenu = $('.sidebar-nav .nav-menu');

    if( $navMenu.length ) {
      $navMenu.children('li').addClass('menu-item-parent');
      
      $navMenu.find('.menu-item-has-children > .ancestor-wrapper > a').on('click', function(e){
        e.preventDefault();
        var itemSub = $(this).parent().next('.sub-menu'),
            parentSubs = $(this).closest('.menu-item-parent').find('.sub-menu');
        
        $navMenu.find('.sub-menu').not(parentSubs).slideUp(250);
        itemSub.slideToggle(250);
      }); 
    }
    
    // Top Navigation
    $('#top-nav-toggle').on('click', function(e) {
      e.preventDefault();
      var $btn = $(this),
          $btnSpan = $('.top-nav-toggle-text');
      
      $btn.parent().next().slideToggle(500);
      
      if( $btnSpan.text() == $btn.attr('data-close-text') ) {
        $btnSpan.text($btn.attr('title'));
      } else {
        $btnSpan.text($btn.attr('data-close-text'));
      }
    });

    var $masonry_container = $( '.masonry-container' );

    if( $.fn.masonry !== undefined && $.fn.imagesLoaded !== undefined && $masonry_container.length ) {
      $masonry_container.imagesLoaded(function() {
        $masonry_container.masonry({
          itemSelector: '.gallery-item',
          isRTL: $body.hasClass( 'rtl' ) ? true : false
        });
      });
    }

    var $masonry_posts_grid = $( '.masonry-grid' );

    if( $.fn.masonry !== undefined && $.fn.imagesLoaded !== undefined && $masonry_posts_grid.length ) {
      $masonry_posts_grid.imagesLoaded(function() {
        $masonry_posts_grid.masonry({
          itemSelector: '.masonry-item',
          isRTL: $body.hasClass( 'rtl' ) ? true : false
        });
      });
    }

    var $owl_container = $( '.owl-carousel' );

    if( $.fn.owlCarousel !== undefined && $.fn.imagesLoaded !== undefined && $owl_container.length ) {

      $owl_container.each( function() {
        var $owl = $(this),
            columns = $owl.attr( 'data-columns' ),
            autoplay = parseInt( $owl.attr( 'data-autoplay' ) );

        $owl.imagesLoaded(function() {
          $owl.owlCarousel({
            loop: true,
            autoplay: autoplay ? true : false,
            autoplayTimeout: 5000,
            margin: 10, 
            autoHeight: true, 
            smartSpeed: columns < 2 ? 600 : 300,
            dots: columns < 2 ? false : true,
            nav: columns < 2 ? true : false,
            rtl: $body.hasClass( 'rtl' ) ? true : false,
            navText : [ wdbVars.leftArrow, wdbVars.rightArrow ],
            responsive:{
                0:{
                  items: 1,
                  margin: 5
                },
                768:{
                  items: parseInt( columns )
                }
            }
          });
        });
      });
    }
    
    if( $body.hasClass( 'snow-on' ) ) {
      $('#sidebar').snowfall( { flakeCount : 150, minSpeed : 2 });
    }
    
  });
})(jQuery);