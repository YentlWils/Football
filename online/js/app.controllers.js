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

        $.each(slides, function( index, value ) {
            var image = folder.banners.replace("##",value);
            utils
                .isImage(image)
                .then(function(foundImage) {
                    if(foundImage){
                        banner.slides[index] = image;
                    }
                });
        });

    });

})();
