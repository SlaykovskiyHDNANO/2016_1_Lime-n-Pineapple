"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['jquery', 'backbone', 'pixi', '../containers/AbstractCardContainerModel', '../containers/CardContainerModel', '../containers/PlayersCardsDeck', './AbstractPlayer', '../Settings', '../EventsConfig'], function ($, Backbone, pixi, AbstractCardContainerModel, CardContainerModel, PlayersCardsDeck, AbstractPlayer, SETTINGS, Events) {
    var Player = function (_AbstractPlayer) {
        _inherits(Player, _AbstractPlayer);

        function Player(loaderRes, playersField) {
            _classCallCheck(this, Player);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Player).call(this, loaderRes, playersField));

            _this.playersCardsDeck = new PlayersCardsDeck(_this.cardCollection);
            _this.createDeck();
            _this.playersBattleInfoCardContainer = new CardContainerModel();

            _this.on(Events.Game.Player.PlayerAct, function () {
                this.act();
            }, _this);
            $(_this).on(Events.Backbone.SomeObject.SendStage, function (event, stage) {
                this.stage = stage;
            }.bind(_this));
            Backbone.trigger(Events.Backbone.Renderer.GetStage, _this);

            _this.playersContainerBoss.setContainerPosition(_this.stage, 10, 3 * SETTINGS.oneLineHeight);
            _this.playersContainerBoss.createGraphicsEdging(SETTINGS.battleContainerPositionX - 10, SETTINGS.oneLineHeight, false);
            _this.playersContainerBoss.trigger(Events.Game.AbstractCardContainerModel.CreateText, "score", "0", SETTINGS.cardWidth * 1.5, SETTINGS.oneLineHeight / 2);
            _this.playersContainerBoss.trigger(Events.Game.PlayersContainer.PreparedForBattle);

            var _loop = function _loop(i) {
                _this.setTouchEventCard(_this.cardCollection[i]);
                _this.listenTo(_this.cardCollection[i], Events.Game.Player.CardViewPressed, function () {
                    this.cardViewWasPressed(this.cardCollection[i]);
                }, _this);
            };

            for (var i = 0; i < _this.cardCollection.length; i += 1) {
                _loop(i);
            }
            return _this;
        }

        _createClass(Player, [{
            key: 'cardViewWasPressed',
            value: function cardViewWasPressed(cardModel) {
                this.touchedCards.push(cardModel);
                if (this.infoCard.isHide) {
                    console.log("ololo");
                    this.infoCard.trigger(Events.Game.InfoCardModel.ShowInfoCard, cardModel);
                    this.infoCard.alreadyGoingBack = false;
                } else {
                    this.createNewInfoCard();
                }
            }
        }, {
            key: 'act',
            value: function act() {}
        }, {
            key: 'setTouchEventCard',
            value: function setTouchEventCard(card) {
                card.trigger(Events.Game.AbstractCardModel.SetTouchEventCard, this);
            }
        }, {
            key: 'createDeck',
            value: function createDeck() {
                this.playersCardsDeck.createPlayersDeck();
            }
        }]);

        return Player;
    }(AbstractPlayer);

    return Player;
});
