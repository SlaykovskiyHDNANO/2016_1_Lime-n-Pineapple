"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', 'backbone', 'underscore', './containers/CardContainerModel', './Settings', './EventsConfig'], function ($, Backbone, _, CardContainerModel, SETTINGS, Events) {
    return function () {
        function Field() {
            var isBot = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

            _classCallCheck(this, Field);

            _.extend(this, Backbone.Events);
            this.playersCardContainerMelee = new CardContainerModel();
            this.playersCardContainerDistant = new CardContainerModel();
            this.enemyCardContainerMelee = new CardContainerModel();
            this.enemyCardContainerDistant = new CardContainerModel();

            if (!isBot) {
                this.battlesContainer = {
                    playersCardContainerDistant: this.playersCardContainerDistant,
                    playersCardContainerMelee: this.playersCardContainerMelee,
                    enemyCardContainerMelee: this.enemyCardContainerMelee,
                    enemyCardContainerDistant: this.enemyCardContainerDistant
                };
            } else {
                this.battlesContainer = {
                    enemyCardContainerDistant: this.playersCardContainerDistant,
                    enemyCardContainerMelee: this.playersCardContainerMelee,
                    playersCardContainerMelee: this.enemyCardContainerMelee,
                    playersCardContainerDistant: this.enemyCardContainerDistant
                };
            }

            if (!isBot) {
                this.prepareContainersForBattle();
            }
        }

        _createClass(Field, [{
            key: 'prepareContainersForBattle',
            value: function prepareContainersForBattle() {
                $(this).on(Events.Backbone.SomeObject.SendStage, function (event, stage) {
                    var i = 3;
                    _.forEach(this.battlesContainer, function (value, key, iter) {
                        iter[key].setContainerPosition(stage, SETTINGS.battleContainerPositionX, i * SETTINGS.oneLineHeight);
                        iter[key].createGraphicsEdging(SETTINGS.deckWidth, SETTINGS.oneLineHeight);
                        iter[key].trigger(Events.Game.AbstractCardContainerModel.CreateText, "score", "0", SETTINGS.deckWidth + SETTINGS.indentOfTheScoresForField, SETTINGS.oneLineHeight / 2);

                        iter[key].on(Events.Game.Field.InfoCardAddedToBattle, function () {
                            var score = 0;
                            score += parseInt(this.playersCardContainerDistant.View.textField.score.text);
                            score += parseInt(this.playersCardContainerMelee.View.textField.score.text);
                            this.trigger(Events.Game.AbstractCardContainerModel.UpdateText, "score", score.toString());
                        }, this);

                        this.listenTo(iter[key], Events.Game.AbstractCardContainerModel.AddInfoCardToBattlesContainer, function (container) {
                            this.addInfoCardToBattle(container);
                        }.bind(this));
                        i -= 1;
                    }, this);
                }.bind(this));
                Backbone.trigger(Events.Backbone.Renderer.GetStage, this);
            }
        }, {
            key: 'definitionCardsClasses',
            value: function definitionCardsClasses(cardModel) {
                this.nowActiveContainer = [];
                this.playersCardContainerMelee.trigger(Events.Game.AbstractCardContainerModel.GraphicsVisible, cardModel.disposableContainers.melee);
                if (cardModel.disposableContainers.melee) {
                    this.playersCardContainerMelee.trigger(Events.Game.AbstractCardContainerModel.SetClickListener);
                    this.nowActiveContainer.push(this.playersCardContainerMelee);
                }

                this.playersCardContainerDistant.trigger(Events.Game.AbstractCardContainerModel.GraphicsVisible, cardModel.disposableContainers.distant);
                if (cardModel.disposableContainers.distant) {
                    this.playersCardContainerDistant.trigger(Events.Game.AbstractCardContainerModel.SetClickListener);
                    this.nowActiveContainer.push(this.playersCardContainerDistant);
                }

                this.enemyCardContainerMelee.trigger(Events.Game.AbstractCardContainerModel.GraphicsVisible, cardModel.disposableContainers.enemyMelee);
                if (cardModel.disposableContainers.enemyMelee) {
                    this.enemyCardContainerMelee.trigger(Events.Game.AbstractCardContainerModel.SetClickListener);
                    this.nowActiveContainer.push(this.enemyCardContainerMelee);
                }

                this.enemyCardContainerDistant.trigger(Events.Game.AbstractCardContainerModel.GraphicsVisible, cardModel.disposableContainers.enemyDistant);
                if (cardModel.disposableContainers.enemyDistant) {
                    this.enemyCardContainerDistant.trigger(Events.Game.AbstractCardContainerModel.SetClickListener);
                    this.nowActiveContainer.push(this.enemyCardContainerDistant);
                }
            }
        }, {
            key: 'cleanClickListenerForContainers',
            value: function cleanClickListenerForContainers() {
                _.forEach(this.battlesContainer, function (value, key, iter) {
                    iter[key].trigger(Events.Game.AbstractCardContainerModel.CleanClickListener);
                }, this);
            }
        }, {
            key: 'setGraphicsVisible',
            value: function setGraphicsVisible(bool) {
                _.forEach(this.battlesContainer, function (value, key, iter) {
                    iter[key].trigger(Events.Game.AbstractCardContainerModel.GraphicsVisible, bool);
                }, this);
            }
        }, {
            key: 'setGraphicsListener',
            value: function setGraphicsListener(bool) {
                _.forEach(this.battlesContainer, function (value, key, iter) {
                    iter[key].trigger(Events.Game.AbstractCardContainerModel.SetGraphicsListener, bool);
                }, this);
            }
        }, {
            key: 'addInfoCardToBattle',
            value: function addInfoCardToBattle(container) {
                this.trigger(Events.Game.Field.AddInfoCardToBattlesContainer, container);
            }
        }]);

        return Field;
    }();
});
