"use strict";
define([
        'jquery',
        'backbone',
        'pixi',
        './abstract_player',
        './EventsConfig'
    ],  function ($, Backbone, pixi, AbstractPlayer, Events) {
        class Bot extends AbstractPlayer{

            constructor(loaderRes, container){
                super(loaderRes, container);
                this.createDesc(container);
                this.on(Events.Game.AbstractPlayer.Act, function(){
                    this.act();
                }, this);
                for (let i = 0; i < this.cardCollection.length; i+=1){
                    this.setTouchEventCard(this.cardCollection[i]);
                }

            }

            act(){
                if (this.cardCollection.length) {
                    let card = this.cardCollection[((Math.floor(Math.random() * (this.cardCollection.length))))];
                    $(this).one(Events.Game.Bot.MustAddToBattle, function () {
                        let variantsOfBattleContainer = this.nowActiveContainer.length;
                        let rand = Math.floor(Math.random() * variantsOfBattleContainer);
                        this.trigger(Events.Game.AbstractPlayer.AddInfoCardToBattlesContainer, this.nowActiveContainer[rand]);
                    }.bind(this));
                    this.trigger(Events.Game.AbstractPlayer.MustCreateInfoCard, card);

                }
            }

            createDesc(container){
                super.createDeck(container);
            }

            setTouchEventCard(card){
                card.trigger(Events.Game.AbstractCardModel.SetTouchEventCard, this);
            }

        }
        return Bot;
    }
);

