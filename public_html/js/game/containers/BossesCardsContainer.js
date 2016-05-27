'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['jquery', 'backbone', './AbstractCardContainerModel', '../cards/CardBossModel', '../EventsConfig'], function ($, Backbone, AbstractCardContainerModel, CardBossModel, Events) {
    return function (_AbstractCardContaine) {
        _inherits(BossesCardsContainer, _AbstractCardContaine);

        function BossesCardsContainer(loaderRes) {
            _classCallCheck(this, BossesCardsContainer);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BossesCardsContainer).call(this));

            _this.createBossCard(loaderRes);
            return _this;
        }

        _createClass(BossesCardsContainer, [{
            key: 'createBossCard',
            value: function createBossCard(loaderRes) {
                this.bossCard = new CardBossModel(loaderRes);
                this.cardCollection.push(this.bossCard);
                this.trigger(Events.Game.AbstractCardContainerModel.AddChild, this.bossCard);
            }
        }]);

        return BossesCardsContainer;
    }(AbstractCardContainerModel);
});
