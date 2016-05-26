"use strict";
define([
    'backbone',
    'underscore',
    'pixi',
    './CardView',
    './AbstractCardModel'
    ],
    function (Backbone, _, pixi, CardView, AbstractCardModel) {
        class Card extends AbstractCardModel{
            constructor(loaderRes, id) {
                let card = loaderRes[(Math.floor(Math.random() * (3)))];
                super(card.url);
                this.id = id;
                this.name = card.name;
                this.url = card.url;
                this.power = card.power;
                this.disposableContainers = card.disposableContainers;
            }
        }
        return Card;
    }
);

