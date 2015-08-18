(function() {
    var app = angular.module('skdebrug.controllers', []);

    app.controller('teamController', function(skdebrugServices){
        var team = this;
        team.players = [];
        skdebrugServices.getTeam().success(function (data) {
            team.players = data;
        });

    });

    app.controller('teamSliderController', function($scope, skdebrugServices){
        var team = this;
        team.players = [];
        skdebrugServices.getTeam().success(function (data) {
            team.players = data;
        });

    });

})();
