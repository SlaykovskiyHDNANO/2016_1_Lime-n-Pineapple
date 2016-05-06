"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', 'backbone', 'pixi', './card_collection', './InfoCardModel'], function ($, Backbone, pixi, CardCollection, InfoCardModel) {

    var oneLineHeight = $(window).height() / 6;
    var width = $(window).width();

    var AbstractPlayer = function () {
        function AbstractPlayer(loaderRes, container) {
            _classCallCheck(this, AbstractPlayer);

            _.extend(this, Backbone.Events);
            this.cardCollection = new CardCollection(loaderRes, oneLineHeight);
            if (container.playersCardsDeck !== undefined) {
                this.playersCardsDeck = container.playersCardsDeck;
            }
            this.playersCardContainerMelee = container.playersCardContainerMelee;
            this.playerCardContainerDistant = container.playersCardContainerDistant;

            this.on("Act", function () {
                this.trigger("PlayerAct");
            }, this).on("MustCreateInfoCard", function (card) {
                if (this.infoCard === undefined) {
                    this.infoCard = new InfoCardModel(card, this);
                    this.infoCard.card = card;
                } else {
                    this.infoCard.trigger("BackToDeckPrevious", this.infoCard.card);
                    this.on("PreviousInfoCardBackToDeck", function () {
                        this.off("PreviousInfoCardBackToDeck");
                        this.trigger("MustCreateInfoCard", card);
                    });
                }
            }, this).on("MustDestroyInfoCard", function () {
                delete this.infoCard;
                this.trigger("PreviousInfoCardBackToDeck");
            }, this).on("InfoCardBackToDeck", function (card) {
                this.infoCard.trigger("BackToDeck", card);
            }, this);
        }

        _createClass(AbstractPlayer, [{
            key: 'act',
            value: function act() {
                console.log("[AbstractPlayer] constructor");
            }
        }, {
            key: 'createDeck',
            value: function createDeck() {
                console.log("[AbstractPlayer], createDesc");
                if (this.playersCardsDeck !== undefined) {
                    this.playersCardsDeck.trigger("CreatePlayersDeck", this.cardCollection);
                }
            }
        }]);

        return AbstractPlayer;
    }();

    return AbstractPlayer;
});
