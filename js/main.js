$(function() {
    
    /* SideMenu collapse and expand function */
    
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
                $expandIcon.show();
            });
    
    $('.side-menu').hover(function() {
        if(!$('.side-menu').is('.side-menu-reserve')) {
            $collapseIcon.show();
        }
    }, function() {
        if(!$('.side-menu').is('.side-menu-reserve')) {
            $collapseIcon.hide();
        }
    });
    
    
    /* Smooth scrolling to an anchor*/
    
    $('.smooth-anchor')
        .click(function(event){
            event.preventDefault();
            $('.context').animate({
                scrollTop: $(this.hash).offset().top 
                        + $('.context').scrollTop() 
                        - $('.context').offset().top
            }, 300);
        })
        // Add an icon next to link
        .append('<i class="icon-chevron-right icon-white pull-right"></i>');
});
    
