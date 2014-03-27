
(function(define, APP) {

    'use strict';

    define([], function() {
        
        var SeatStatus = APP.CONFIG.Const.Desk.Seat;
                
        var Place = function(id) {
            this.id = id;
            this.status = SeatStatus.OPEN;
            this.player = null;
        };
        
        Place.prototype = {
            setPlayer: function(player) {
                this.player = player;
                this.status = SeatStatus.IN_GAME;
            },
            disable: function() {
                if (this.status === SeatStatus.OPEN) {
                    this.status = SeatStatus.DISABLED;
                }
            },
            reserve: function() {
                this.status = SeatStatus.RESERVED;
            },
            open: function() {
                this.status = SeatStatus.OPEN;
            }
        };

        return Place;

    });

}(define, APP));
