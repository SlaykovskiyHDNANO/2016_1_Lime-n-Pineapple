'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['jquery', 'backbone', './AbstractCardContainerModel', './BossesCardsContainer', '../EventsConfig', '../Settings'], function ($, Backbone, AbstractCardContainerModel, BossesCardsContainer, Events, SETTINGS) {
    return function (_AbstractCardContaine) {
        _inherits(PlayersContainer, _AbstractCardContaine);

        function PlayersContainer() {
            var loaderRes = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            _classCallCheck(this, PlayersContainer);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PlayersContainer).call(this));

            _this.loaderRes = loaderRes;
            _this.bossesCardsContainer = new BossesCardsContainer(loaderRes);
            console.log(Events);
            _this.on(Events.Game.PlayersContainer.PreparedForBattle, function () {
                this.bossesCardsContainer.setContainerPosition(this.View.containerView, 0, 0);
                this.bossesCardsContainer.createGraphicsEdging(SETTINGS.cardWidth, SETTINGS.oneLineHeight);
                this.off(Events.Game.PlayersContainer.PreparedForBattle);
            }, _this);

            return _this;
        }

        return PlayersContainer;
    }(AbstractCardContainerModel);
});
