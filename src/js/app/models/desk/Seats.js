
(function(define, APP) {

    'use strict';
    
    var dependencies = [
        'models/desk/Place',
        'models/desk/Player'
    ];

    define(dependencies, function(Place, Player) {
        
        var Seats = function(desk) {
            this.desk = desk;
            this.container = {};
        };
        
        Seats.prototype = {
            initPlaces: function(places) {
                for (var place in places) {
                    place = places[place];
                    this.container[place] = new Place(place);
                }
            },
            getPlaces: function() {
                return this.container;
            },
            getPlace: function(place) {
                return this.container[place];
            },
            setPlayer: function(place, player) {
                this.getPlace(place).setPlayer(new Player({
                    place: place,
                    name: player.baseResponsePlayer.login,
                    amount: player.amount
                }));
            },
            getPlayer: function(place) {
                place = this.getPlace(place);
                return place
                    ? place.player
                    : null;
            },
            removePlayer: function(place) {
                this.container[place] = new Place(place);
            },
            disableOpen: function() {
                for (var seat in this.container) {
                    this.container[seat].disable();
                }
            },
            count: function() {
                return Object.keys(this.container).length;
            }
        };

        return Seats;

    });

}(define, APP));
