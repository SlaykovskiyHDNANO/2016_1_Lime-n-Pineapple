"use strict";
define([
        'backbone',
        'underscore',
        'jquery',
        'pixi',
        './InfoCardView',
        '../EventsConfig'
    ],
    function (Backbone, _, $, pixi, InfoCardView, Events) {
        class InfoCard{
            constructor(container, playerOwner) {
                this.playerOwner = playerOwner;
                _.extend(this, Backbone.Events);
                this.isHide = true;
                this.infoCardView = new InfoCardView(container, this.playerOwner);

                this
                    .on(Events.Game.InfoCardModel.BackToDeck, function(cardModel){
                        cardModel.trigger(Events.Game.AbstractCardModel.CleanClickEventCard);
                        this.infoCardView.backToDeck(cardModel);
                    }, this)

                    .on(Events.Game.InfoCardModel.AddToBattlesContainer, function (cardModel, containerModel) {
                        this.isHide = true;
                        this.infoCardView.moveToBattleField(cardModel, containerModel, this.playerOwner);
                        this.playerOwner.trigger(Events.Game.AbstractPlayer.DeleteCardFromCardCollection, cardModel);
                        this.playerOwner.trigger(Events.Game.AbstractPlayer.RemoveGapsInDeck);
                        containerModel.trigger(Events.Game.AbstractCardContainerModel.SetCardToCardCollection, cardModel);
                        containerModel.trigger(Events.Game.AbstractCardContainerModel.RemoveGapsInContainer);
                        containerModel.trigger(Events.Game.AbstractCardContainerModel.UpdateContainersScoreAfterAddedInfoCard);
                    }, this)

                    .on(Events.Game.InfoCardModel.ShowInfoCard, function (cardModel) {
                        this.isHide = false;
                        this.infoCardView.showInfoCard(cardModel, this);
                    }, this);

                this.infoCardView
                    .on(Events.Game.InfoCardModel.InfoCardInContainer, function(cardModel){
                        this.isHide = true;
                        this.playerOwner.trigger(Events.Game.Player.InfoCardInContainer, cardModel);
                        $(cardModel).trigger(Events.Game.Player.PreviousInfoCardInDeck);
                        cardModel.cardView.trigger(Events.Game.CardView.AlphaVisible);
                    }, this)

                    .on(Events.Game.InfoCardModel.InfoCardInBattleContainer, function (cardModel, containerModel) {
                        containerModel.trigger(Events.Game.Field.InfoCardAddedToBattle);
                        cardModel.cardView.trigger(Events.Game.CardView.AlphaVisible);
                    });

            }
        }
        return InfoCard;
    }
);
