"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', 'underscore', 'backbone', 'pixi', './players/player', './players/bot_player', './Field', './Settings', './EventsConfig'], function ($, _, Backbone, pixi, Player, Bot, Field, SETTINGS, Events) {
    var Engine = function () {
        function Engine(loaderRes, isServerAvailable) {
            _classCallCheck(this, Engine);

            Backbone.on(Events.Backbone.All.AllRendered, function () {
                this.playersField = new Field(false);
                this.player = new Player(loaderRes, this.playersField);
                if (!isServerAvailable) {
                    this.botsField = new Field(true);
                    this.bot = new Bot(loaderRes, this.botsField);
                    var whoFirst = Math.floor(Math.random() * 2 + 1);
                    this.singleGame(whoFirst);
                }
            });
            Backbone.trigger(Events.Backbone.Renderer.GameRender);
        }

        _createClass(Engine, [{
            key: 'singleGame',
            value: function singleGame(whoFirst) {
                if (whoFirst % 2 === 0 && whoFirst % 2) {
                    this.player.trigger(Events.Game.AbstractPlayer.Act);
                } else if (whoFirst % 2) {
                    this.bot.trigger(Events.Game.AbstractPlayer.Act);
                }
            }
        }]);

        return Engine;
    }();

    return Engine;
});
