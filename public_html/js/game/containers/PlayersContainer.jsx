'use strict';
define([
        'jquery',
        'backbone',
        './AbstractCardContainerModel',
        './BossesCardsContainer',
        '../EventsConfig',
        '../Settings'
    ],
    function ($, Backbone, AbstractCardContainerModel, BossesCardsContainer, Events, SETTINGS) {
        return class PlayersContainer extends AbstractCardContainerModel{
            constructor(loaderRes){
                super();
                this.loaderRes = loaderRes;
                this.bossesCardsContainer = new BossesCardsContainer(loaderRes);
                console.log(Events);
                this.on(Events.Game.PlayersContainer.PreparedForBattle, function () {
                    this.bossesCardsContainer.setContainerPosition(this.View.containerView, 0, 0);
                    this.bossesCardsContainer.createGraphicsEdging(SETTINGS.cardWidth, SETTINGS.oneLineHeight);
                    this.off(Events.Game.PlayersContainer.PreparedForBattle);
                }, this);


            }


        };
    }
);