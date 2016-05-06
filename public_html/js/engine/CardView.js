"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['backbone', 'underscore', 'pixi'], function (Backbone, _, pixi) {
    var Card = function () {
        function Card(loaderRes, oneLineHeight) {
            _classCallCheck(this, Card);

            this.texture = new pixi.Texture.fromImage(loaderRes['card' + (Math.floor(Math.random() * (8 - 1 + 1)) + 1)].url);
            this.sprite = new pixi.Sprite(this.texture);
            this.sprite.interactive = true;
            this.sprite.buttonMode = true;
            this.sprite.width = this.sprite.width * oneLineHeight * 1.2 / this.sprite.height;
            this.sprite.height = oneLineHeight;
            _.extend(this, Backbone.Events);
        }

        _createClass(Card, [{
            key: 'onClickCard',
            value: function onClickCard(event, cardModel) {
                switch (event.data.originalEvent.which) {
                    case 1:
                        if (this.sprite.alpha === 0.1) {
                            cardModel.trigger("InfoCardBackToDeck");
                        } else {
                            this.sprite.alpha = 0.1;
                            this.on("AlphaVisible", function () {
                                this.sprite.alpha = 1;
                                this.off("AlphaVisible");
                            }, this);
                            cardModel.trigger("CardViewPressed");
                        }
                        break;
                }
            }
        }, {
            key: 'setTouchEventCard',
            value: function setTouchEventCard(cardModel) {
                this.sprite.on('click', function (event) {
                    this.onClickCard(event, cardModel);
                }, this).on('touchstart', function (event) {
                    this.onClickCard(event, cardModel);
                }, this);
            }
        }, {
            key: 'setPositionIntoDeck',
            value: function setPositionIntoDeck(index, containerView) {
                this.sprite.x = this.sprite.width * index + 2 * index + this.sprite.width / 2;
                this.sprite.y = this.sprite.y + this.sprite.height / 2;
                this.sprite.anchor.set(0.5);
                containerView.trigger("AddChild", this.sprite);
            }
        }]);

        return Card;
    }();

    return Card;
});
