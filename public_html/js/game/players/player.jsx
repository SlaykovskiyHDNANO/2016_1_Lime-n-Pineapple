"use strict";
define([
        'jquery',
        'backbone',
        'pixi',
        './abstract_player',
        './EventsConfig'

    ],  function ($, Backbone, pixi, AbstractPlayer, Events) {
        class Player extends AbstractPlayer{

            constructor(loaderRes, container){
                super(loaderRes, container);
                super.createDeck();

                this.on(Events.Game.Player.PlayerAct, function(){
                    this.act();
                }, this);

                for (let i = 0; i < this.cardCollection.length; i+=1){
                    this.setTouchEventCard(this.cardCollection[i]);
                }
                this.setTouchEventCard(this.bossCard);
            }

            act(){
            }

            setTouchEventCard(card){
                card.trigger(Events.Game.AbstractCardModel.SetTouchEventCard, this);
            }


        }
        return Player;
    }
);

