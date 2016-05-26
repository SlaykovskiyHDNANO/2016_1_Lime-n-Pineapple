"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', 'underscore', 'backbone', 'settings', 'pixi', './CardModel'], function ($, _, Backbone, Settings, pixi, Card) {
    var CardCollection = function CardCollection(loaderRes, size) {
        _classCallCheck(this, CardCollection);

        this.cardCollection = [];
        _.extend(this.cardCollection, Backbone.Events);

        for (var i = 0; i < size; i += 1) {
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
    ;

    return CardCollection;
});
