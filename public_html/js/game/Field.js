"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', './containers/CardContainerModel', './Settings', './EventsConfig'], function ($, CardContainerModel, SETTINGS, Events) {
    return function Field() {
        _classCallCheck(this, Field);

        this.playersCardContainerMelee = new CardContainerModel();
        this.playersCardContainerDistant = new CardContainerModel();
        this.enemyCardContainerMelee = new CardContainerModel();
        this.enemyCardContainerDistant = new CardContainerModel();

        this.battlesContainer = {
            playersCardContainerDistant: this.playersCardContainerDistant,
            playersCardContainerMelee: this.playersCardContainerMelee,
            enemyCardContainerMelee: this.enemyCardContainerMelee,
            enemyCardContainerDistant: this.enemyCardContainerDistant
        };

        Backbone.on(Events.Backbone.All.AllRendered, function (stage) {
            var i = 3;
            _.forEach(this.battlesContainer, function (value, key, iter) {
                iter[key].setContainerPosition(stage, SETTINGS.battleContainerPositionX, i * SETTINGS.oneLineHeight);
                iter[key].createGraphicsEdging(SETTINGS.deckWidth, SETTINGS.oneLineHeight);
                iter[key].trigger(Events.Game.AbstractCardContainerModel.CreateText, "score", "0", SETTINGS.deckWidth + SETTINGS.indentOfTheScoresForField, SETTINGS.oneLineHeight / 2);
                i -= 1;
            }, this);
        });
        Backbone.trigger(Events.Backbone.Renderer.GameRender);
    };
});
