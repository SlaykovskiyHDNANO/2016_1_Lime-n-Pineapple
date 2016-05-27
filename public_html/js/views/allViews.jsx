'use strict';   
define([
    './main',
    './scoreboard',
    './game',
    './login'
], function(Main, Scoreboard, GameAction, Login) {
        return {
            main: Main,
            scoreboard: Scoreboard,
            game: GameAction,
            login: Login
        };
    }
);
