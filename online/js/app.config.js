(function() {
    var app = angular.module('skdebrug.config', ['ngRoute']);

    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/news', {
                    templateUrl: 'partials/news-list.html',
                    controller: 'newsController',
                }).
                when('/news/:newsId', {
                    templateUrl: 'partials/news-detail.html',
                    controller: 'newsDetailController'
                }).
                otherwise({
                    redirectTo: '/news'
                });
        }
    ]);

})();
