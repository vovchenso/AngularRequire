

APP.CONFIG.Const = (function() {

    function Type(id, key, collection) {
        this.id = id;
        this.key = key;

        collection.push(this);
    }

    function byId(collection) {
        return function(id) {
            for (var i = 0; i < collection.length; i++) {
                if (collection[i].id === id) {
                    return collection[i];
                }
            }
        };
    }

    return {
        PokerType: (function() {

            var collection = [];

            function _PokerType(id, key) {
                Type.call(this, id, key, collection);
            }

            return {
                TEXAS_HOLDEM: new _PokerType(1, 'TEXAS_HOLDEM'),
                OMAHA_HI: new _PokerType(2, 'OMAHA_HI'),
                OMAHA_HI_LO: new _PokerType(6, 'OMAHA_HI_LO'),
                byId: byId(collection)
            };
        })(),
        LimitType: (function() {

            var collection = [];

            function _LimitType(id, key) {
                Type.call(this, id, key, collection);
            }

            return {
                LIMIT: new _LimitType(1, 'L'),
                NO_LIMIT: new _LimitType(2, 'NL'),
                POT_LIMIT: new _LimitType(3, 'PL'),
                byId: byId(collection)
            }
        })(),
        MoneyType: (function() {
            var collection = [];

            function _MoneyType(id, key) {
                Type.call(this, id, key, collection);
            }

            return {
                REAL: new _MoneyType(0, 'REAL_MONEY'),
                FUN: new _MoneyType(1, 'FUN_MONEY'),
                byId: byId(collection)
            };
        })()
    }

})();