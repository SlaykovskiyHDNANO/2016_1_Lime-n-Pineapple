'use strict';

define(['jquery'], function ($) {
    var SETTINGS = {
        constructor: function constructor() {
            this.oneLineHeight = $(window).height() / 6;
            this.cardWidth = this.oneLineHeight / 1.3;
            this.deckWidth = this.cardWidth * 8;
            this.battleContainerPositionX = $(window).width() / 5;
            this.infoCardContainerPositionX = this.battleContainerPositionX + this.deckWidth + this.cardWidth + 3;
            this.infoCardContainerPositionY = this.oneLineHeight * 2;
            this.infoBattleCardContainerPositionX = $(window).width() / 2 - this.cardWidth * 1.5;
            this.infoBattleCardContainerPositionY = 0;
            this.fps = 60;
            this.second = 1000;
        }
    };
    SETTINGS.constructor();

    return SETTINGS;
});
