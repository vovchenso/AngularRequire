define([], function(){
    return {
        
        Ws: {
            Open: 'ws:open',
            Close: 'ws:close',
            Hello: 'ws:HELLO',
            LoginAllowed: 'ws:LOGIN_ALLOWED',
            LoginBlocked: 'ws:LOGIN_BLOCKED',
            Profile: 'ws:PROFILE',
            Desks: 'ws:DESKS',
            UpdateDesk: 'ws:UPDATE_DESK',
            UpdateTournament: 'ws:UPDATE_TOURNAMENT',
            UpdateFastFold: 'ws:UPDATE_FAST_FOLD',
            Undefined: 'ws:UNDEFINED',
            SystemParameters: 'ws:GET_SYSTEM_PARAMETERS',
            PlayerSettings: 'ws:GET_PLAYER_SETTINGS',
            PlayersInfo: 'ws:GET_PLAYERS_INFORMATION',
            Common: 'ws:COMMON',
            Private: 'ws:PRIVATE',
            Desk: 'ws:DESK',
            LeaveDesk: 'ws:LEAVE_DESK',
            TakePlace: 'ws:TAKE_PLACE',
            Connect: 'ws:CONNECT',
            CreateProfile: 'ws:CREATE_PROFILE',
            ChatMessages: 'ws:CHAT_MESSAGES',
            ChangePasswordIntent: 'ws:CHANGE_PASSWORD_INTENT',
            ChangePassword: 'ws:CHANGE_PASSWORD',
            UpdateEmail: 'ws:UPDATE_EMAIL',
            ResendCode: 'ws:RESEND_CODE',
            ValidateEmail: 'ws:VALIDATE_EMAIL'
        },
        
        Ping: {
            Pong: 'ping:pong'
        },
        
        User: {
            Logout: 'user:logout'
        },
        
        Seat: {
            Timeout: 'seat:timeout',
            Cancel: 'seat:cancel'
        },
        
        Settings: {
            Close: 'settings:close'
        }
        
    };
}());
