"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['jquery', 'backbone', 'pixi', '../containers/AbstractCardContainerModel', '../containers/CardContainerModel', '../containers/PlayersCardsDeck', '../containers/PlayersContainer', './AbstractPlayer', '../Settings', '../EventsConfig'], function ($, Backbone, pixi, AbstractCardContainerModel, CardContainerModel, PlayersCardsDeck, PlayersContainer, AbstractPlayer, SETTINGS, Events) {
    var Player = function (_AbstractPlayer) {
        _inherits(Player, _AbstractPlayer);

        _createClass(Player, [{
            key: '_createPlayersContainerInfo',
            value: function _createPlayersContainerInfo() {
                this.enemyContainerBoss = new PlayersContainer();

                this.enemyContainerBoss.setContainerPosition(this.stage, 10, 0);
                this.enemyContainerBoss.createGraphicsEdging(SETTINGS.battleContainerPositionX - 10, SETTINGS.oneLineHeight, false);
                this.enemyContainerBoss.trigger(Events.Game.AbstractCardContainerModel.CreateText, "score", "0", SETTINGS.cardWidth * 1.5, SETTINGS.oneLineHeight / 2);
                this.enemyContainerBoss.trigger(Events.Game.PlayersContainer.PreparedForBattle);

                this.playersContainerBoss.setContainerPosition(this.stage, 10, 3 * SETTINGS.oneLineHeight);
                this.playersContainerBoss.createGraphicsEdging(SETTINGS.battleContainerPositionX - 10, SETTINGS.oneLineHeight, false);
                this.playersContainerBoss.trigger(Events.Game.AbstractCardContainerModel.CreateText, "score", "0", SETTINGS.cardWidth * 1.5, SETTINGS.oneLineHeight / 2);
                this.playersContainerBoss.trigger(Events.Game.PlayersContainer.PreparedForBattle);
            }
        }]);

        function Player(loaderRes, playersField) {
            _classCallCheck(this, Player);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Player).call(this, loaderRes, playersField));

            _this.playersCardsDeck = new PlayersCardsDeck(_this.cardCollection);
            _this.createDeck();

            // create events for cards and listenTo card's events by player

            var _loop = function _loop(i) {
                _this.setTouchEventCard(_this.cardCollection[i]);
                var card = _this.cardCollection[i];

                _this.listenTo(card, Events.Game.Player.CardViewPressed, function () {
                    this.cardViewWasPressed(card);
                }, _this).listenTo(card, Events.Game.AbstractCardModel.BackToDeck, function () {
                    this.infoCard.trigger(Events.Game.InfoCardModel.BackToDeck, card);
                }, _this);
            };

            for (var i = 0; i < _this.cardCollection.length; i += 1) {
                _loop(i);
            }

            _this.playersBattleInfoCardContainer = new CardContainerModel();
            _this.playersBattleInfoCardContainer.setContainerPosition(_this.stage, SETTINGS.infoBattleCardContainerPositionX, SETTINGS.infoBattleCardContainerPositionY);

            _this._createPlayersContainerInfo();

            _this.on(Events.Game.Player.InfoCardInContainer, function (cardModel) {
                console.log("Info card in container", cardModel);
                this.playersField.setGraphicsVisible(false);
                this.playersField.setGraphicsListener(true);
                cardModel.setClickEventCard();
            }, _this);

            _this.listenTo(_this.infoCard, Events.Game.Player.InfoCardInOwnContainer, function (cardModel) {
                this.infoCardCameToOwnContainer(cardModel);
            }, _this).listenTo(_this.playersField, Events.Game.Field.AddInfoCardToBattlesContainer, function (container) {
                this.addInfoCardToBattlesContainer(container);
            }, _this).listenTo(_this.playersField, Events.Game.AbstractCardContainerModel.UpdateText, function (name, value) {
                this.playersContainerBoss.trigger(Events.Game.AbstractCardContainerModel.UpdateText, name, value);
            }, _this);
            return _this;
        }

        _createClass(Player, [{
            key: 'cardViewWasPressed',
            value: function cardViewWasPressed(cardModel) {
                this.touchedCards.push(cardModel);
                console.log(this.touchedCards);
                if (this.infoCard.isHide) {
                    console.log("create New info card isHide = true");
                    this.infoCard.trigger(Events.Game.InfoCardModel.ShowInfoCard, cardModel);
                    this.infoCard.alreadyGoingBack = false;
                } else {
                    this.createNewInfoCard();
                }
            }
        }, {
            key: 'createNewInfoCard',
            value: function createNewInfoCard() {
                console.log("CreateNewInfoCard");
                this.playersField.cleanClickListenerForContainers();
                this.playersField.setGraphicsVisible(false);
                if (!this.infoCard.alreadyGoingBack) {
                    this.infoCard.alreadyGoingBack = !this.infoCard.alreadyGoingBack;
                    this.infoCard.trigger(Events.Game.InfoCardModel.BackToDeck, this.touchedCards[this.touchedCards.length - 2]);
                    this.playersField.setGraphicsVisible(false);
                    this.playersField.setGraphicsListener(true);
                }
                var newCard = this.touchedCards[this.touchedCards.length - 1];
                $(this.touchedCards[this.touchedCards.length - 2]).one(Events.Game.Player.PreviousInfoCardInDeck, function () {
                    this.cardViewWasPressed(newCard);
                }.bind(this));
            }
        }, {
            key: 'infoCardCameToOwnContainer',
            value: function infoCardCameToOwnContainer(cardModel) {
                this.playersField.definitionCardsClasses(cardModel);
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
        }, {
            key: 'addInfoCardToBattlesContainer',
            value: function addInfoCardToBattlesContainer(container) {
                if (this.touchedCards[this.touchedCards.length - 1]) {
                    this.touchedCards[this.touchedCards.length - 1].trigger(Events.Game.AbstractCardModel.ChangeClickListener);
                    this.infoCard.trigger(Events.Game.InfoCardModel.AddToBattlesContainer, this.touchedCards[this.touchedCards.length - 1], container);
                    this.touchedCards.length = 0;
                    this.playersField.cleanClickListenerForContainers();
                    this.playersField.setGraphicsVisible(false);
                    this.playersField.setGraphicsListener(true);
                }
            }
        }]);

        return Player;
    }(AbstractPlayer);

    return Player;
});
