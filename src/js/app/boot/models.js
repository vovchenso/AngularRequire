
(function(define, angular) {
    
    'use strict';
    
    var dependences = [
        'models/User'
    ];
    
    define(dependences, function(User) {
        
        angular.module('app.models', [])
            .service('User', User);

    });
    
}(define, angular));
