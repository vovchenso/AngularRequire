
(function(define, angular) {
    
    'use strict';
    
    var dependences = [
        'filters/Money'
    ];
    
    define(dependences, function(Money) {
        
        angular.module('app.filters', [])
            .filter('money', Money);
    
    });
    
}(define, angular));
