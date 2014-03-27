
(function(define, angular) {

    'use strict';

    var dependences = [
        'controllers/MainController',
        'controllers/LoginController'
    ];

    define(dependences, function() {

        angular.module('app.controllers', [])
            .controller('MainController', require('controllers/MainController'))
            .controller('LoginController', require('controllers/LoginController'));

    });

}(define, angular));
