
(function(define, APP) {

    'use strict';

    define(['data/request'], function(Request) {
        
        var Chat = function(id) {
            this.desk = id;
            this.socket = APP.Framework.get('socket');
        };

        // Chat Mesage
//        socket.on(Event.Ws.ChatMessages, function(msg) {
//            var deskId = msg.deskId;
//            if (this.has(deskId)) {
//                this.desks[deskId].chat.receive(msg.ChatMessagesResponseMessage.messages);
//            }
//        }.bind(this));
        
        Chat.prototype = {
            send: function(message) {
                this.socket.send(Request.Join, {
                    d: this.id,
                    m: message
                });
            },
            receive: function(messages) {
                for (var message in messages) {
                    
                }
            }
        };

        return Chat;

    });

}(define, APP));
