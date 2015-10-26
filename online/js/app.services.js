(function() {
    var app = angular.module('skdebrug.services', []);

    var api = {
        //players: 'data/player.json',
        //news: 'data/news.json',
        //newsItem: 'data/news-item.json?id={0}',
        //nextMatch: 'data/next-match.json',
        //allMatches: 'data/all-matches.json',
        //prevMatch: 'data/prev-match.json',
        //league: 'data/league.json',
        players: '/data/player',
        news: '/data/news',
        newsItem: '/data/news/{0}',
        nextMatch: '/data/game/next/{0}/team/{1}',
        allMatches: '/data/game',
        prevMatch: '/data/game/prev/{0}/team/{1}',
        league: '/data/league',
    };

    app.factory('apiServices', function ($http) {

        var services = {
            getTeam : function () {
                return $http({
                    url: api.players
                });
            },
            getNews : function(){
                return $http({
                    url: api.news
                })
            },
            getNewsItem : function(x){
                return $http({
                    url: api.newsItem.replace("{0}",x)
                })
            },
            getAllMatches : function(){
                return $http({
                    url: api.allMatches
                })
            },
            getNextXMatch : function(x, y){
                return $http({
                    url: api.nextMatch.replace("{0}",x).replace("{1}",y)
                })
            },
            getPrevXMatch : function(x, y){
                return $http({
                    url: api.prevMatch.replace("{0}",x).replace("{1}",y)
                })
            },
            getLeague : function(){
                return $http({
                    url: api.league
                })
            },
        };

        return services;
    });

    app.factory('utils', function($q) {
        return {
            isImage: function(src) {
                var deferred = $q.defer();

                var image = new Image();
                image.onerror = function() {
                    deferred.resolve(false);
                };
                image.onload = function() {
                    deferred.resolve(true);
                };
                image.src = src;

                return deferred.promise;
            }
        };
    });

})();
