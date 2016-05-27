"use strict";
define([
    'jquery',
    'backbone',
    'pixi',
    './engine',
    './renderer'
], function ($, Backbone, pixi, Engine, Renderer) {
    class Loader {
            constructor(el, domID) {
                this.loader = new pixi.loaders.Loader();

                //let socket = new WebSocket("ws://echo.websocket.org/");
                //socket.onopen = function () {
                //    console.log("Соединение открылось");
                //    socket.send(JSON.stringify(ololo));
                //};
                //socket.onclose = function () {
                //    console.log ("Соединение закрылось");
                //};
                //socket.onmessage = function (event) {
                //    console.log ("Пришло сообщение с содержанием:", event.data);
                //};

                // 0 - system
                // 1 - Backbone
                // 2 - Game
                // 3 - Room
                //let msg = {
                //    'type' : 2,
                //    'data'  : {
                //        'user': 'lalka',
                //        'action': 1,
                //        ''
                //    }
                //};


                console.log("[loader.jsx], constructor");

                this.loader.add("cards", '/js/engine/cards.json');

                this.loader.load(function(loader, res){
                    console.log("[loader.jsx], load");
                    this.renderer = new Renderer(el, domID);
                    this.engine = new Engine(res.cards.data);
                }, this);
            }

        }
        return Loader;
    }
);

