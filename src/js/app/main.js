(function (define, angular) {

    'use strict';

    var dependences = [
        'utils/Logger',
        'boot/routers',
        'boot/filters',
        'boot/services',
        'boot/directives',
        'boot/controllers',
        'boot/models',
        'angularRoute',

    ];

    define(dependences, function (Logger, routers) {

        angular.module(APP.CONFIG.Main.appName, [
                'ui.router',
                'app.filters',
                'app.services',
                'app.directives',
                'app.controllers',
                'app.models'
            ])
            .config(routers)
            .config(Logger);

        // bootstrap application
        var app = angular.bootstrap(
            document.getElementsByTagName('body')[0],
            [APP.CONFIG.Main.appName]
        );

        // inject config to the root scope
        app.invoke(function($rootScope) {

            $rootScope.Const = APP.CONFIG.Const;

        });

        return app;

    });

}(define, angular));
