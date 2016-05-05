"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['jquery', 'underscore', 'backbone', 'settings', 'pixi', './AbstractCardContainerModel'], function ($, _, Backbone, Settings, pixi, AbstractCardContainerModel) {

    var oneLineHeight = $(window).height() / 6;
    var width = $(window).width();

    var PlayerCardsDeck = function (_AbstractCardContaine) {
        _inherits(PlayerCardsDeck, _AbstractCardContaine);

        function PlayerCardsDeck(cardContainerView) {
            _classCallCheck(this, PlayerCardsDeck);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PlayerCardsDeck).call(this, cardContainerView));

            _this.on("CreatePlayersDeck", function (cardCollection) {
                this.cardCollection = cardCollection;
                this.createCardDeck();
            }, _this);

            return _this;
        }

        _createClass(PlayerCardsDeck, [{
            key: 'createCardDeck',
            value: function createCardDeck() {
                this.cardCollection.trigger("SetPositionInDeck", this.containerView);
            }
        }]);

        return PlayerCardsDeck;
    }(AbstractCardContainerModel);

    return PlayerCardsDeck;
});
