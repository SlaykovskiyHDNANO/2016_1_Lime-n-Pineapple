"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['backbone', 'underscore', 'pixi', './CardView', '../EventsConfig'], function (Backbone, _, pixi, CardView, Events) {
    var Card = function () {
        function Card(loaderRes) {
            _classCallCheck(this, Card);

            _.extend(this, Backbone.Events);
            this.cardView = new CardView(loaderRes);

            this.on(Events.Game.AbstractCardModel.SetTouchEventCard, function (player) {
                this.cardView.setTouchEventCard(this);
                this.playerOwner = player;
            }, this).on(Events.Game.AbstractCardModel.ShowInfoBattleCard, function () {
                this.playerOwner.trigger(Events.Game.AbstractPlayer.ShowBattlesInfoCard, this);
            }, this).on(Events.Game.AbstractCardModel.ChangeClickListener, function () {
                this.cardView.changeClickListenerToBattleFieldListener(this);
            }, this).on(Events.Game.AbstractCardModel.CleanClickEventCard, function () {
                this.cleanClickEventCard();
            }, this).on(Events.Game.AbstractCardModel.SetClickEventCard, function () {
                this.setClickEventCard(this);
            }, this).on(Events.Game.AbstractCardModel.CreateBattlesInfoCard, function () {
                this.cardView.createBattlesInfoCard(this.playerOwner);
            }, this);
        }

        _createClass(Card, [{
            key: 'cleanClickEventCard',
            value: function cleanClickEventCard() {
                console.log("cleanClickEventCard");
                this.cardView.cleanClickEventCard();
            }
        }, {
            key: 'setClickEventCard',
            value: function setClickEventCard() {
                console.log("setClickEventCard");
                this.cardView.setClickEventCard(this);
            }
        }]);

        return Card;
    }();

    return Card;
});
