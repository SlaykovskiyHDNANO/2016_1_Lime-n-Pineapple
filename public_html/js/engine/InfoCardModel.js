"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['backbone', 'underscore', 'pixi', './InfoCardView'], function (Backbone, _, pixi, InfoCardView) {
    var InfoCard = function InfoCard(card, playerOwner) {
        _classCallCheck(this, InfoCard);

        this.playerOwner = playerOwner;
        _.extend(this, Backbone.Events);
        this.infoCardView = new InfoCardView(card.cardView.sprite);
        this.on("InfoCardModel::BackToDeck InfoCardModel::BackToDeckPrevious", function (card) {
            this.infoCardView.backToDeck(card.cardView);
        }, this);

        this.infoCardView.on("InfoCardInDeck", function (card) {
            console.log("CARD.TRIGGER(ALPHA)");
            console.log(card);
            card.trigger("CardView::AlphaVisible");
            this.playerOwner.trigger("AbstractPlayer::MustDestroyInfoCard");
        }, this);
    };

    return InfoCard;
});
