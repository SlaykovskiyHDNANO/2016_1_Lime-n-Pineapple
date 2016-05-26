"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', 'underscore', 'backbone', 'settings', 'pixi', './Settings', './EventsConfig'], function ($, _, Backbone, Settings, pixi, SETTINGS, Events) {
    var AbstractCardContainerModel = function () {
        function AbstractCardContainerModel(cardContainerView) {
            _classCallCheck(this, AbstractCardContainerModel);

            _.extend(this, Backbone.Events);
            this.cardCollection = [];
            this.containerView = cardContainerView;
            this.on(Events.Game.AbstractCardContainerModel.SetContainerPosition, function (container, positionX, positionY) {
                this.setContainerPosition(container, positionX, positionY);
            }, this).on(Events.Game.AbstractCardContainerModel.SetPositionInContainer, function (object, x, y) {
                if (x && y) {
                    this.containerView.setPositionInContainer(object, x, y);
                } else {
                    var pX = void 0,
                        pY = void 0;
                    pX = this.cardCollection.length * object.width + object.width / 2 + 3;
                    pY = object.height / 2;
                    this.containerView.setPositionInContainer(object, pX, pY);
                }
            }, this).on(Events.Game.AbstractCardContainerModel.SetCardToCardCollection, function (cardModel) {
                this.cardCollection.push(cardModel);
            }, this).on(Events.Game.AbstractCardContainerModel.AddChild, function (cardModel) {
                this.containerView.containerView.addChild(cardModel.cardView.sprite);
            }, this).on(Events.Game.AbstractCardContainerModel.CreateText, function (name, str, x, y) {
                this.containerView.createTextField(name, str, x, y);
            }, this).on(Events.Game.AbstractCardContainerModel.UpdateText, function (name, str, x, y) {
                this.containerView.setTextField(name, str, x, y);
            }, this).on(Events.Game.AbstractCardContainerModel.UpdateContainersScoreAfterAddedInfoCard, function () {
                var score = this.cardCollection[this.cardCollection.length - 1].power + parseInt(this.containerView.textField.score.text);
                score.toString();
                this.containerView.setTextField("score", score);
            }, this).on(Events.Game.AbstractCardContainerModel.AddChildToBattle, function (childModel) {
                var x = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
                var y = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

                this.addChildToContainer(childModel, x, y);
            }, this).on(Events.Game.AbstractCardContainerModel.GraphicsVisible, function (value) {
                this.containerView.edgingVisible(value);
            }, this).on(Events.Game.AbstractCardContainerModel.SetGraphicsListener, function (isListen) {
                this.containerView.edgingEventsSetter(this.containerView.graphics[0], isListen);
            }, this).on(Events.Game.AbstractCardContainerModel.SetClickListener, function (player) {
                this.containerView.setClickEventsListener(player, this);
            }, this).on(Events.Game.AbstractCardContainerModel.CleanClickListener, function () {
                this.containerView.cleanClickEventsListener();
            }, this).on(Events.Game.AbstractCardContainerModel.RemoveGapsInContainer, function () {
                this.containerView.removeGapsInDeck(this.cardCollection);
            }, this);

            $(this).one(Events.Game.AbstractCardContainerModel.CreateGraphics, function (event, width, height, worldVisible, x, y) {
                this.containerView.createHitArea(width, height);
                if (x && y) {
                    this.containerView.createGraphicsEdging(width, height, worldVisible, x, y);
                } else {
                    this.containerView.createGraphicsEdging(width, height, worldVisible);
                }
            }.bind(this));
        }

        _createClass(AbstractCardContainerModel, [{
            key: 'addChildToContainer',
            value: function addChildToContainer(childModel, x, y) {
                var child = childModel.cardView;
                if (x && y) {
                    this.containerView.addChildToContainer(childModel.cardView.sprite, x, y);
                } else {
                    x = this.cardCollection.length * (3 + child.sprite.width) + child.sprite.width / 2 + 3;
                    y = child.sprite.height / 2;
                    console.log(x, y);
                    this.containerView.addChildToContainer(childModel.cardView.sprite, x, y);
                }
                this.cardCollection.push(childModel);
            }

            // nice work

        }, {
            key: 'setContainerPosition',
            value: function setContainerPosition(container, positionX, positionY) {
                this.containerView.setContainerPosition(container, positionX, positionY);
            }
        }, {
            key: 'deleteCardFromCardCollection',
            value: function deleteCardFromCardCollection(cardModel) {
                for (var i = 0; i < this.cardCollection.length; i += 1) {
                    if (this.cardCollection[i].id === cardModel.id) {
                        this.cardCollection.splice(i, 1);
                    }
                }
            }
        }]);

        return AbstractCardContainerModel;
    }();

    return AbstractCardContainerModel;
});
