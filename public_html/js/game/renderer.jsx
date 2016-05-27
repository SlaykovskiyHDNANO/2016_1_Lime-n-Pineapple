"use strict";
define([
        'jquery',
        'underscore',
        'backbone',
        'settings',
        'pixi',
        './EventsConfig'
    ], function ($, _, Backbone, Settings, pixi, Events) {
        class Renderer {
            constructor(viewEl, viewDomID) {

                _.extend(this, Backbone.Events);
                this.domID = viewDomID;
                this.viewEl = viewEl;
                let self = this;

                console.log("[renderer], constructor");

                Backbone.on(Events.Backbone.Renderer.GameRender, function(){
                    console.log("[renderer], GameRender event");

                    this.stage = new pixi.Container();

                    this.stage.hitArea = new pixi.Rectangle(0, 0, $(window).width(), $(window).height());

                    Backbone.on(Events.Backbone.Renderer.AddChildToStage, function(sprite){
                        this.stage.addChild(sprite);
                    }, this);

                    this.stage.interactive = true;

                    Backbone.on(Events.Backbone.Renderer.GetStage, function (object) {
                        $(object).trigger(Events.Backbone.SomeObject.SendStage, [this.stage]);
                    }, this);


                    this.renderer = pixi.autoDetectRenderer($(this.viewEl).width(), $(this.viewEl).height(), {transparent: true});
                    document.getElementById(this.domID).appendChild(this.renderer.view);

                    this.stage.parent = this.renderer;

                    Backbone
                        .on(Events.Backbone.Renderer.RenderAnimation, function (viewFunc, frames) {
                            this.viewFunc = viewFunc;
                            this.frames = frames;
                            console.log(frames);
                        }, this);

                    this.intervalID = requestAnimationFrame(function(timeStamp){
                        self.animate(timeStamp);
                    });
                    Backbone.trigger(Events.Backbone.All.AllRendered);
                }, this);

                this
                    .on(Events.Backbone.Renderer.StopRender, function(){
                        cancelAnimationFrame(this.intervalID);
                        Backbone.trigger(Events.Backbone.All.RendererStopped);
                    }, this)
                    .on(Events.Backbone.Renderer.ResumeRender, function(){
                        this.intervalID = requestAnimationFrame(function(timeStamp) {
                            self.animate();
                        });
                        Backbone.trigger(Events.Backbone.All.RendererResume);
                    }, this);

            }


            animate() {
                let self = this;
                if (this.frames > 0){
                    this.frames-=1;
                    this.viewFunc();
                }
                console.log("animate");
                this.renderer.render(this.stage);
                this.intervalID = requestAnimationFrame(function(timeStamp){
                    self.animate();
                });
            }

        }
        return Renderer;
    }
);