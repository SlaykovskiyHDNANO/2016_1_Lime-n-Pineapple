"use strict";
define([
    'jquery',
    'underscore',
    'backbone',
    'settings',
    'pixi',
    './AbstractCardContainerModel',
    './EventsConfig'
], function ($, _, Backbone, Settings, pixi, AbstractCardContainerModel, Events) {

    class PlayerCardsDeck extends AbstractCardContainerModel{

        constructor(cardContainerView) {
            super(cardContainerView);

            this
                .on(Events.Game.PlayersCardsDeck.CreatePlayersDeck, function(cardCollection){
                    this.cardCollection = cardCollection;
                    this.createPlayersDeck();
                }, this)
                .on(Events.Game.PlayersCardsDeck.RemoveGapsInDeck, function () {
                    this.containerView.removeGapsInDeck(this.cardCollection);
                }, this)
                .on(Events.Game.PlayersCardsDeck.DeleteCardFromCardCollection, function (card) {
                    this.deleteCardFromCardCollection(card);
                });

            Backbone.on(Events.Game.PlayersCardsDeck.GetDeckWidth, function(getWidth){
                getWidth(this.containerView.containerView.width);
            }, this);
        }

        createPlayersDeck(){
            this.containerView.createPlayersDeck(this.cardCollection);
        }

    }
    return PlayerCardsDeck;
});