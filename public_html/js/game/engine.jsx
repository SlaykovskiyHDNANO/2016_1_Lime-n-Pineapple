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
                    }
                });
                Backbone.trigger(Events.Backbone.Renderer.GameRender);


                    //this.container.enemyContainerBoss.trigger(Events.Game.AbstractCardContainerModel.SetContainerPosition, stage, 10, 0);
                    //$(this.container.enemyContainerBoss).trigger(Events.Game.AbstractCardContainerModel.CreateGraphics, [SETTINGS.battleContainerPositionX - 10,
                    //    SETTINGS.oneLineHeight, false]);
                    //this.container.enemyContainerBoss.trigger(Events.Game.AbstractCardContainerModel.CreateText, "score", "0", SETTINGS.cardWidth * 1.5, SETTINGS.oneLineHeight/2)
                    //this.container.enemyContainerBossCard.trigger(Events.Game.AbstractCardContainerModel.SetContainerPosition, this.container.enemyContainerBoss.containerView.containerView,
                    //    0, 0);
                    //$(this.container.enemyContainerBossCard).trigger(Events.Game.AbstractCardContainerModel.CreateGraphics, [SETTINGS.cardWidth,
                    //    SETTINGS.oneLineHeight]);
                    //
                    //this.container.playersInfoCardContainer.trigger(Events.Game.AbstractCardContainerModel.SetContainerPosition, stage,
                    //    SETTINGS.infoCardContainerPositionX, 2 * SETTINGS.oneLineHeight);
                    //
                    //this.container.playersBattleInfoCardContainer.trigger(Events.Game.AbstractCardContainerModel.SetContainerPosition, stage,
                    //    SETTINGS.infoBattleCardContainerPositionX, SETTINGS.infoBattleCardContainerPositionY);

                if (!isServerAvailable) {
                    let whoFirst = Math.floor(Math.random() * (2) + 1);
                    this.singleGame(whoFirst);
                }
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

