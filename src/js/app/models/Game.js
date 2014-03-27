
(function(define, APP) {

    'use strict';
    
    var dependencies = [
        'data/request', 
        'models/desk/Pool'
    ];

    define(dependencies, function(Request, Pool) {
        
        var PlayerAction = APP.CONFIG.Const.Desk.PlayerAction;
        var TableAction = APP.CONFIG.Const.Desk.TableAction;
        
        var Game = function(socket) {
            this.socket = socket;
            this.activeDesk = null;
            this.pool = new Pool();
        };
        
        Game.prototype = {
            initialize: function(deskId) {
                if (this.pool.has(deskId)) {
                    this.activeDesk = this.pool.get(deskId);
                } else {
                    this.activeDesk = this.pool.register(deskId);
                    this.requestDeskCommand(TableAction.CONNECT);
                }
                
                return this;
            },
            requestUserCommand: function(action, data) {
                switch(action) {
                    case PlayerAction.BIG_BLIND:
                        this.socket.send(Request.BigBlind, {
                            d: this.activeDesk.id
                        });
                        break;
                    case PlayerAction.SMALL_BLIND:
                        this.socket.send(Request.SmallBlind, {
                            d: this.activeDesk.id
                        });
                        break;
                    case PlayerAction.BET: 
                        this.socket.send(Request.Bet, {
                            d: this.activeDesk.id
                        });
                        break;
                    case PlayerAction.CALL:
                        this.socket.send(Request.Call, {
                            d: this.activeDesk.id
                        });
                        break;
                    case PlayerAction.FOLD: 
                        this.socket.send(Request.Fold, {
                            d: this.activeDesk.id
                        });
                        break;
                    case PlayerAction.CHECK: 
                        this.socket.send(Request.Check, {
                            d: this.activeDesk.id
                        });
                        break;
                    case PlayerAction.RAISE: 
                        break;
                    case PlayerAction.ANTE: 
                        break;
                    case PlayerAction.RETURN: 
                        this.socket.send(Request.Return, {
                            d: this.activeDesk.id
                        });
                        break;
                    case PlayerAction.SITOUT:
                        this.socket.send(Request.SitOut, {
                            d: this.activeDesk.id
                        });
                        break;
                    default:
                        break;
                }
            },
            requestDeskCommand: function(action, data) {
                switch (action) {
                    case TableAction.CONNECT:
                        this.socket.send(Request.Connect, {
                            d: this.activeDesk.id
                        });
                        break;
                    case TableAction.LEAVE:
                        this.socket.send(Request.LeaveDesk, {
                            d: this.activeDesk.id
                        });
                        this.socket.send(Request.Unsubscribe, {
                            s: 'desk',
                            d: this.activeDesk.id
                        });
                        break;
                    case TableAction.TAKE_SEAT:
                        this.socket.send(Request.TakePlace, {
                            d: this.activeDesk.id,
                            p: data.place
                        });
                        break;
                    case TableAction.DECLINE_SEAT:
                        this.socket.send(Request.DeclinePlace, {
                            d: this.activeDesk.id,
                            p: data.place
                        });
                        break;
                    case TableAction.JOIN:
                        this.socket.send(Request.Join, {
                            d: this.activeDesk.id,
                            p: data.place,
                            m: data.money
                        });
                        break;
                    default:
                        break;
                }
            }
        };

        return ['socket', Game];

    });

}(define, APP));
