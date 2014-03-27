
(function(define, APP) {

    'use strict';

    define(['data/event', 'models/desk/Desk'], function(Event, Desk) {

        var DeskPool = function() {
            var socket = APP.Framework.get('socket');
            
            this.desks = {};
            
            socket.on(Event.Ws.Connect, function(msg) {
                var deskId = msg.deskId;
            });
            
            // Desk Message
            socket.on(Event.Ws.Desk, function(msg) {
                var deskId = msg.deskId;
                if (this.has(deskId)) {
                    this.desks[deskId]
                        .update(msg.DeskResponseMessage)
                        .markDirty();;
                }
            }.bind(this));
            
            // Leave Desk
            socket.on(Event.Ws.LeaveDesk, function(msg) {
                var deskId = msg.deskId;
                if (this.has(deskId)) {
                    delete this.desks[deskId];
                }
            }.bind(this));
            
            // Public Notification Mesage
            socket.on(Event.Ws.Common, function(msg) {
                var deskId = msg.deskId;
                if (this.has(deskId)) {
                    msg = msg.CommonResponseMessage;
                    this.desks[deskId]
                        .public(msg.header, msg.commonPart)
                        .markDirty();
                }
            }.bind(this));
            
            // Private Notification Mesage
            socket.on(Event.Ws.Private, function(msg) {
                var deskId = msg.deskId;
                if (this.has(deskId)) {
                    msg = msg.PrivateResponseMessage;
                    this.desks[deskId]
                        .private(msg.header.code, msg.privatePart);
                }
            }.bind(this));
            

            
        };
        DeskPool.prototype = {
            register: function(id) {
                var desk = new Desk(id);
                this.add(id, desk);
                return this.get(id);
            },
            has: function(id) {
                return id in this.desks;
            },
            add: function(id, desk) {
                this.desks[id] = desk;
                return this;
            },
            get: function(id) {
                return this.desks[id];
            },
            remove: function(id) {
                delete this.desks[id];
                return this;
            },
            count: function() {
                return Object.keys(this.desks).length;
            }
        };

        return DeskPool;

    });

}(define, APP));
