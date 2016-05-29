"use strict";
define([
        'jquery',
        'underscore',
        'backbone',
        'pixi',
        './players/player',
        './players/bot_player',
        './Field',
        './Settings',
        './EventsConfig'
    ], function ($, _, Backbone, pixi, Player, Bot, Field, SETTINGS, Events) {

        class Engine {

            constructor(loaderRes, isServerAvailable) {
                Backbone.on(Events.Backbone.All.AllRendered, function () {
                    this.playersField = new Field(false);
                    this.player = new Player(loaderRes, this.playersField);
                    if (!isServerAvailable){
                        this.botsField = new Field(true);
                        this.bot = new Bot(loaderRes, this.botsField);
                        let whoFirst = Math.floor(Math.random() * (2) + 1);
                        this.singleGame(whoFirst);
                    }
                });
                Backbone.trigger(Events.Backbone.Renderer.GameRender);
            }

            singleGame(whoFirst){
                if (whoFirst % 2 === 0 && whoFirst % 2){
                    this.player.trigger(Events.Game.AbstractPlayer.Act);
                }
                else if (whoFirst % 2){
                    this.bot.trigger(Events.Game.AbstractPlayer.Act);
                }
            }

        }
        return Engine;
    }
);

