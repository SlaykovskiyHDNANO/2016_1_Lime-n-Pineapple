"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define([], function () {
    return function GameEnvironment() {
        _classCallCheck(this, GameEnvironment);

        this.serverAvailable = false;
        this.associatedWebsocket = null;
        this.firstPlayer = null;
        this.secondPlayer = null;
    };
});
