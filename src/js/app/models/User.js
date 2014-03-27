(function (define, APP) {

    'use strict';

    define(['data/event', 'data/request'], function (Event, Request) {

        var User = function (storage, $rootScope, socket, config) {

            var session = storage.Session;
            var key = 'User';

            // temp to re-auth
            var _creds = null;
            var _callback = null;

//            $rootScope.$on(Event.Ws.Close, function() {
//                this.logout();
//            }.bind(this));

            socket.on(Event.Ws.Profile, function (msg) {
                socket.off(Event.Ws.Profile);
                this.Player = msg.getProfileResponseMessage();
                $rootScope.User = this.Player;
                APP.Globals.userId  = this.Player.player.baseResponsePlayer.id;
                
                _callback && _callback();
                _callback = null;

            }.bind(this));

            this.Player = null;

            this.authenticate = function (login, password, ip, mac, r) {
                ip = ip || '172.23.1.148', mac = mac || '50-E5-49-25-4D-E2', r = r || 0;

                _creds = {
                    login: login,
                    password: password,
                    ip: ip,
                    mac: mac
                };

                socket.send(Request.Login, {
                    a: config.Main.gameId,
                    u: login,
                    p: password,
                    i: ip,
                    r: r,
                    m: mac
                });
            };

            this.authorize = function (callback) {
                _callback = callback;
                socket.off(Event.Ws.LoginAllowed).send(Request.Profile);
                session.set(key, _creds);
                _creds = null;
            };

            // temp function to try login after refresh page
            this.tryLogin = function (callback) {
                if (session.has(key)) {

                    var data = session.get(key);
                    this.authenticate(data.login, data.password, data.ip, data.mac, 1);

                    socket.on(Event.Ws.LoginAllowed, function (msg) {
                        if (msg.completed) {
                            this.authorize(callback);
                        }
                    }.bind(this));

                } else {
                    callback();
                }
            };

            this.logout = function () {
                session.clear();
                this.Player = null;

                $rootScope.$emit(Event.User.Logout);
            };

            this.createProfile = function (user) {
                socket.send(Request.CreateProfile, {
                    t: config.Main.gameId,
                    f: user.fname,
                    u: user.login,
                    p: user.password,
                    e: user.email,
                    y: user.byear,
                    b: user.lang,
                    c: user.country,
                    d: user.bday,
                    l: user.lname,
                    m: user.bmonth,
                    h: user.affiliate || config.Main.affiliateCode,
                    r: user.phone || ''
                });
            };

            this.forgotPassword = function (login, email) {
                socket.send(Request.ForgotPassword, {
                    a: config.Main.affiliate,
                    l: login,
                    e: email
                });
            };

            this.changePassword = function (code, password) {
                socket.send(Request.ChangePassword, {
                    a: config.Main.affiliate,
                    c: code,
                    p: password
                });
            };

            this.ChangeEmail = function (login, email) {
                socket.send(Request.UpdateEmail, {
                    u: login,
                    e: email
                });
            };

            this.resendCode = function(login) {
                socket.send(Request.ResendCode, {
                    u: login
                });
            };

            this.validateEmail = function(code) {
                socket.send(Request.ValidateEmail, {
                    c: code,
                    u: this.userLogin
                });
            };
            
            this.toggleHideFromSearch = function() {
                socket.send(Request.HideMeFromSearch);
            };

        };
        return ['storage', '$rootScope', 'socket', 'config', User];

    });

}(define, APP));
