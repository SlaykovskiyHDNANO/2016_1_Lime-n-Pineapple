"use strict";
define([
        'backbone',
        'underscore',
        'pixi',
        './CardView',
        './AbstractCardModel',
        '../EventsConfig'
    ],
    function (Backbone, _, pixi, CardView, AbstractCardModel, Events) {
        class CardBoss extends AbstractCardModel{
            constructor(loaderRes) {
                let card = loaderRes[(Math.floor(Math.random() * (3)))];
                super(card.url);
                this.url = card.url;
                this.name = card.name;
                this.power = card.power;
                this.disposableContainers = card.disposableContainers;
                this.setTouchEventForBossCard();
            }

            setTouchEventForBossCard(){
                this.cardView.sprite.on('click', function () {

                }, this);
            }

        }
        return CardBoss;
    }
);

