(function() {
    var app = angular.module('skdebrug.controllers', ['ngRoute']);
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

    app.controller('newsController', function($scope, apiServices){
        apiServices.getNews().success(function (data) {
            $scope.items = data;
        });
    });

    app.controller('newsDetailController', function($scope, $routeParams, apiServices) {
        $scope.newsId = $routeParams.newsId;
        apiServices.getNewsItem($scope.newsId).success(function (data) {
            $scope.item = data[0];
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

    app.controller('matchesController', function($scope, apiServices){
        $scope.sortType     = 'date'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order

        apiServices.getAllMatches().success(function (data) {
            $scope.matches = data;
        });
    });

    app.controller('timelineController', function($scope, apiServices){

    });

    app.controller('nextMatchWidgetController', function($scope, apiServices){
        var match = this;
        apiServices.getNextXMatch(1, 1).success(function (data) {
            match.next = data[0];
        });
    });

    app.controller('matchWidgetController', function($scope, apiServices){
        var match = this;
        apiServices.getPrevXMatch(3, 1).success(function (data) {
            match.prev = data;
        });
    });


    app.controller('bannerSliderController', function($scope, utils){
        var banner = this;
        banner.slides = [];
        var slides = [0,1,2,3,4,5,6,7,8,9];
        var owl = $('#home-banner');

        var defaultOptions = {
            nav : true, // Show next and prev buttons
            dots: false,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            lazyLoad: true
        };
        var customOptions = $scope.$eval(owl.attr('data-options'));
        // combine the two options objects
        for(var key in customOptions) {
            defaultOptions[key] = customOptions[key];
        }
        // init carousel
        owl.owlCarousel(defaultOptions);

        var counter = 0;
        $.each(slides, function( index, value ) {
            var image = folder.banners.replace("##",value);
            utils
                .isImage(image)
                .then(function(foundImage) {
                    if(foundImage){
                        banner.slides[index] = image;
                    }
                    return ++counter
                })
                .then(function(counter){
                    if(counter==10) {
                        $.each(banner.slides, function( index, value ) {
                            var content = "<div class=\"item \"><img src=\"" + value + "\"></img></div>";
                            owl.data('owlCarousel').addItem(content);
                        });

                    }
                });
        });

    });

})();
