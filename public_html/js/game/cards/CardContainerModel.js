"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

define(['jquery', 'underscore', 'backbone', 'settings', 'pixi', './AbstractCardContainerModel'], function ($, _, Backbone, Settings, pixi, AbstractCardContainerModel) {
    var CardContainerModel = function (_AbstractCardContaine) {
        _inherits(CardContainerModel, _AbstractCardContaine);

        function CardContainerModel(cardContainerView) {
            _classCallCheck(this, CardContainerModel);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(CardContainerModel).call(this, cardContainerView));
        }

        //onClickBattleField(event, container, actionCard, infoCard) {
        //    actionCard.mustX = container.children.length * actionCard.width + 2 + actionCard.width / 2;
        //    actionCard.mustY = container.y + actionCard.height / 2;
        //    this.stage.addChild(actionCard);
        //    actionCard.x = infoCard.x;
        //    actionCard.y = infoCard.y;
        //    this.removeGapsInDeck(this.containers.containerPlayer);
        //    Backbone.trigger("CardAreThrown", actionCard, container);
        //    Backbone.trigger("AIprocess");
        //}

        return CardContainerModel;
    }(AbstractCardContainerModel);

    return CardContainerModel;
});
