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
                this.textFields[power] = new pixi.Text(cardModel.power.toString(), {font : SETTINGS.textSize + 'px Arial', fill : "white"});
                console.log(sprite);
                this.setSettingsForText(power, sprite);
            }

            setSettingsForText(str, sprite){
                console.log(this.containerView.width, this.containerView.height);
                this.textFields[str].style = {font : sprite.height/8 + 'px Arial', fill : "white"};
                this.textFields[str].anchor.set(0.5);
                this.textFields[str].x = sprite.width/5;
                this.textFields[str].y = sprite.height/6;
                console.log(this.textFields[str].x, this.textFields[str].y );
                this.containerView.addChild(this.textFields[str]);
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