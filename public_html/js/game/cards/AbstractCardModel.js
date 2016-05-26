"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['backbone', 'underscore', 'pixi', './CardView', './EventsConfig'], function (Backbone, _, pixi, CardView, Events) {
    var Card = function Card(loaderRes) {
        _classCallCheck(this, Card);

        _.extend(this, Backbone.Events);
        this.cardView = new CardView(loaderRes);

        this.on(Events.Game.AbstractCardModel.SetTouchEventCard, function (player) {
            this.cardView.setTouchEventCard(this);
            this.playerOwner = player;
        }, this).on(Events.Game.AbstractCardModel.CardViewPressed, function () {
            this.playerOwner.trigger(Events.Game.AbstractPlayer.MustCreateInfoCard, this);
        }, this).on(Events.Game.AbstractCardModel.InfoCardBackToDeck, function () {
            this.playerOwner.trigger(Events.Game.AbstractPlayer.InfoCardBackToDeck, this);
        }, this).on(Events.Game.AbstractCardModel.ShowInfoBattleCard, function () {
            this.playerOwner.trigger(Events.Game.AbstractPlayer.ShowBattlesInfoCard, this);
        }, this).on(Events.Game.AbstractCardModel.ChangeClickListener, function () {
            this.cardView.changeClickListenerToBattleFieldListener(this);
        }, this).on(Events.Game.AbstractCardModel.CleanClickEventCard, function () {
            this.cardView.cleanClickEventCard();
        }, this).on(Events.Game.AbstractCardModel.SetClickEventCard, function () {
            this.cardView.setClickEventCard(this);
        }, this).on(Events.Game.AbstractCardModel.CreateBattlesInfoCard, function () {
            this.cardView.createBattlesInfoCard(this.playerOwner);
        }, this);
    };

    return Card;
});
