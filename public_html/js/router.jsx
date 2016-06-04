'use strict';
define([
        'jquery',
        'underscore',
        'backbone',
        'views/allViews',
        'controllers/viewManager',
        'collections/sessions'
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
                defaults : {
                   "VM" : null
                },


                initialize: function () {
                    console.log("[+] ROUTER building...");
                    this.VM = new ViewManager();
                    this.VM.addView("#page__view-holder", new Views.main());
                    this.VM.addView("#page__view-holder", new Views.login(new Sessions()));
                    this.VM.addView("#page__view-holder", new Views.game());
                    this.VM.addView("#page__view-holder", new Views.scoreboard());
                    console.log("[!] ROUTER built!");
                },

                defaultAction: function () {
                    this.VM.getView("main").show();
                    $("#start").hide();
                },

                scoreboardAction: function () {
                    console.log("Scoreboard action showing...");
                    this.VM.getView("scoreboard").show();
                },

                gameAction: function () {
                    this.VM.getView("game").show();
                },

                loginAction: function () {
                    this.VM.getView("login").show();
                },

                logoutAction: function() {
                    
                }
            });

        return new Router();
    }

);