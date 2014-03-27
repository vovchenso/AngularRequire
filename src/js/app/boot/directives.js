
(function(define, angular) {
    
    'use strict';
    
    var dependences = [
        'directives/time',
        'directives/date',
    ];
    
    define(dependences, function(Time, Date) {
        angular.module('app.directives', [])
            .directive('time', Time)
            .directive('date', Date);
    });
    
}(define, angular));
