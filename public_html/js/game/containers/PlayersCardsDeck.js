"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['jquery', 'underscore', 'backbone', '../Settings', 'pixi', '../containers/AbstractCardContainerModel', '../EventsConfig'], function ($, _, Backbone, SETTINGS, pixi, AbstractCardContainerModel, Events) {
    var PlayerCardsDeck = function (_AbstractCardContaine) {
        _inherits(PlayerCardsDeck, _AbstractCardContaine);

        function PlayerCardsDeck(cardCollection) {
            _classCallCheck(this, PlayerCardsDeck);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PlayerCardsDeck).call(this));

            _this.cardCollection = cardCollection;
            $(_this).on(Events.Backbone.SomeObject.SendStage, function (event, stage) {
                this.setContainerPosition(stage, SETTINGS.battleContainerPositionX, 4 * SETTINGS.oneLineHeight);
                this.createGraphicsEdging(SETTINGS.deckWidth, SETTINGS.oneLineHeight);
                Backbone.off(Events.Backbone.All.AllRendered);
            }.bind(_this));
            Backbone.trigger(Events.Backbone.Renderer.GetStage, _this);

            _this.on(Events.Game.PlayersCardsDeck.RemoveGapsInDeck, function () {
                this.View.removeGapsInDeck(this.cardCollection);
            }, _this).on(Events.Game.PlayersCardsDeck.DeleteCardFromCardCollection, function (card) {
                this.deleteCardFromCardCollection(card);
            });

            Backbone.on(Events.Game.PlayersCardsDeck.GetDeckWidth, function (getWidth) {
                getWidth(this.containerView.containerView.width);
            }, _this);
            return _this;
        }

        _createClass(PlayerCardsDeck, [{
            key: 'createPlayersDeck',
            value: function createPlayersDeck() {
                this.View.createPlayersDeck(this.cardCollection);
            }
        }]);

        return PlayerCardsDeck;
    }(AbstractCardContainerModel);

    return PlayerCardsDeck;
});
