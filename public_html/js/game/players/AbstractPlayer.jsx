"use strict";
define([
        'jquery',
        'backbone',
        'underscore',
        'pixi',
        '../containers/CardContainerModel',
        '../cards/card_collection',
        '../cards/InfoCardModel',
        '../cards/CardBossModel',
        '../containers/PlayersContainer',
        '../EventsConfig',
        '../Settings'
],  function ($, Backbone, _, pixi, CardContainerModel, CardCollection, InfoCardModel, CardBossModel, PlayersContainer, Events, SETTINGS) {

        class AbstractPlayer {

            constructor(loaderRes, playersField){
                _.extend(this, Backbone.Events);

                $(this).on(Events.Backbone.SomeObject.SendStage, function (event, stage) {
                    this.stage = stage;
                }.bind(this));
                Backbone.trigger(Events.Backbone.Renderer.GetStage, this);

                this.playersField = playersField;
                this.cardCollection = new CardCollection(loaderRes,10);

                //this.playersInfoCardContainer = new CardContainerModel();
                //this.playersInfoCardContainer.setContainerPosition(this.stage, SETTINGS.infoCardContainerPositionX, 2 * SETTINGS.oneLineHeight);

                this.playersContainerBoss = new PlayersContainer(loaderRes);
                this.infoCard = new InfoCardModel(this);
                this.touchedCards = [];

                this
                    .on(Events.Game.AbstractPlayer.RemoveGapsInDeck, function () {
                        this.playersCardsDeck.trigger(Events.Game.PlayersCardsDeck.RemoveGapsInDeck);
                    }, this)

                    .on(Events.Game.AbstractPlayer.DeleteCardFromCardCollection, function (cardModel) {
                        this.playersCardsDeck.trigger(Events.Game.PlayersCardsDeck.DeleteCardFromCardCollection, cardModel);
                    }, this);
                    //
                    //.on(Events.Game.AbstractPlayer.AddInfoCardToBattlesContainer, function (container) {
                    //    this.touchedCards[this.touchedCards.length - 1].trigger(Events.Game.AbstractCardModel.ChangeClickListener);
                    //    this.infoCard.trigger(Events.Game.InfoCardModel.AddToBattlesContainer, this.touchedCards[this.touchedCards.length - 1], container);
                    //    this.touchedCards.length = 0;
                    //    //this.cleanClickListenerForContainers();
                    //}, this)
                    //

                    //
            }


        }
        return AbstractPlayer;
    }
);