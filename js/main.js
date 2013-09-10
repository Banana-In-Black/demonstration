"use strict";

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
    $http.get('data/articles.json').success(function(data) {
        $scope.articles = data;
    });
    
    $scope.smoothAnchorClick = function(event, article) {
        event.preventDefault();
        smoothScrollTo(event.target.hash, '.scroller');
    };
    
    function inputReset() {
        $scope.input = {};
        $scope.form.$setPristine();
    }
    
    $scope.addOrUpdateArticle = function(input) {
        switch($scope.confirmBtn) {
            case 'Update':
                if($scope.updateIndex > 0) {
                    $scope.articles[$scope.updateIndex] = angular.copy(input);
                }
                break;
                
            case 'Add':
                $scope.articles.push(angular.copy(input));
                inputReset();
                break;
                
            default:
                throw Error('Undefined operation.'); 
        }
    };
    
    $scope.fillInput = function(article, index) {
        $scope.updateIndex = index;
        $scope.confirmBtn = 'Update';
        $scope.input = angular.copy(article);
    };
    
    $scope.cancelUpdate = function() {
        $scope.updateIndex = -1;
        $scope.confirmBtn = 'Add';
        inputReset();
    };
}


/* Angular module */

angular.module('demonstration', [])
    /**
     * The container of this element must be positioned to make navigator locate in right place.
     * Currently navigator width set to 100% of parent DOM's width, so it might be some problems if layout is complex.  
     */
    .directive('scrollToToppable', function() {
        return function(scope, element, attrs) {
            var nav = $('<nav class="scroll-to-top"><img src="img/top-button.png" class="clickable"></img></nav>').insertBefore(element);
            var startPosition = attrs.scrollToToppable ? attrs.scrollToToppable : 20;
            
            element.scroll(function() {
                var isActive = element.scrollTop() > startPosition;
                nav.toggleClass('active', isActive);
            });
            
            nav.children('.clickable').click(function() {
                smoothScrollTo(0, element);
            });
        };
    });
