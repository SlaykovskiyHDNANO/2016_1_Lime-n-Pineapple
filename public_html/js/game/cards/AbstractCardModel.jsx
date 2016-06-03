"use strict";
define([
        'backbone',
        'underscore',
        'pixi',
        './CardView',
        '../EventsConfig'
    ],
    function (Backbone, _, pixi, CardView, Events) {
        class Card{
            constructor(loaderRes, cardModel) {
                _.extend(this, Backbone.Events);
                this.cardView = new CardView(loaderRes, cardModel);

                this
                    .on(Events.Game.AbstractCardModel.SetTouchEventCard, function (player) {
                        this.cardView.setTouchEventCard(this);
                        this.playerOwner = player;
                    }, this)
                    .on(Events.Game.AbstractCardModel.ShowInfoBattleCard, function () {
                        this.playerOwner.trigger(Events.Game.AbstractPlayer.ShowBattlesInfoCard, this);
                    }, this)
                    .on(Events.Game.AbstractCardModel.ChangeClickListener, function () {
                        this.cardView.changeClickListenerToBattleFieldListener(this);
                    }, this)
                    .on(Events.Game.AbstractCardModel.CleanClickEventCard, function () {
                        this.cleanClickEventCard();
                    }, this)
                    .on(Events.Game.AbstractCardModel.SetClickEventCard, function () {
                        this.setClickEventCard(this);
                    }, this)
                    .on(Events.Game.AbstractCardModel.CreateBattlesInfoCard, function () {
                        this.cardView.createBattlesInfoCard(this.playerOwner);
                    }, this);
            }

            cleanClickEventCard(){
                console.log("cleanClickEventCard");
                this.cardView.cleanClickEventCard();
            }

            setClickEventCard(){
                console.log("setClickEventCard");
                this.cardView.setClickEventCard(this);
            }

            getPositionX(){
                return this.cardView.sprite.x;
            }

            getPositionY(){
                return this.cardView.sprite.y;
            }
        }
        return Card;
    }
);

