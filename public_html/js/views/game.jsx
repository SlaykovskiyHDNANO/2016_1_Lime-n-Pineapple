'use strict';

define(['jquery', 'underscore', 'backbone', 'settings', 'pixi', './baseView', 'tmpl/game', '../game/loader'], function ($, _, Backbone, Settings, pixi, BaseView, tmpl, Loader) {
    var Game = BaseView.extend({
        template: tmpl,
        defaults: {
            'renderer': "null",
            'domID': "game_window"
        },

        initialize: function initialize() {
            BaseView.prototype.initialize.call(this);
            this.domID = this.defaults.domID;
            this.name = "game";
        },

        show: function show() {
            BaseView.prototype.show.call(this);
            $("#page__site-header").addClass("topped");
        },

        hide: function hide() {
            BaseView.prototype.hide.call(this);
            $("#page__site-header").removeClass("topped");
        },

        render: function render() {
            BaseView.prototype.render.call(this);
            this.loader = new Loader(this.el, this.domID);
        }

    });
    return Game;
});
