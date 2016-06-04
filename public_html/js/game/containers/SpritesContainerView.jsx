"use strict";
define([
        'jquery',
        'underscore',
        'backbone',
        '../../settings',
        'pixi',
        '../Settings',
        '../EventsConfig'
    ],
    function ($, _, Backbone, Settings, pixi, SETTINGS, Events) {
        return class SpritesContainerView {

            constructor(cardModel, sprite, isBoss, interactive = true, buttonMode = true, visible = true) {
                _.extend(this, Backbone.Events);
                this.containerView = new pixi.Container();
                this.containerView.interactive = interactive;
                this.containerView.buttonMode = buttonMode;
                this.containerView.visible = visible;
                this.containerView.addChild(sprite);
                console.log(this.containerView, "SpritesContainerView");
                console.log(sprite);
                this.textFields = {};
                if (cardModel !== undefined && !isBoss) {
                    this.createPowerText(cardModel, sprite);
                }
                this._createHitArea();
                this.setMouseEvents();

            }

            setPowerText(cardModel, sprite){
                let power = "power";
                if (!this.textFields[power]){
                    this.createPowerText(cardModel, sprite);
                }
                else{
                    this.textFields[power].text = cardModel.power.toString();
                    this.setSettingsForText(power, sprite);
                }
            }

            offMouseEvents(){
                this.containerView.off('mouseover');
                this.containerView.off('mouseout');
                if (this.mouseOverEvent){
                    this.onMouseOut();
                }
            }

            setMouseEvents(){
                this.containerView
                    .on('mouseover', function(){
                        this.onMouseOver();
                    }, this)
                    .on('mouseout', function(){
                        this.onMouseOut();
                    }, this);
            }

            removeText(str){
                this.containerView.removeChild(this.textFields[str]);
            }

            createPowerText(cardModel, sprite){
                let power = "power";
                this.textFields[power] = new pixi.Text(cardModel.power.toString(), {font : SETTINGS.textSize + 'px Arial', fill : "black"});
                console.log(sprite);
                this.setSettingsForText(power, sprite);
            }

            setSettingsForText(str, sprite){
                console.log(this.containerView.width, this.containerView.height);
                this.textFields[str].style = {font : sprite.height/7 + 'px Arial', fill : "black"};
                this.textFields[str].anchor.set(0.5);
                this.textFields[str].x = sprite.width/8;
                this.textFields[str].y = sprite.height/10 - 2;
                console.log(this.textFields[str].x, this.textFields[str].y );
                this.containerView.addChild(this.textFields[str]);
            }

            _createHitArea(){
                this.containerView.hitArea = new pixi.Rectangle(0, 0, this.containerView.width, this.containerView.height);
            }

            onMouseOver(){
                if (this.mouseOverEvent){
                    this.onMouseOut();
                }
                let filter = new pixi.filters.ColorMatrixFilter();
                this.containerView.filters = [filter];
                filter.brightness(1.5);
                this.containerView.y -= 10;

                this.mouseOverEvent = true;
                this.mouseOutEvent = false;
            }

            onMouseOut(){
                if (this.mouseOutEvent){
                    this.onMouseOver();
                }
                this.containerView.y += 10;
                this.containerView.filters = null;

                this.mouseOverEvent = false;
                this.mouseOutEvent = true;
            }

            setContainerPosition(container, x, y){
                container.addChild(this.containerView);
                this.containerView.x = x;
                this.containerView.y = y;
            }

            createGraphicsEdging(width, height, worldVisible = true, x = 3, y = 0){
                this.graphics = [];
                let graph = new pixi.Graphics();
                this.graphics.push(graph);
                this.containerView.addChildAt(graph, 0);
                graph.beginFill(0xffae80, 0.15);
                graph.lineStyle(3, 0xff8e4d, 0.3);
                graph.drawRect(x, y, width + 2 * SETTINGS.indentOfTheGraphics, height);
                graph.visible = false;
                graph.myWorldVisible = worldVisible;
                if (graph.myWorldVisible) {
                    this.edgingEventsSetter(graph, true);
                }
            }

            edgingEventsSetter(graph, isListen){
                this.offMouseEvents();
                if (isListen) {
                    this.containerView.on('mouseover', function () {
                        graph.visible = true;
                        this.onMouseOver();
                    }, this);
                    this.containerView.on('mouseout', function () {
                        graph.visible = false;
                        this.onMouseOut();
                    }, this);
                }
                else{
                    this.containerView.off('mouseover');
                    this.containerView.off('mouseout');
                }
            }

        };
    }
);