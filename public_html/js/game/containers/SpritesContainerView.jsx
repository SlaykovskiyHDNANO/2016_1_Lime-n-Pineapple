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

            constructor(cardModel, sprite, interactive = true, buttonMode = true, visible = true) {
                _.extend(this, Backbone.Events);
                this.containerView = new pixi.Container();
                this.containerView.interactive = interactive;
                this.containerView.buttonMode = buttonMode;
                this.containerView.visible = visible;
                this.containerView.addChild(sprite);
                this.textFields = {};
                if (cardModel !== undefined) {
                    this.createPowerText(cardModel);
                }
                this._createHitArea();
                this.containerView
                    .on('mouseover', function(){
                        this.onMouseOver();
                    }, this)
                    .on('mouseout', function(){
                        this.onMouseOut();
                    }, this);

            }

            setPowerText(cardModel){
                let power = "power";
                if (!this.textFields[power]){
                    this.createPowerText(cardModel);
                }
                else{
                    this.textFields[power].text = cardModel.power.toString();
                    this.textFields[power].anchor.set(0.5);
                    this.textFields[power].x = SETTINGS.powersTextPositionX;
                    this.textFields[power].y = SETTINGS.powersTextPositionY;
                    this.containerView.addChild(this.textFields[power]);
                }
            }

            createPowerText(cardModel){
                let power = "power";
                this.textFields[power] = new pixi.Text(cardModel.power, {font : SETTINGS.textSize + 'px Arial', fill : "white"});
                this.textFields[power].anchor.set(0.5);
                this.textFields[power].x = SETTINGS.powersTextPositionX;
                this.textFields[power].y = SETTINGS.powersTextPositionY;
                this.containerView.addChild(this.textFields[power]);

            }

            _createHitArea(){
                this.containerView.hitArea = new pixi.Rectangle(0, 0, this.containerView.width, this.containerView.height);
            }

            onMouseOver(){
                let filter = new pixi.filters.ColorMatrixFilter();
                this.containerView.filters = [filter];
                filter.brightness(1.5);
                this.containerView.y-=10;
            }

            onMouseOut(){
                this.containerView.y+=10;
                this.containerView.filters = null;
            }
        };
    }
);