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
            constructor(loaderRes) {
                this.field = new Field();
                //let
                //    playersContainerBossView = new CardContainerView(true, true),
                //    playersContainerBoss = new CardContainerModel(playersContainerBossView),
                //    playersContainerBossCardView = new CardContainerView(true, true),
                //    playersContainerBossCard = new CardContainerModel(playersContainerBossCardView),

                //    enemyContainerBossView = new CardContainerView(true, true),
                //    enemyContainerBoss = new CardContainerModel(enemyContainerBossView),
                //    enemyContainerBossCardView = new CardContainerView(true, true),
                //    enemyContainerBossCard = new CardContainerModel(enemyContainerBossCardView);

                //let playersInfoCardContainerView = new CardContainerView(false, false),
                //    playersInfoCardContainer = new CardContainerModel(playersInfoCardContainerView),
                //    playersBattleInfoCardContainerView = new CardContainerView(true, true),
                //    playersBattleInfoCardContainer = new CardContainerModel(playersBattleInfoCardContainerView);


                this.loaderRes = loaderRes;

                Backbone.on(Events.Backbone.All.AllRendered, function(stage){

                    //this.container.playersContainerBoss.trigger(Events.Game.AbstractCardContainerModel.SetContainerPosition, stage, 10, 3 * SETTINGS.oneLineHeight);
                    //$(this.container.playersContainerBoss).trigger(Events.Game.AbstractCardContainerModel.CreateGraphics, [SETTINGS.battleContainerPositionX - 10,
                    //    SETTINGS.oneLineHeight, false]);
                    //this.container.playersContainerBoss.trigger(Events.Game.AbstractCardContainerModel.CreateText, "score", "0", SETTINGS.cardWidth * 1.5, SETTINGS.oneLineHeight/2)
                    //this.container.playersContainerBossCard.trigger(Events.Game.AbstractCardContainerModel.SetContainerPosition, this.container.playersContainerBoss.containerView.containerView,
                    //    0, 0);
                    //$(this.container.playersContainerBossCard).trigger(Events.Game.AbstractCardContainerModel.CreateGraphics, [SETTINGS.cardWidth,
                    //    SETTINGS.oneLineHeight]);
                    //
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



                    this.engineWork();
                }, this);

                Backbone.trigger(Events.Backbone.Renderer.GameRender);
            }

            engineWork(){
                let containerPlayer = {
                    "playersCardsDeck"                  :   this.container.playersCardsDeck,
                    "playersCardContainerDistant"       :   this.container.playersCardContainerDistant,
                    "playersCardContainerMelee"         :   this.container.playersCardContainerMelee,
                    "playersContainerBoss"              :   this.container.playersContainerBoss,
                    "playersContainerBossCard"          :   this.container.playersContainerBossCard,
                    "playersInfoCardContainer"          :   this.container.playersInfoCardContainer,
                    "enemyCardContainerMelee"           :   this.container.enemyCardContainerMelee,
                    "enemyCardContainerDistant"         :   this.container.enemyCardContainerDistant,
                    "playersBattleInfoCardContainer"    :   this.container.playersBattleInfoCardContainer
                };

                let containerEnemy = {
                    "playersCardsDeck"                  :   this.container.enemyCardsDeck,
                    "playersCardContainerMelee"         :   this.container.enemyCardContainerMelee,
                    "playersCardContainerDistant"       :   this.container.enemyCardContainerDistant,
                    "playersContainerBoss"              :   this.container.enemyContainerBoss,
                    "playersContainerBossCard"          :   this.container.enemyContainerBossCard,
                    "playersInfoCardContainer"          :   this.container.playersInfoCardContainer,
                    "enemyCardContainerDistant"         :   this.container.playersCardContainerDistant,
                    "enemyCardContainerMelee"           :   this.container.playersCardContainerMelee,
                    "playersBattleInfoCardContainer"    :   this.container.playersBattleInfoCardContainer
                };

                this.player = new Player(this.loaderRes, containerPlayer);
                this.enemy  = new Bot   (this.loaderRes, containerEnemy);

                let whoFirst = Math.floor(Math.random() * (2) + 1);
                this.game(whoFirst);
            }

            game(whoFirst){
                if (whoFirst === 1 || whoFirst === 2){
                    this.player.trigger(Events.Game.AbstractPlayer.Act);
                }
                else if (whoFirst === 2){
                    this.enemy.trigger(Events.Game.AbstractPlayer.Act);
                }
            }
        }
        return Engine;
    }
);

