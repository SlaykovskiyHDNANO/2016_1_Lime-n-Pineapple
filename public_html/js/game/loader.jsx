"use strict";
define([
        'jquery',
        'backbone',
        'pixi',
        './engine',
        './renderer',
        './GameEnvironment',
        '../settings'
    ],
    function ($, Backbone, pixi, Engine, Renderer, GameEnvironment, ServerSettings) {
        class Loader {
            constructor(el, domID) {
                this.loader = new pixi.loaders.Loader();
                this.gameEnvironment = new GameEnvironment();


                let socket = new WebSocket("ws://localhost:9999");
                socket.onopen = function () {
                    console.log("Соединение открылось");
                    this.gameEnvironment.setSocket(socket);
                    socket.send(JSON.stringify(ololo));
                }.bind(this);
                socket.onclose = function () {
                    console.log ("Соединение закрылось");
                    this.downloadRes(el, domID);
                }.bind(this);
                socket.onmessage = function (event) {
                    console.log ("Пришло сообщение с содержанием:", event.data);
                };
                socket.onerror = function (err) {
                    console.log("error websocket");
                }.bind(this);


            }

            downloadRes(el, domID){
                this.loader.add("cards", '/js/game/cards.json');
                this.loader.load(function(loader, res){
                    console.log("[loader.jsx], load");
                    this.renderer = new Renderer(el, domID);
                    this.engine = new Engine(res.cards.data, this.gameEnvironment.isServerAvailable());
                }, this);

            }
        }
        return Loader;
    }
);

