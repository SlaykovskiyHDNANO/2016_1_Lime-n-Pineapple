"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', 'underscore', 'backbone', 'settings', 'pixi', './EventsConfig'], function ($, _, Backbone, Settings, pixi, Events) {
    var Renderer = function () {
        function Renderer(viewEl, viewDomID) {
            _classCallCheck(this, Renderer);

            _.extend(this, Backbone.Events);
            this.domID = viewDomID;
            this.viewEl = viewEl;
            var self = this;

            console.log("[renderer], constructor");

            Backbone.on(Events.Backbone.Renderer.GameRender, function () {
                console.log("[renderer], GameRender event");

                this.stage = new pixi.Container();

                this.stage.hitArea = new pixi.Rectangle(0, 0, $(window).width(), $(window).height());

                Backbone.on(Events.Backbone.Renderer.AddChildToStage, function (sprite) {
                    this.stage.addChild(sprite);
                }, this);

                this.stage.interactive = true;

                Backbone.on(Events.Backbone.Renderer.GetStage, function (object) {
                    $(object).trigger(Events.Backbone.SomeObject.SendStage, [this.stage]);
                }, this);

                this.renderer = pixi.autoDetectRenderer($(this.viewEl).width(), $(this.viewEl).height(), { transparent: true });
                document.getElementById(this.domID).appendChild(this.renderer.view);

                this.stage.parent = this.renderer;

                Backbone.on(Events.Backbone.Renderer.RenderAnimation, function (viewFunc, frames) {
                    this.viewFunc = viewFunc;
                    this.frames = frames;
                    console.log(frames);
                }, this);

                this.intervalID = requestAnimationFrame(function (timeStamp) {
                    self.animate(timeStamp);
                });
                Backbone.trigger(Events.Backbone.All.AllRendered);
            }, this);

            this.on(Events.Backbone.Renderer.StopRender, function () {
                cancelAnimationFrame(this.intervalID);
                Backbone.trigger(Events.Backbone.All.RendererStopped);
            }, this).on(Events.Backbone.Renderer.ResumeRender, function () {
                this.intervalID = requestAnimationFrame(function (timeStamp) {
                    self.animate();
                });
                Backbone.trigger(Events.Backbone.All.RendererResume);
            }, this);
        }

        _createClass(Renderer, [{
            key: 'animate',
            value: function animate() {
                var self = this;
                if (this.frames > 0) {
                    this.frames -= 1;
                    this.viewFunc();
                }
                console.log("animate");
                this.renderer.render(this.stage);
                this.intervalID = requestAnimationFrame(function (timeStamp) {
                    self.animate();
                });
            }
        }]);

        return Renderer;
    }();

    return Renderer;
});
