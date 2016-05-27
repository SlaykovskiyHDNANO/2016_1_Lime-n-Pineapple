"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define([], function () {
    return function () {
        function GameEnvironment() {
            _classCallCheck(this, GameEnvironment);

            this.serverAvailable = false;
            this.associatedWebsocket = null;
            this.firstPlayer = null;
            this.secondPlayer = null;
        }

        _createClass(GameEnvironment, [{
            key: "setSocket",
            value: function setSocket(socket) {
                this.associatedWebsocket = socket;
                this.serverAvailable = true;
            }
        }, {
            key: "isServerAvailable",
            value: function isServerAvailable() {
                return this.serverAvailable;
            }
        }]);

        return GameEnvironment;
    }();
});
