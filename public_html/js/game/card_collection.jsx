"use strict";
define([
        'jquery',
        'underscore',
        'backbone',
        'settings',
        'pixi',
        './CardModel'
], function ($, _, Backbone, Settings, pixi, Card) {
        class CardCollection {

            constructor(loaderRes, size) {
                this.cardCollection = [];
                _.extend(this.cardCollection, Backbone.Events);

                for (let i = 0; i < size; i+=1) {
                    this.cardCollection.push(new Card(loaderRes, i));
                }

                //this.cardCollection.on("CardCollection::CreatePlayersDeck", function(containerView){
                //    this.setPosition(containerView);
                //}, this);

                return this.cardCollection;
            }
            //setPosition(containerView){
            //    for (let i = 0; i < this.cardCollection.length; i+=1) {
            //        this.cardCollection[i].trigger("CardModel::SetPositionInContainer", i, containerView);
            //    }
            //
            //}
        }
        return CardCollection;
    }
);

