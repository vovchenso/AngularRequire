define([], function(){
    return {
        
        //game ended
        GS_GAME_OVER: 0,
        
        GS_NO_GAME: 1,
        
        //tournament will start soon
        GS_START_ATTENTION: 2,
        
        //new hand started
        GS_NEW_HAND: 3,
        
        //small blind posted
        GS_SMALL_BLIND: 4,
        
        //user posted a big blind
        GS_BIG_BLIND: 5,
        
        //player is dealt with cards
        GS_OWN_CARDS: 6,
        
        //flop round started
        GS_FLOP: 7,
        
        //start of TURN round
        GS_TURN: 8,
        
        //RIVER round started
        GS_RIVER: 9,
        
        //player sits out
        GS_PLAYER_SIT_OUT: 10,
        
        //it is possible to show cards now
        GS_SHOW_CARDS: 11,
        
        //???
        GS_SHOW_PLAYERS_CARDS: 12,
        
        //player returned after sitting out
        GS_PLAYER_RETURNED: 13,
        
        //player disconnected by admin
        GS_PLAYER_DISCONNECTED: 14,

        //users turn. Client validates prebets on this notification
        GS_PLAYER_STAKE: 15,
        
        //user made a call
        GS_CALL: 16,
        
        //player raises
        GS_RAISE: 17,
        
        //user made a check
        GS_CHECK: 18,
        
        //user made a bet
        GS_BET: 19,
        
        //user folded
        GS_FOLD: 20,
        
        //player uses time bank
        GS_TIME_BANK_IS_USED: 25,
        
        //user left the table
        GS_LEAVE_DESK: 30,
        
        //user posted ante
        GS_ANTE: 40,
        
        //proposal to post small blind
        GS_POST_SB: 41,
        
        //proposal to post both blinds
        GS_POST_BOTH: 42,

        //proposal to post BB immediately or wait for BB position
        GS_POST_BB_WAIT_FOR_BB: 43,

        //proposal to post both blinds or wait for BB position
        GS_POST_BOTH_WAIT_FOR_BB: 45,
        
        //
        GS_POST_SB_WAIT_FOR_BB: 44,
        
        //proposal to post BB
        GS_POST_BB: 46,

        //new player appears on table
        GS_NEW_PLAYER: 60,
        
        //game has been suspended
        GS_SUSPENDED: 70,
        
        //start of the toutrnament
        GS_START_TOUR: 101,
        
        //player has finished a tournament
        GS_OUT_TOUR: 102,

        //tournament level was changed
	GS_CHANGE_LEVEL: 103,
        
        //player has been mobed to some other table
        GS_OTHER_TABLE: 104,
        
        //tournament is on break
        GS_TOUR_BREAK: 105,
        
        GS_ADDON:  107,

        GS_REBUY: 108,
        
        GS_MAKE_ADDON: 109,
        
        GS_MAKE_REBUY: 110,
        
        GS_WAIT_TABLE: 111,
        
        //tournament level
        GS_CURR_LEVEL: 112,

        GS_WAITING_TABLES: 114,
        
        //table has been closed
        GS_TABLE_CLOSE: 115,
        
        //NOT USED
        GS_FLOP_BET_WIN: 150,
        //NOT USED
        GS_FLOP_BET_RETURN: 151,
        //NOT USED
        GS_FLOP_BET_LOST: 152,
        //NOT USED
	GS_ASK_FOR_DEALER: 153,
        
        //notifies that the player N is allowed to play only after the dealer button
        GS_PLAY_AFTER_DEALER: 154,
        
        GS_AMOUNT_OF_REBUY_CANNOT_EXCEED_MAXIMUM_BUYIN: 155,
        
        //player gets uncalled bet returned
        GS_UNCALLED_BET: 156,
        
	GS_AVATAR_CHANGED: 157,
        
        //clear the state of the player
        GS_STATUS_CLEAR: 158,
        
        //place has been reserved on the table
        GS_PLACE_RESERVED: 160,
        
        //place reservation canceled
        GS_PLACE_VACATED: 161,
        
        GS_WINNER_BUTTON_DOES_NOT_QUALIFY: 162,
        GS_SEAT_LOTTERY_WINNER: 163,
        GS_PLAYER_KICKED_OUT_AUTOMATICALLY: 164,
        GS_PLAYER_KICKED_OUT_BY_ADMIN: 165,
        GS_PLAYER_WILL_BE_KICKED_OUT_AUTOMATICALLY: 166,
        GS_ONE_CARD_DEALER_AWARDED: 167,
        GS_WAITING_TABLES_HAND_FOR_HAND: 168,
        GS_TOUR_BREAK_AT_55_MINUTES: 169,
        GS_TOUR_ADD_ONS_NOT_POSSIBLE: 170
        
    };
}());
