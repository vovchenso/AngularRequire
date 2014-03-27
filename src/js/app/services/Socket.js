
(function(define) {
    
    'use strict';
    
    define(['data/event'], function(Event) {
        
        var Connection = (function() {
            
            var instance = null;
            
            return {
                init: function(socket) {
                    console.log('connecting to', socket);
                    instance = new WebSocket(socket);
                    instance.binaryType = 'arraybuffer'; 
                    return this;
                },
                
                instance: function() {
                    return instance;
                },

                send: function(request) {
                    if (instance.readyState === WebSocket.OPEN) {
                        instance.send(request);
                    } else {
                        console.warn('Not connected.' + request);
                    }
                },
                
                on: function(event, callback) {
                    instance['on' + event] = callback;
                    return this;
                }
            };
            
        })();
        
        var Socket = function(config, builder, $log, $rootScope) {
            
            var callbacks = {};
            var socket = config.Main.socket;
            
            var connection = function connector() {
                
                var connection = Connection.init(socket);
                
                connection

                    .on('open', function() {
                        $log.info('Socket has been opened');
                        $rootScope.$emit(Event.Ws.Open);
                    })

                    .on('close', function(event) {
                        $log.warn('Socket has been closed.' + event.reason, event.code + '. Reconnecting...');
                        $rootScope.$emit(Event.Ws.Close);
                        // trying to reconnect..
                        setTimeout(connector, 500);
                    })

                    .on('error', function(error) {
                        $log.error('Socket error', error);
                    })

                    .on('message', function(event) {
                        try {
                            
                            var data = builder.build(event.data);
                            var evt = 'ws:' + data.event;
                            
                            $log.log(data.event + ':', data.msg);
                            
                            // dispach socket listeners
                            dispatch(evt, data.msg);
                            
                            // dispach to the root scope
                            $rootScope.$emit(evt, data.msg);
                            $rootScope.$apply();
                            
                        } catch(err) {
                            $log.error(err);
                        }
                    });
                    
                return connection;
                
            }();
            
            var composeParams = function(params) {
                params = params || {};
                var result = '';

                for (var param in params) {
                    result += ' -' + param + params[param];
                }

                return result;
            };
            
            var dispatch = function(event, message) {
                if (event in callbacks) {
                    callbacks[event].forEach(function(callback) {
                        callback(message);
                    });
                }
            };
            
            return {
                send: function(request, params) {
                    request += composeParams(params);
                    $log.info('Send request: ' + request);
                    connection.send(request);
                    return this;
                },
                once: function(event, callback) {
                    // @todo: implement
                },
                on: function(event, callback) {
                    (callbacks[event] = callbacks[event] || []).push(callback);
                    return this;
                },
                off: function(event) {
                    callbacks[event] &&
                        delete callbacks[event];
                    return this;
                },
                state: function () {
                    return connection.instance().readyState;
                }
            };
            
        };
        
        return ['config', 'builder', '$log', '$rootScope', Socket];
        
    });
    
}(define));