
(function(define) {
    
    'use strict';
    
    define([], function() {
        
        var LoginController = function($scope, User) {

            $scope.auth = function(login, password) {

            };
            
        };
        
        return ['$scope', 'User', LoginController];
        
    });
    
}(define));
