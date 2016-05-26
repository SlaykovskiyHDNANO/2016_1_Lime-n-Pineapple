"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['backbone', 'underscore', 'jquery', 'pixi', './InfoCardView', './EventsConfig'], function (Backbone, _, $, pixi, InfoCardView, Events) {
    var InfoCard = function InfoCard(container, playerOwner) {
        _classCallCheck(this, InfoCard);

        this.playerOwner = playerOwner;
        _.extend(this, Backbone.Events);
        this.isHide = true;
        this.infoCardView = new InfoCardView(container, this.playerOwner);

        this.on(Events.Game.InfoCardModel.BackToDeck, function (cardModel) {
            this.infoCardView.backToDeck(cardModel);
        }, this).on(Events.Game.InfoCardModel.AddToBattlesContainer, function (cardModel, containerModel) {
            this.infoCardView.moveToBattleField(cardModel, containerModel, this.playerOwner);
            this.playerOwner.trigger(Events.Game.AbstractPlayer.DeleteCardFromCardCollection, cardModel);
            this.playerOwner.trigger(Events.Game.AbstractPlayer.RemoveGapsInDeck);
            containerModel.trigger(Events.Game.AbstractCardContainerModel.SetCardToCardCollection, cardModel);
            containerModel.trigger(Events.Game.AbstractCardContainerModel.RemoveGapsInContainer);
            containerModel.trigger(Events.Game.AbstractCardContainerModel.UpdateContainersScoreAfterAddedInfoCard);
        }, this).on(Events.Game.InfoCardModel.ShowInfoCard, function (cardModel) {
            this.isHide = false;
            this.infoCardView.showInfoCard(cardModel, this);
        }, this).on(Events.Game.InfoCardModel.InfoCardInOwnContainer, function (cardModel) {
            this.playerOwner.trigger(Events.Game.AbstractPlayer.InfoCardInOwnContainer, cardModel);
        }, this);

        this.infoCardView.on(Events.Game.InfoCardModel.InfoCardInContainer, function (cardModel) {
            this.isHide = true;
            this.playerOwner.trigger(Events.Game.AbstractPlayer.InfoCardInContainer);
            $(cardModel).trigger(Events.Game.AbstractPlayer.PreviousInfoCardInDeck);
            cardModel.cardView.trigger(Events.Game.CardView.AlphaVisible);
            cardModel.trigger(Events.Game.AbstractCardModel.SetClickEventCard);
        }, this).on(Events.Game.InfoCardModel.InfoCardInBattleContainer, function (cardModel, containerModel) {
            this.playerOwner.trigger(Events.Game.AbstractPlayer.InfoCardAddedToBattle);
            cardModel.cardView.trigger(Events.Game.CardView.AlphaVisible);
        });
    };

    return InfoCard;
});
