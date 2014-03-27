
(function(define, angular, APP) {
    
    'use strict';
    
    var dependences = [
        'services/Socket',
        'services/Storage'
    ];
    
    define(dependences, function(Socket, Storage) {
        
        angular.module('app.services', [])
            .constant('config', APP.CONFIG)
            .service('socket', Socket)
            .service('storage', Storage);

    });
    
}(define, angular, APP));