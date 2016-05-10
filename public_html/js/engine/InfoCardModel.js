"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['backbone', 'underscore', 'jquery', 'pixi', './InfoCardView'], function (Backbone, _, $, pixi, InfoCardView) {
    var InfoCard = function InfoCard(container, playerOwner) {
        _classCallCheck(this, InfoCard);

        this.playerOwner = playerOwner;
        _.extend(this, Backbone.Events);
        this.isHide = true;
        this.infoCardView = new InfoCardView(container);

        this.on("InfoCardModel::BackToDeck", function (cardModel) {
            this.infoCardView.backToDeck(cardModel);
        }, this).on("InfoCardModel::AddToBattlesContainer", function (card, containerModel) {
            this.infoCardView.moveToBattleField(card, containerModel, this.playerOwner);
            playerOwner.trigger("AbstractPlayer::DeleteCardFromCardCollection", card);
        }, this).on("InfoCardModel::ShowInfoCard", function (cardModel) {
            this.isHide = false;
            this.infoCardView.showInfoCard(cardModel.cardView.sprite);
        }, this);

        this.infoCardView.on("InfoCardInContainer", function (cardModel) {
            this.isHide = true;
            $(cardModel).trigger("AbstractPlayer::PreviousInfoCardInDeck");
            cardModel.cardView.trigger("CardView::AlphaVisible");
        }, this);
    };

    return InfoCard;
});
