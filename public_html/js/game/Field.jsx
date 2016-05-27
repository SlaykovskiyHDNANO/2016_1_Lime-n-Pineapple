"use strict";
define([
        'jquery',
        'backbone',
        'underscore',
        './containers/CardContainerModel',
        './Settings',
        './EventsConfig'
    ],
    function ($, Backbone, _, CardContainerModel, SETTINGS, Events) {
        return class Field {
            constructor(isBot = false) {
                this.playersCardContainerMelee = new CardContainerModel();
                this.playersCardContainerDistant = new CardContainerModel();
                this.enemyCardContainerMelee = new CardContainerModel();
                this.enemyCardContainerDistant = new CardContainerModel();

                if (!isBot) {
                    this.battlesContainer = {
                        playersCardContainerDistant : this.playersCardContainerDistant,
                        playersCardContainerMelee   : this.playersCardContainerMelee,
                        enemyCardContainerMelee     : this.enemyCardContainerMelee,
                        enemyCardContainerDistant   : this.enemyCardContainerDistant
                    };
                }
                else{
                    this.battlesContainer = {
                        enemyCardContainerDistant   :    this.playersCardContainerDistant,
                        enemyCardContainerMelee     :    this.playersCardContainerMelee,
                        playersCardContainerMelee   :    this.enemyCardContainerMelee,
                        playersCardContainerDistant :    this.enemyCardContainerDistant
                    };
                }

                if (!isBot){
                    this.prepareContainersForBattle();
                }

            }

            prepareContainersForBattle(){
                $(this).on(Events.Backbone.SomeObject.SendStage, function (event, stage) {
                    let i = 3;
                    _.forEach(this.battlesContainer, function (value, key, iter) {
                        iter[key].setContainerPosition(stage, SETTINGS.battleContainerPositionX, i * SETTINGS.oneLineHeight);
                        iter[key].createGraphicsEdging(SETTINGS.deckWidth, SETTINGS.oneLineHeight);
                        iter[key].trigger(Events.Game.AbstractCardContainerModel.CreateText, "score", "0",
                            SETTINGS.deckWidth + SETTINGS.indentOfTheScoresForField, SETTINGS.oneLineHeight / 2);
                        i -= 1;
                    }, this);
                }.bind(this));
                Backbone.trigger(Events.Backbone.Renderer.GetStage, this);

            }

            definitionCardsClasses(cardModel){
                this.nowActiveContainer = [];
                this.playersCardContainerMelee.trigger(Events.Game.AbstractCardContainerModel.GraphicsVisible, cardModel.disposableContainers.melee);
                if (cardModel.disposableContainers.melee){
                    this.playersCardContainerMelee.trigger(Events.Game.AbstractCardContainerModel.SetClickListener, this);
                    this.nowActiveContainer.push(this.playersCardContainerMelee);
                }

                this.playersCardContainerDistant.trigger(Events.Game.AbstractCardContainerModel.GraphicsVisible, cardModel.disposableContainers.distant);
                if (cardModel.disposableContainers.distant){
                    this.playersCardContainerDistant.trigger(Events.Game.AbstractCardContainerModel.SetClickListener, this);
                    this.nowActiveContainer.push(this.playersCardContainerDistant);
                }

                this.enemyCardContainerMelee.trigger(Events.Game.AbstractCardContainerModel.GraphicsVisible, cardModel.disposableContainers.enemyMelee);
                if (cardModel.disposableContainers.enemyMelee){
                    this.enemyCardContainerMelee.trigger(Events.Game.AbstractCardContainerModel.SetClickListener, this);
                    this.nowActiveContainer.push(this.enemyCardContainerMelee);
                }

                this.enemyCardContainerDistant.trigger(Events.Game.AbstractCardContainerModel.GraphicsVisible, cardModel.disposableContainers.enemyDistant);
                if (cardModel.disposableContainers.enemyDistant){
                    this.enemyCardContainerDistant.trigger(Events.Game.AbstractCardContainerModel.SetClickListener, this);
                    this.nowActiveContainer.push(this.enemyCardContainerDistant);
                }
            }

            cleanClickListenerForContainers(){
                _.forEach(this.battlesContainer, function (value, key, iter) {
                    iter[key].trigger(Events.Game.AbstractCardContainerModel.CleanClickListener);
                }, this);
            }


        };
    }
);