"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', 'underscore', 'backbone', 'settings', 'pixi', '../Settings', '../EventsConfig'], function ($, _, Backbone, Settings, pixi, SETTING, Events) {
    var CardContainerView = function () {
        function CardContainerView(interactive, buttonMode) {
            var visible = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

            _classCallCheck(this, CardContainerView);

            _.extend(this, Backbone.Events);

            this.containerView = new pixi.Container();
            this.containerView.interactive = interactive;
            this.containerView.buttonMode = buttonMode;
            this.containerView.visible = visible;
            this.textField = {};
            this.graphics = [];
            this.on(Events.Game.CardContainerView.RemoveGapsInContainer, function () {
                this.removeGapsInDeck();
            }, this);

            this.on(Events.Game.CardContainerView.AddChild, function (sprite) {
                this.containerView.addChild(sprite);
            }, this);
        }

        _createClass(CardContainerView, [{
            key: 'setClickEventsListener',
            value: function setClickEventsListener(player, containerModel) {
                this.containerView.on('click', function () {
                    this.onClickContainer(player, containerModel);
                }, this);
            }
        }, {
            key: 'cleanClickEventsListener',
            value: function cleanClickEventsListener() {
                this.containerView.off('click');
            }
        }, {
            key: 'onClickContainer',
            value: function onClickContainer(player, containerModel) {
                player.trigger(Events.Game.AbstractPlayer.AddInfoCardToBattlesContainer, containerModel);
            }
        }, {
            key: 'edgingVisible',
            value: function edgingVisible(value) {
                this.graphics[0].visible = value;
                this.containerView.off('mouseover');
                this.containerView.off('mouseout');
            }
        }, {
            key: 'edgingEventsSetter',
            value: function edgingEventsSetter(graph, isListen) {
                if (isListen) {
                    this.containerView.on('mouseover', function () {
                        this.visible = true;
                    }, graph);
                    this.containerView.on('mouseout', function () {
                        this.visible = false;
                    }, graph);
                } else {
                    this.containerView.off('mouseover');
                    this.containerView.off('mouseout');
                }
            }
        }, {
            key: 'createTextField',
            value: function createTextField(name, str) {
                var x = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
                var y = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

                if (!this.textField[name]) {
                    this.textField[name] = new pixi.Text(str);
                    this.textField[name].x = x;
                    this.textField[name].y = y;
                    this.textField[name].anchor.x = 0;
                    this.textField[name].anchor.y = 0.5;
                    this.containerView.addChild(this.textField[name]);
                }
            }
        }, {
            key: 'setTextField',
            value: function setTextField(name, str, x, y) {
                if (this.textField[name]) {
                    this.textField[name].text = str;
                    if (x && y) {
                        this.textField[name].x = x;
                        this.textField[name].y = y;
                    }
                } else {
                    this.createTextField(name, str, x, y);
                }
            }
        }, {
            key: 'addChildToContainer',
            value: function addChildToContainer(child, x, y) {
                this.containerView.addChild(child);
                child.x = x;
                child.y = y;
            }
        }, {
            key: 'removeGapsInDeck',
            value: function removeGapsInDeck(cardCollection) {
                this.createPlayersDeck(cardCollection);
            }
        }, {
            key: 'createHitArea',
            value: function createHitArea(width, height) {
                this.containerView.hitArea = new pixi.Rectangle(0, 0, width, height);
            }
        }, {
            key: 'createGraphicsEdging',
            value: function createGraphicsEdging(width, height) {
                var worldVisible = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
                var x = arguments.length <= 3 || arguments[3] === undefined ? 3 : arguments[3];
                var y = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];

                var graph = new pixi.Graphics();
                this.graphics.push(graph);
                this.containerView.addChild(graph);
                graph.beginFill(0xffae80, 0.15);
                graph.lineStyle(3, 0xff8e4d, 0.3);
                graph.drawRect(x, y, width + 2 * SETTING.indentOfTheGraphics, height);
                graph.visible = false;
                graph.myWorldVisible = worldVisible;
                if (graph.myWorldVisible) {
                    this.edgingEventsSetter(graph, true);
                }
            }
        }, {
            key: 'setContainerPosition',
            value: function setContainerPosition(container, x, y) {
                container.addChild(this.containerView);
                this.containerView.x = x;
                this.containerView.y = y;
            }
        }, {
            key: 'negativeClimb',
            value: function negativeClimb(cardCollection, climb) {
                var sprite = void 0;
                sprite = cardCollection[0].cardView.sprite;
                sprite.x = sprite.width / 2 + SETTING.indentOfTheGraphics + SETTING.indentOfTheContainer;
                sprite.y = sprite.height / 2;
                sprite.anchor.set(0.5);
                this.containerView.addChild(sprite);
                for (var i = 1; i < cardCollection.length; i += 1) {
                    sprite = cardCollection[i].cardView.sprite;
                    sprite.x = (sprite.width + climb + SETTING.indentOfTheGraphics) * i + sprite.width / 2 + SETTING.indentOfTheContainer;

                    sprite.y = sprite.height / 2;
                    sprite.anchor.set(0.5);
                    this.containerView.addChild(sprite);
                }
            }
        }, {
            key: 'positiveClimb',
            value: function positiveClimb(cardCollection, climb) {
                var sprite = void 0;
                for (var i = 0; i < cardCollection.length; i += 1) {
                    sprite = cardCollection[i].cardView.sprite;
                    sprite.x = (sprite.width + SETTING.indentOfTheGraphics) * i + sprite.width / 2 + climb + SETTING.indentOfTheContainer;
                    sprite.y = sprite.height / 2;
                    sprite.anchor.set(0.5);
                    this.containerView.addChild(sprite);
                }
            }
        }, {
            key: 'createPlayersDeck',
            value: function createPlayersDeck(cardCollection) {
                var lengthOfCardCollection = SETTING.cardWidth * cardCollection.length,
                    climb = 0;
                if (SETTING.deckWidth - SETTING.indentOfTheContainer * 2 >= lengthOfCardCollection) {
                    climb = (SETTING.deckWidth - lengthOfCardCollection - SETTING.indentOfTheContainer * 2) / 2;
                    this.positiveClimb(cardCollection, climb);
                } else {
                    climb = SETTING.cardWidth - (SETTING.deckWidth - SETTING.indentOfTheContainer * 2 - SETTING.cardWidth - SETTING.indentOfTheGraphics * (cardCollection.length - 3)) / (cardCollection.length - 1);
                    climb = -climb;
                    this.negativeClimb(cardCollection, climb);
                }
            }
        }, {
            key: 'setPositionInContainer',
            value: function setPositionInContainer(object, x, y) {
                object.x = x;
                object.y = y;
                object.anchor.set(0.5);
                this.containerView.addChild(object);
            }
        }]);

        return CardContainerView;
    }();

    return CardContainerView;
});
