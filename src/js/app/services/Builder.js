
(function(define) {
    
    'use strict';
    
    define(['ProtoBuf'], function(ProtoBuf) {
        
        var cache = {};
        
        var Builder = function(config, map) {
            
            var _load = function(type) {
                var message = map.getMessage(type);
                var path = map.getPath(type);

                // build using BaseResponseMessage
                return ProtoBuf
                    .loadJsonFile(config.Main.jsonPath + path)
                    .build('BaseResponseMessage');
            };
            
            var _build = function(type) {
                if (!(type in cache)) {
                    cache[type] = _load(type);
                }
                return cache[type];
            };
            
            return {
                build: function(data) {
                    // get message type
                    var type = parseInt(new Uint8Array(data)[1]);
                    
                    // build and return objects
                    return {
                        event: map.getName(type),
                        msg: _build(type).decode(data)
                    };
                }
            };
            
        };
        
        return ['config', 'map', Builder];
        
    });
    
}(define));