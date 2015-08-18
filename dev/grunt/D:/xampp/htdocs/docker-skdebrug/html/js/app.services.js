(function() {
    var app = angular.module('skdebrug.services', []);

    app.factory('skdebrugServices', function ($http) {

        var api = {};

        api.getTeam = function () {
            return $http({
                url: 'data/player.json'
            });
        };

        return api;
    });


})();
