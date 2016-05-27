"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['backbone', 'underscore', 'pixi', './CardView', './AbstractCardModel', '../EventsConfig'], function (Backbone, _, pixi, CardView, AbstractCardModel, Events) {
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
            _this.setTouchEventForBossCard();
            return _this;
        }

        _createClass(CardBoss, [{
            key: 'setTouchEventForBossCard',
            value: function setTouchEventForBossCard() {
                this.cardView.sprite.on('click', function () {}, this);
            }
        }]);

        return CardBoss;
    }(AbstractCardModel);

    return CardBoss;
});
