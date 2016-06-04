'use strict';
define([
        'jquery',
        'backbone',
        './AbstractCardContainerModel',
        '../cards/CardBossModel',
        '../EventsConfig'
    ],
    function ($, Backbone, AbstractCardContainerModel, CardBossModel, Events) {
        return class BossesCardsContainer extends AbstractCardContainerModel{
            constructor(loaderRes){
                super();
                if (loaderRes) {
                    this.createBossCard(loaderRes);
                }
            }

            createBossCard(loaderRes){
                this.bossCard = new CardBossModel(loaderRes);
                this.cardCollection.push(this.bossCard);
                this.trigger(Events.Game.AbstractCardContainerModel.AddContainerToChildren, this.bossCard.cardView.containerView);
                this.bossCard.cardView.sprite.x = 6;
            }
        };
    }
);