"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', 'backbone', 'pixi', './engine', './renderer', './GameEnvironment', '../settings'], function ($, Backbone, pixi, Engine, Renderer, GameEnvironment, ServerSettings) {
    var Loader = function () {
        function Loader(el, domID) {
            _classCallCheck(this, Loader);

            this.loader = new pixi.loaders.Loader();
            this.gameEnvironment = new GameEnvironment();

            //let socket = new WebSocket("ws://localhost:9999");
            //socket.onopen = function () {
            //    console.log("Соединение открылось");
            //    this.gameEnvironment.setSocket(socket);
            //}.bind(this);
            //socket.onclose = function () {
            //    console.log ("Соединение закрылось");
            //    this.downloadRes(el, domID, false);
            //}.bind(this);
            //socket.onmessage = function (event) {
            //    console.log ("Пришло сообщение с содержанием:", event.data);
            //};
            //socket.onerror = function (err) {
            //    console.log("error websocket");
            //}.bind(this);
            this.downloadRes(el, domID, this.gameEnvironment.isServerAvailable());
        }

        _createClass(Loader, [{
            key: 'downloadRes',
            value: function downloadRes(el, domID, isServerAvailable) {
                console.log("download");
                this.loader.add("cards", '/js/game/cards.json');
                this.loader.load(function (loader, res) {
                    console.log("[loader.jsx], load");
                    this.renderer = new Renderer(el, domID);
                    console.log(res.cards);
                    this.engine = new Engine(res.cards.data, isServerAvailable);
                }, this);
            }
        }]);

        return Loader;
    }();

    return Loader;
});
