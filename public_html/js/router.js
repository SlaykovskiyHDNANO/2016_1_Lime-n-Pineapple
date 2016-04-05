define([
        'jquery',
        'underscore',
        'backbone',
        'views/all_views',
        'views/view_manager',
        'models/session'
],
    function ($, underscore, Backbone, Views, VM, Session) {
        VM.addArray([
            Views.main,
            Views.scoreboard,
            Views.game,
            Views.login,
            Views.logout,
            Views.btnBack
        ]);

        var Router = Backbone.Router.extend({
                routes: {
                    "game": "gameAction",
                    "scoreboard": "scoreboardAction",
                    "login": "loginAction",
                    "logout": "logoutAction",
                    "*default": "defaultAction"
                },

                _setTagNameViewsEl: function (view, wantTagName) {
                    if (view !== undefined && (view.$el.tagName === undefined || (wantTagName && wantTagName.isString()))) {
                            view.$el.appendTo($(wantTagName));
                            view.render();
                    }
                },

                initialize: function () {

                    this._setTagNameViewsEl(Views.btnBack, "#view__btn_back");
                    this._setTagNameViewsEl(Views.game, "#page__view-holder");
                    this._setTagNameViewsEl(Views.main, "#page__view-holder");
                    this._setTagNameViewsEl(Views.scoreboard, "#page__view-holder");
                    this._setTagNameViewsEl(Views.login, "#page__view-holder");
                    // this["btn_back"] ==== this.btn_back !=== this."btn_back"
                    this.defaultAction();
                },

                defaultAction: function () {
                    Views.main.show();
                },

                scoreboardAction: function () {
                    Views.scoreboard.show();
                    Views.btnBack.show();
                },

                gameAction: function () {
                    //this.trigger("clickStart");
                    //Views.game._onSubmitEvent();
                    Views.game.show();
                },

                loginAction: function () {
                    Views.login.show();
                    Views.btnBack.show();
                },

                logoutAction: function() {
                    Views.logout.onSubmitEvent();
                }
            });

        return new Router();
    }

);