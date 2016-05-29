"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', 'underscore', 'backbone', '../../settings', 'pixi', '../Settings', '../EventsConfig', './CardContainerView'], function ($, _, Backbone, Settings, pixi, SETTINGS, Events, CardContainerView) {
    var AbstractCardContainerModel = function () {
        function AbstractCardContainerModel() {
            _classCallCheck(this, AbstractCardContainerModel);

            _.extend(this, Backbone.Events);
            this.cardCollection = [];
            this.View = new CardContainerView(true, true);
            this.on(Events.Game.AbstractCardContainerModel.SetContainerPosition, function (container, positionX, positionY) {
                this.setContainerPosition(container, positionX, positionY);
            }, this).on(Events.Game.AbstractCardContainerModel.SetPositionInContainer, function (object, x, y) {
                if (x && y) {
                    this.View.setPositionInContainer(object, x, y);
                } else {
                    var pX = void 0,
                        pY = void 0;
                    pX = this.cardCollection.length * object.width + object.width / 2 + 3;
                    pY = object.height / 2;
                    this.View.setPositionInContainer(object, pX, pY);
                }
            }, this).on(Events.Game.AbstractCardContainerModel.SetCardToCardCollection, function (cardModel) {
                this.cardCollection.push(cardModel);
            }, this).on(Events.Game.AbstractCardContainerModel.AddChild, function (cardModel) {
                this.View.containerView.addChild(cardModel.cardView.sprite);
            }, this).on(Events.Game.AbstractCardContainerModel.CreateText, function (name, str, x, y) {
                this.View.createTextField(name, str, x, y);
            }, this).on(Events.Game.AbstractCardContainerModel.UpdateText, function (name, str, x, y) {
                this.View.setTextField(name, str, x, y);
            }, this).on(Events.Game.AbstractCardContainerModel.UpdateContainersScoreAfterAddedInfoCard, function () {
                var score = this.cardCollection[this.cardCollection.length - 1].power + parseInt(this.View.textField.score.text);
                score.toString();
                this.View.setTextField("score", score);
            }, this).on(Events.Game.AbstractCardContainerModel.AddChildToBattle, function (childModel) {
                var x = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
                var y = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

                this.addChildToContainer(childModel, x, y);
            }, this).on(Events.Game.AbstractCardContainerModel.GraphicsVisible, function (value) {
                this.View.edgingVisible(value);
            }, this).on(Events.Game.AbstractCardContainerModel.SetGraphicsListener, function (isListen) {
                this.View.edgingEventsSetter(this.View.graphics[0], isListen);
            }, this).on(Events.Game.AbstractCardContainerModel.SetClickListener, function () {
                this.View.setClickEventsListener(this);
            }, this).on(Events.Game.AbstractCardContainerModel.CleanClickListener, function () {
                this.View.cleanClickEventsListener();
            }, this).on(Events.Game.AbstractCardContainerModel.RemoveGapsInContainer, function () {
                this.View.removeGapsInDeck(this.cardCollection);
            }, this);
        }

        _createClass(AbstractCardContainerModel, [{
            key: 'createGraphicsEdging',
            value: function createGraphicsEdging(width, height, worldVisible, x, y) {
                this.View.createHitArea(width, height);
                if (x && y) {
                    this.View.createGraphicsEdging(width, height, worldVisible, x, y);
                } else {
                    this.View.createGraphicsEdging(width, height, worldVisible);
                }
            }
        }, {
            key: 'addChildToContainer',
            value: function addChildToContainer(childModel, x, y) {
                var child = childModel.cardView;
                if (x && y) {
                    this.View.addChildToContainer(childModel.cardView.sprite, x, y);
                } else {
                    x = this.cardCollection.length * (3 + child.sprite.width) + child.sprite.width / 2 + 3;
                    y = child.sprite.height / 2;
                    console.log(x, y);
                    this.View.addChildToContainer(childModel.cardView.sprite, x, y);
                }
                this.cardCollection.push(childModel);
            }

            // nice work

        }, {
            key: 'setContainerPosition',
            value: function setContainerPosition(container, positionX, positionY) {
                this.View.setContainerPosition(container, positionX, positionY);
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
