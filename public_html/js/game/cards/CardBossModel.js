"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['backbone', 'underscore', 'pixi', './CardView', './AbstractCardModel'], function (Backbone, _, pixi, CardView, AbstractCardModel) {
    var CardBoss = function (_AbstractCardModel) {
        _inherits(CardBoss, _AbstractCardModel);

        function CardBoss(loaderRes) {
            _classCallCheck(this, CardBoss);

            var card = loaderRes[Math.floor(Math.random() * 3)];

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CardBoss).call(this, card.url));

            _this.url = card.url;
            _this.name = card.name;
            _this.power = card.power;
            _this.disposableContainers = card.disposableContainers;
            return _this;
        }

        return CardBoss;
    }(AbstractCardModel);

    return CardBoss;
});
