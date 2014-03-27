
(function(define, APP) {

    'use strict';
    
    var dependencies = [
        'data/notification', 
        'models/desk/Seats',
        'models/desk/Settings',
        'models/desk/ActionBar'
    ];

    define(dependencies, function(Notification, Seats, Settings, ActionBar) {
        
        var PlayerAction =  APP.CONFIG.Const.Desk.PlayerAction;
        var State =  APP.CONFIG.Const.Desk.State;
        
        var Desk = function(id) {
            this.id = id;
            this.name = null;
            
            this.dealerPlace = null;
            this.activePlace = null;
            this.currentPlayerPlace = null;
            
            this.maxAmount = null;
            this.cards = [];

            this.buttons = new ActionBar(this);
            this.seats = new Seats(this);
            this.settings = new Settings(this);
        };
        
        Desk.prototype = {
            
            getPlayer: function(place) {
                return this.seats.getPlayer(place);
            },
            
            currentPlayer: function() {
                return this.getPlayer(this.currentPlayerPlace);
            },
            
            /*
             * @todo: to use switch..case
             */
            update: function(msg) {
                
                var item;
                
                item = msg.deskInformation;
                if (null !== item) {
                    this.seats.initPlaces(item.places);
                    this.name = item.deskName;
                    this.maxAmount = item.maxAmount;
                }
                
                item = msg.showPlayers;
                if (null !== item) {
                    var players = item.playerOnDeskInformation;
                    for (var place in players) {
                        var player = players[place];
                        this.seats.setPlayer(player.placeNumber, player);
                        // check if it's me
                        if (player.id === APP.Globals.userId) {
                            this.currentPlayerPlace = player.placeNumber;
                        }
                    }
                    this.dealerPlace = item.dealerPlace;
                }
                
                item = msg.dealerPlace;
                if (null !== item) {
                    this.dealerPlace = item;
                }
                
                item = msg.reservedPlaces;
                if (null !== item) {
                    var places = item.reservedPlace;
                    for (var place in places) {
                        this.seats.getPlace(place).reserve();
                    }
                }
                
                item = msg.sitoutInformation;
                if (null !== item) {
                    var players = item.sitoutInformation;
                    for (var player in players) {
                        player = players[player];
                        this.seats.getPlayer(player.place).sitout();
                    }
                }
                
                item = msg.ownCards;
                if (null !== item) {
                    var cards = item.cards;
                }
                
                return this;
            },
            
            public: function(info, data) {
                
                switch (info.code) {
                    
                    case Notification.GS_PLACE_RESERVED:
                        this.seats.getPlace(data.place).reserve();
                        break;
                        
                    case Notification.GS_PLACE_VACATED:
                        this.seats.getPlace(data.place).open();
                        break;
                        
                    case Notification.GS_NEW_PLAYER:
                        break;
                        
                    case Notification.GS_LEAVE_DESK:
                        this.seats.removePlayer(data.who);
                        break;
                        
                    case Notification.GS_SMALL_BLIND:
                    case Notification.GS_BIG_BLIND:
                        this.seats.getPlayer(data.who).update(info.code, data);
                        if (data.status && data.status == State.BEGIN) {
                            this.activePlace = data.who;
                        }
                        break;
                        
                    case Notification.GS_UNCALLED_BET:
                        break;
                        
                    case Notification.GS_PLAYER_SIT_OUT:
                        this.seats.getPlayer(data.who).sitout();
                        break;
                        
                    case Notification.GS_PLAYER_STAKE:
                        break;
                        
                    default:
                        break;
                }
                
                return this;
            },
            
            private: function(code, data) {
                data.show = true;
                data.code = null;
                
                switch (code) {
                    case Notification.GS_PLAYER_SIT_OUT:
                        data.code = PlayerAction.SITOUT;
                        break;
                    case Notification.GS_SMALL_BLIND:
                        data.code = PlayerAction.SMALL_BLIND;
                        break;
                    case Notification.GS_BIG_BLIND:
                        data.code = PlayerAction.BIG_BLIND;
                        break;
                    case Notification.GS_PLAYER_STAKE:
                        data.code = PlayerAction.PLAYER_STAKE;
                        break;
                    case Notification.GS_PLAYER_STAKE:
                        data.show = false;
                        break;
                    default:
                        break;
                }
                
                this.buttons = data;
            },
            
            /**
             * Mark desk dirty to update view
             */
            markDirty: function() {
                this.dirty = (this.dirty || 0) + 1;
            }
        };

        return Desk;

    });

}(define, APP));
