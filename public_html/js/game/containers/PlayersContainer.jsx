'use strict';
define([
        'jquery',
        'backbone',
        './AbstractCardContainerModel',
        './BossesCardsContainer',
        '../cards/CardBossModel',
        '../EventsConfig',
        '../Settings'
    ],
    function ($, Backbone, AbstractCardContainerModel, BossesCardsContainer, CardBossModel, Events, SETTINGS) {
        return class extends AbstractCardContainerModel{
            constructor(loaderRes = null){
                super();
                this.loaderRes = loaderRes;
                if (this.loaderRes) {
                    this.createBossCard();
                }

                //this.on(Events.Game.PlayersContainer.PreparedForBattle, function () {
                    //this.bossesCardsContainer.setContainerPosition(this.View.containerView, 0, 0);
                    //this.bossesCardsContainer.createGraphicsEdging(SETTINGS.cardWidth, SETTINGS.oneLineHeight);
                    //this.off(Events.Game.PlayersContainer.PreparedForBattle);
                //}, this);
            }

            createBossCard(){
                this.bossCard = new CardBossModel(this.loaderRes);
                this.cardCollection.push(this.bossCard);
                this.bossCard.cardView.container.setContainerPosition(this.View.containerView, 0, 0);
                this.bossCard.cardView.container.createGraphicsEdging(SETTINGS.cardWidth, SETTINGS.oneLineHeight);
                this.trigger(Events.Game.AbstractCardContainerModel.AddContainerToChildren, this.bossCard.cardView.containerView);
                this.bossCard.cardView.setPosition(7, 0);
            }


        };
    }
);