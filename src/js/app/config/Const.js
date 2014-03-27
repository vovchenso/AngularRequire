
APP.CONFIG.Const = (function() {

    var ConstProto = {
        key: function(id) {
            for (var key in this) {
                if (this[key] === id) {
                    return key;
                }
            }
            return null;
        }
    };

    return {
        PokerType: {
            __proto__: ConstProto,
            TEXAS_HOLDEM: 1,
            OMAHA_HI: 2,
            OMAHA_HI_LO: 6
        },
        LimitType: {
            __proto__: ConstProto,
            LIMIT: 1,
            NO_LIMIT: 2,
            POT_LIMIT: 3
        },
        MoneyType: {
            __proto__: ConstProto,
            REAL: 0,
            FUN: 1
        },
        Desk: {
            Seat: {
                OPEN: 1,
                RESERVED: 2,
                IN_GAME: 3,
                DISABLED: 4
            },
            State: {
                BEGIN: 1,
                END: 2,
                CANCEL: 3,
                CLEAR_ALL: 4
            },
            UserAction: {
		ACTIVATE_TIME_BANK: 1,
		ALL_IN: 2,
		ANTE: 3,
		BIG_BLIND: 4,
		BET: 5,
		CALL: 6,
		CHECK: 7,
		FOLD: 8,
		HI_POT: 9,
		LOW_POT: 10,
		POT: 11,
		RAISE: 12,
		READY: 13,
		RETURN: 14,
		SMALL_BLIND: 15,
		SHOW_CARDS: 16,
		SITOUT: 17,
		WAIT_FOR_BIG_BLIND: 18,
		CUSTOM_RAISE: 19,
                PLAYER_STAKE: 20,
                TIMEBANK: 21
            },
            TableAction: {
                CONNECT: 1,
                LEAVE: 2,
                TAKE_SEAT: 3,
                DECLINE_SEAT: 4,
                JOIN: 5
            }
        }

    };

}());