"use strict";

$(function() {
    
    /* SideMenu collapse and expand function */
    
    var fadeDuration = 200;
    var $expandIcon = 
        $('.icon-step-forward')
            .click(function() {
                $('.side-menu')
                    .toggleClass('side-menu-reserve')
                    .children(':not(.icon-white)').show();
                $('.context').removeClass('span11').addClass('span9');
                $(this).hide();
            });
    var $collapseIcon = 
        $('.icon-step-backward')
            .click(function(){
                $('.side-menu')
                    .toggleClass('side-menu-reserve')
                    .children(':not(.icon-white)').hide();
                $('.context').removeClass('span9').addClass('span11');
                $(this).hide();
                $expandIcon.fadeIn(fadeDuration);
            });
    
    $('.side-menu').hover(function() {
        if(!$('.side-menu').is('.side-menu-reserve')) {
            $collapseIcon.fadeIn(fadeDuration);
        }
    }, function() {
        if(!$('.side-menu').is('.side-menu-reserve')) {
            $collapseIcon.fadeOut(fadeDuration);
        }
    });
    
});

/**
 * @param target a jQuery selector string, target DOM; or scrollTop value
 * @param container a jQuery selector string, represents DOM which contains target, default is 'html, body'
 */
function smoothScrollTo(target, container) {
    container = container ? container : 'html, body';

    $(container).animate({
        scrollTop: $.isNumeric(target) ? 
            target : 
            $(target).offset().top 
                + $(container).scrollTop() 
                - $(container).offset().top
    }, 300);
}

    

/* Angular controller */

function ArticleCtrl($scope, $http) {
    function hasLink(article) { return article.link ? true : false; }
    
    $http.get('data/articles.json').success(function(data) {
        $scope.articles = data;
    });
    
    $scope.smoothAnchorClick = function(event, article) {
        if(!hasLink(article)) {
            event.preventDefault();
            smoothScrollTo(event.target.hash, '.scroller');
        }
    };
    
    $scope.getHref = function(article) {
        return hasLink(article) ? article.link : '#' + article.anchor;
    };
    
    $scope.noLink = function(article) {
        return !hasLink(article);
    };
}


/* Angular module */

angular.module('demonstration', [])
    .directive('scrollToToppable', function() {
        return function(scope, element, attrs) {
            var header = element.siblings('header');
            
            element.scroll(function() {
                var isActive = element.scrollTop() > 32;
                
                if(isActive) {
                    header.addClass('active');
                } else {
                    header.removeClass('active');
                }
            });
            
            header.children('.clickable').click(function() {
                smoothScrollTo(0, element);
            })
        };
    });
