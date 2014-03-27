
(function(define, APP) {

    'use strict';

    define([], function() {
        
        var PlayerStatus = APP.CONFIG.Const.Desk.Player;
                
        var Player = function(data) {
            this.place = data.place;
            this.name = data.name;
            this.amount = data.amount;
            this.status = PlayerStatus.DEFAULT;
            this.dealer = false;
            this.cards = [];
        };
        
        Player.prototype = {
            sitout: function() {
                this.status = PlayerStatus.SITOUT;
            },
            update: function(code, data) {
                if (data.deskAmount) {
                    this.amount = data.deskAmount;
                }
                if (data.status) {
                    (data.status == 1)
                        ? this.handleStatus(PlayerStatus.ACTIVE)
                        : this.handleStatus(PlayerStatus.DEFAULT);
                }

            },
            handleStatus: function(status) {
                if (this.status !== PlayerStatus.SITOUT) {
                    this.status = status;
                }
            },
            resetCards: function() {
                this.cards = [];
            },
            setCards: function(cards) {
                this.resetCards();
                for (var card in cards) {
                    card = cards[card];
                    this.cards.push({
                        suit: card.suit,
                        value: card.value
                    });
                }
            }
        };

        return Player;

    });

}(define, APP));
