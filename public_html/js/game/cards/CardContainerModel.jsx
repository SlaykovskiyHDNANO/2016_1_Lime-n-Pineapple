"use strict";
define([
    'jquery',
    'underscore',
    'backbone',
    'settings',
    'pixi',
    './AbstractCardContainerModel'
], function ($, _, Backbone, Settings, pixi, AbstractCardContainerModel) {

    class CardContainerModel extends AbstractCardContainerModel{

        constructor(cardContainerView) {
            super(cardContainerView);

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

    }
    return CardContainerModel;
});