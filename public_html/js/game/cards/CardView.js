"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['backbone', 'underscore', 'pixi', 'jquery', './Settings', './EventsConfig'], function (Backbone, _, pixi, $, SETTINGS, Events) {
    var CardView = function () {
        function CardView(url) {
            _classCallCheck(this, CardView);

            this.sprite = new pixi.Sprite(new pixi.Texture.fromImage(url));
            this.sprite.interactive = true;
            this.sprite.buttonMode = true;
            this.sprite.width = SETTINGS.cardWidth;
            this.sprite.height = SETTINGS.oneLineHeight;
            _.extend(this, Backbone.Events);
        }

        _createClass(CardView, [{
            key: 'changeClickListenerToBattleFieldListener',
            value: function changeClickListenerToBattleFieldListener(cardModel) {
                this.sprite.off('click');

                this.sprite.on('click', function () {
                    this.onClickBattleCard(cardModel);
                }, this);
            }
        }, {
            key: 'createBattlesInfoCard',
            value: function createBattlesInfoCard(playerOwner) {
                this.battlesInfoCard = new pixi.Sprite(this.sprite.texture);
                this.battlesInfoCard.interactive = true;
                this.battlesInfoCard.buttonMode = true;
                this.battlesInfoCard.width = SETTINGS.cardWidth * 3;
                this.battlesInfoCard.height = SETTINGS.oneLineHeight * 3;
                this.battlesInfoCard.x = this.battlesInfoCard.width / 2;
                this.battlesInfoCard.y = this.battlesInfoCard.height / 2;
                this.battlesInfoCard.anchor.set(0.5);
                $(playerOwner).trigger(Events.Game.AbstractPlayer.BattlesInfoCardCreated);
            }
        }, {
            key: 'deleteBattlesInfoCard',
            value: function deleteBattlesInfoCard() {
                delete this.battlesInfoCard;
            }
        }, {
            key: 'onClickBattleCard',
            value: function onClickBattleCard(cardModel) {
                cardModel.trigger(Events.Game.AbstractCardModel.ShowInfoBattleCard);
            }
        }, {
            key: 'onClickCard',
            value: function onClickCard(cardModel) {
                if (this.sprite.alpha === 0.1) {
                    cardModel.trigger(Events.Game.AbstractCardModel.InfoCardBackToDeck);
                } else {
                    this.sprite.alpha = 0.1;
                    this.on(Events.Game.CardView.AlphaVisible, function () {
                        this.sprite.alpha = 1;
                        this.off(Events.Game.CardView.AlphaVisible);
                    }, this);
                    cardModel.trigger(Events.Game.AbstractCardModel.CardViewPressed);
                }
            }
        }, {
            key: 'cleanClickEventCard',
            value: function cleanClickEventCard() {
                this.sprite.off('click');
            }
        }, {
            key: 'setClickEventCard',
            value: function setClickEventCard(cardModel) {
                this.sprite.on('click', function () {
                    this.onClickCard(cardModel);
                }, this);
            }
        }, {
            key: 'onMouseOver',
            value: function onMouseOver() {
                var filter = new pixi.filters.ColorMatrixFilter();
                this.sprite.filters = [filter];
                filter.brightness(1.5);
                this.sprite.y -= 10;
            }
        }, {
            key: 'onMouseOut',
            value: function onMouseOut() {
                this.sprite.y += 10;
                this.sprite.filters = null;
            }
        }, {
            key: 'setTouchEventCard',
            value: function setTouchEventCard(cardModel) {
                this.sprite.on('click', function () {
                    this.onClickCard(cardModel);
                }, this).on('mouseover', function () {
                    this.onMouseOver();
                }, this).on('mouseout', function () {
                    this.onMouseOut();
                }, this);
            }
        }, {
            key: 'setPosition',
            value: function setPosition(x, y) {
                this.sprite.x = x;
                this.sprite.y = y;
            }
        }, {
            key: 'setPositionIntoContainer',
            value: function setPositionIntoContainer(index, containerView) {
                this.sprite.x = this.sprite.width * index + 3 + this.sprite.width / 2;
                this.sprite.y = this.sprite.y + this.sprite.height / 2;
                this.sprite.anchor.set(0.5);
                containerView.trigger(Events.Game.CardContainerView.AddChild, this.sprite);
            }
        }]);

        return CardView;
    }();

    return CardView;
});
