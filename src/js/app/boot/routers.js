(function (define) {

    'use strict';

    var dependences = [
    ];

    define(dependences, function () {

        var RouteManager = function ($stateProvider) {

            $stateProvider
                .state('loading', {
                    url: '/loading',
                    templateUrl: 'partials/loading.html'
                })
                .state('login', {
                    url: '/login?state',
                    templateUrl: 'partials/login.html',
                    controller: 'LoginController'
                });
        };

        return ['$stateProvider', RouteManager];
    });

}(define));
