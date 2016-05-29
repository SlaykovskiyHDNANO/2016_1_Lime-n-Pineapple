"use strict";
define([
    'jquery',
    'underscore',
    'backbone',
    '../Settings',
    'pixi',
    '../containers/AbstractCardContainerModel',
    '../EventsConfig'
], function ($, _, Backbone, SETTINGS, pixi, AbstractCardContainerModel, Events) {

    class PlayerCardsDeck extends AbstractCardContainerModel{

        constructor(cardCollection) {
            super();
            this.cardCollection = cardCollection;
            $(this).on(Events.Backbone.SomeObject.SendStage, function (event, stage) {
                this.setContainerPosition(stage, SETTINGS.battleContainerPositionX, 4 * SETTINGS.oneLineHeight);
                this.createGraphicsEdging(SETTINGS.deckWidth, SETTINGS.oneLineHeight);
                Backbone.off(Events.Backbone.All.AllRendered);
            }.bind(this));
            Backbone.trigger(Events.Backbone.Renderer.GetStage, this);

            this
                .on(Events.Game.PlayersCardsDeck.RemoveGapsInDeck, function () {
                    this.View.removeGapsInDeck(this.cardCollection);
                }, this)
                .on(Events.Game.PlayersCardsDeck.DeleteCardFromCardCollection, function (card) {
                    this.deleteCardFromCardCollection(card);
                });

            Backbone.on(Events.Game.PlayersCardsDeck.GetDeckWidth, function(getWidth){
                getWidth(this.containerView.containerView.width);
            }, this);
        }

        createPlayersDeck(){
            this.View.createPlayersDeck(this.cardCollection);
        }

    }
    return PlayerCardsDeck;
});