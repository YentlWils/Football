(function() {
    var app = angular.module('skdebrug.controllers', []);
    var folder = {
        banners: "images/banners/##.jpg"
    }

    app.controller('teamController', function(apiServices){
        var team = this;
        team.players = [];
        apiServices.getTeam().success(function (data) {
            team.players = data;
        });
    });

    app.controller('newsController', function(apiServices){
        var news = this;
        news.items = [];
        apiServices.getNews().success(function (data) {
            news.items = data;
        });
    });

    app.controller('teamSliderController', function($scope, apiServices){
        var team = this;
        team.players = [];
        apiServices.getTeam().success(function (data) {
            team.players = data;
        });
    });

    app.controller('rankingController', function($scope, apiServices){
        $scope.sortType     = ''; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order

        apiServices.getLeague().success(function (data) {
            $scope.ranking = data;
        });
    });

    app.controller('timelineController', function($scope, apiServices){
        //jQuery(document).ready(function($){
        //    var timelineBlocks = $('.cd-timeline-block'),
        //        offset = 0.8;
        //
        //    //hide timeline blocks which are outside the viewport
        //    hideBlocks(timelineBlocks, offset);
        //
        //    //on scolling, show/animate timeline blocks when enter the viewport
        //    $(window).on('scroll', function(){
        //        (!window.requestAnimationFrame)
        //            ? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
        //            : window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
        //    });
        //
        //    function hideBlocks(blocks, offset) {
        //        blocks.each(function(){
        //            ( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
        //        });
        //    }
        //
        //    function showBlocks(blocks, offset) {
        //        blocks.each(function(){
        //            ( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
        //        });
        //    }
        //});  
    });

    app.controller('nextMatchWidgetController', function($scope, apiServices){
        var match = this;
        apiServices.getNextMatch().success(function (data) {
            match.next = data[0];
            match.next.homeTeam.img = match.next.homeTeam.name.replace(/ /g,'-');
            match.next.awayTeam.img = match.next.awayTeam.name.replace(/ /g,'-');
        });
    });

    app.controller('matchWidgetController', function($scope, apiServices){
        var match = this;
        apiServices.getPrevMatch().success(function (data) {
            match.prev = data[0];
        });
        apiServices.getNextXMatch(2).success(function (data) {
            match.next = data;
        });
    });


    app.controller('bannerSliderController', function($scope, utils){
        var banner = this;
        banner.slides = [];
        var slides = [0,1,2,3,4,5,6,7,8,9];

        var counter = 0;
        $.each(slides, function( index, value ) {
            var image = folder.banners.replace("##",value);
            utils
                .isImage(image)
                .then(function(foundImage) {
                    if(foundImage){
                        banner.slides[index] = image;
                    }
                    return ++counter;
                })
                .then(function(counter){
                    if(counter==9){
                        var owl = $('#home-banner');
                        owl.trigger('refresh.owl.carousel');
                    }
                });
        });

    });

})();
