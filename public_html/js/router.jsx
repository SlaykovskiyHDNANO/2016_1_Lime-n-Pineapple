'use strict';
define([
        'jquery',
        'underscore',
        'backbone',
        'views/allViews',
        'controllers/viewManager',
        'collections/sessions',
        'models/session'
],
    function ($, underscore, Backbone, Views, ViewManager, Sessions) {
        var Router = Backbone.Router.extend({
                routes: {
                    "game": "gameAction",
                    "scoreboard": "scoreboardAction",
                    "login": "loginAction",
                    "logout": "logoutAction",
                    "*default": "defaultAction"
                },



                initialize: function () {
                    this.VM = new ViewManager(
                        "#page__view-holder",
                        new Views.game(),
                        new Views.main(),
                        new Views.scoreboard(),
                        new Views.login(new Sessions())
                    );
                    // this.defaultAction(); - Works without it
                },

                defaultAction: function () {
                    Views.main.show();
                },

                scoreboardAction: function () {
                    console.log("Scoreboard action showing...");
                    Views.scoreboard.show();
                },

                gameAction: function () {
                    Views.game.show();
                },

                loginAction: function () {
                    Views.login.show();
                },

                logoutAction: function() {
                    
                }
            });

        return new Router();
    }

);