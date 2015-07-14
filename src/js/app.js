﻿$(function () {
    // Alert stack
    (function () {
        var alertStack = $('.win-alert-stack');

        if (alertStack.length === 0) {
            return;
        }

        alertStack.affix({
            offset: {
                top: alertStack.offset().top
            }
        });
    })();


    // Back to top
    (function () {
        var backToTop = $('.win-back-to-top'),
        threshold = 2 * $(window).height();

        // Displayed when we've scrolled 2x the viewport height
        if (backToTop.length === 0 ||
            $(document).height() < threshold) {
            return;
        }

        backToTop.affix({
            offset: {
                top: threshold
            }
        });

        // Smooth scroll to top
        backToTop.on('click', function () {
            $('html, body').animate({ scrollTop: 0 }, {
                duration: 750,
                easing: 'swing'
            });

            return false; // prevent default href
        });
    })();


    // Smooth scroll with page header links
    (function () {
        $('[data-win-scroll="smooth"] a[href*=#]:not([href=#])').on('click', function () {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
                location.hostname === this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1500);

                    return false; // prevent default href
                }
            }
        });
    })();

    // Star rating
    (function () {
        $('.win-rating-btn').on('mouseenter', function () {
            var active = $(this);

            // Highlight the hovered star and the previous stars
            $(this).prevAll('.win-rating-btn').addClass('active');
            $(this).addClass('active');

            // Remove highlighting of the following stars
            $(this).nextAll('.win-rating-btn').removeClass('active');
        });

        // Remove highlight of all stars when leaving the container
        $('.win-rating-stars-input').on('mouseleave', function () {
            $(this).find('.win-rating-btn').removeClass('active');
        });
    })();


    // Tooltips
    $('[data-toggle="tooltip"]').tooltip({
        // Override Bootsrap's default template with one that does not have arrow
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>'
    });

    // Flyouts
    // Provide data-theme attribute to set flyout's color theme.
    $('[data-toggle="popover"]').each(function () {
        var $element = $(this);

        $element.popover({
            // Override Bootsrap's default template with one that does not have arrow and title
            template: '<div class="popover" role="tooltip"><div class="popover-content"></div></div>'
        }).data('bs.popover').tip().addClass($element.data("theme"));
    });

    $('#btn-close').popover({
        placement: 'right',
        html: 'true',
        // Set the value of the data-theme attribute as a class name on the button.
        // That way the button will always be in the correct color theme.
        content: 'This is a flyout with a button. <button type="button" class="btn btn-primary ' + $('#btn-close').data("theme") + '"onclick="$(&quot;#btn-close&quot;).popover(&quot;hide&quot;);">Button</button>',
        template: '<div class="popover" role="tooltip"><div class="popover-content"></div></div>'
    }).data('bs.popover').tip().addClass($('#btn-close').data("theme"));
});
