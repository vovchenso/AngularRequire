(function(require, APP) {
    
    'use strict';
    
    require.config({
        
        baseUrl: 'js/app',
        
        paths: {
            'angular': '/src/js/lib//angular/angular',
            'angularRoute': '/src/js/lib/angular-route/angular-route'
        },

        shim: {
            angular: {
                exports: 'angular'
            }
        },
        
        urlArgs: ''
        
    });
    
    APP.Globals = {};
    APP.CONFIG = require(['config']);
    
    // load Angular first
    require(['angular'], function(angular) {        
        // bootstrap application
        require(['main'], function(app) {
            APP.Framework = app;
        });
        
    });
    
}(require, APP = {}));
