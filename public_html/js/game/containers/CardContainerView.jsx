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
    function ($, _, Backbone, Settings, pixi, SETTING, Events) {
        class CardContainerView{

            constructor(interactive, buttonMode, visible = true) {

                _.extend(this, Backbone.Events);

                this.containerView = new pixi.Container();
                this.containerView.interactive = interactive;
                this.containerView.buttonMode = buttonMode;
                this.containerView.visible = visible;
                this.textField = {};
                this.graphics = [];
                this.on(Events.Game.CardContainerView.RemoveGapsInContainer, function(){
                    this.removeGapsInDeck();
                }, this);

                this.on(Events.Game.CardContainerView.AddChild, function(sprite){
                    this.containerView.addChild(sprite);
                }, this);

            }

            setClickEventsListener(containerModel){
                this.containerView.on('click', function () {
                    this.onClickContainer(containerModel);
                }, this);
            }

            cleanClickEventsListener(){
                this.containerView.off('click');
            }

            onClickContainer(containerModel) {
                containerModel.trigger(Events.Game.AbstractCardContainerModel.AddInfoCardToBattlesContainer, containerModel);
            }

            edgingVisible(value){
                this.graphics[0].visible = value;
                this.containerView.off('mouseover');
                this.containerView.off('mouseout');
            }

            edgingEventsSetter(graph, isListen){
                if (isListen) {
                    this.containerView.on('mouseover', function () {
                        this.visible = true;
                    }, graph);
                    this.containerView.on('mouseout', function () {
                        this.visible = false;
                    }, graph);
                }
                else{
                    this.containerView.off('mouseover');
                    this.containerView.off('mouseout');
                }
            }

            createTextField(name, str, x = 0, y = 0){
                if (!this.textField[name]) {
                    this.textField[name] = new pixi.Text(str);
                    this.textField[name].x = x;
                    this.textField[name].y = y;
                    this.textField[name].anchor.x = 0;
                    this.textField[name].anchor.y = 0.5;
                    this.containerView.addChild(this.textField[name]);
                }
            }

            setTextField(name, str, x, y){
                if (this.textField[name]) {
                    this.textField[name].text = str;
                    if (x && y){
                        this.textField[name].x = x;
                        this.textField[name].y = y;
                    }
                }
                else {
                    this.createTextField(name, str, x, y);
                }

            }

            addChildToContainer(child, x, y){
                this.containerView.addChild(child);
                child.x = x;
                child.y = y;
            }

            removeGapsInDeck(cardCollection) {
                this.createPlayersDeck(cardCollection);
            }

            createHitArea(width, height){
                this.containerView.hitArea = new pixi.Rectangle(0, 0, width, height);
            }

            createGraphicsEdging(width, height, worldVisible = true, x = 3, y = 0){
                let graph = new pixi.Graphics();
                this.graphics.push(graph);
                this.containerView.addChildAt(graph, 0);
                graph.beginFill(0xffae80, 0.15);
                graph.lineStyle(3, 0xff8e4d, 0.3);
                graph.drawRect(x, y, width + 2 * SETTING.indentOfTheGraphics, height);
                graph.visible = false;
                graph.myWorldVisible = worldVisible;
                if (graph.myWorldVisible) {
                    this.edgingEventsSetter(graph, true);
                }
            }

            setContainerPosition(container, x, y){
                container.addChild(this.containerView);
                this.containerView.x = x;
                this.containerView.y = y;
            }

            negativeClimb(cardCollection, climb){
                let sprite;
                sprite = cardCollection[0].cardView.sprite;
                sprite.x = sprite.width / 2 + SETTING.indentOfTheGraphics + SETTING.indentOfTheContainer;
                sprite.y = sprite.height / 2;
                sprite.anchor.set(0.5);
                this.containerView.addChild(sprite);
                for (let i = 1; i < cardCollection.length; i+=1) {
                    sprite = cardCollection[i].cardView.sprite;
                    sprite.x = (sprite.width + climb + SETTING.indentOfTheGraphics) *
                        i + sprite.width / 2 + SETTING.indentOfTheContainer;

                    sprite.y = sprite.height / 2;
                    sprite.anchor.set(0.5);
                    this.containerView.addChild(sprite);
                }

            }

            positiveClimb(cardCollection, climb){
                let sprite;
                for (let i = 0; i < cardCollection.length; i+=1) {
                    sprite = cardCollection[i].cardView.sprite;
                    sprite.x = (sprite.width + SETTING.indentOfTheGraphics) *
                        i + sprite.width / 2 + climb + SETTING.indentOfTheContainer;
                    sprite.y = sprite.height / 2;
                    sprite.anchor.set(0.5);
                    this.containerView.addChild(sprite);
                }
            }

            createPlayersDeck(cardCollection){
                let lengthOfCardCollection = SETTING.cardWidth * cardCollection.length,
                    climb = 0;
                if (SETTING.deckWidth - SETTING.indentOfTheContainer * 2 >= lengthOfCardCollection){
                    climb = (SETTING.deckWidth - lengthOfCardCollection - SETTING.indentOfTheContainer * 2)/ 2;
                    this.positiveClimb(cardCollection, climb);
                }
                else {
                    climb = SETTING.cardWidth - (SETTING.deckWidth - SETTING.indentOfTheContainer * 2 - SETTING.cardWidth - SETTING.indentOfTheGraphics * (cardCollection.length - 3))/(cardCollection.length - 1);
                    climb=-climb;
                    this.negativeClimb(cardCollection, climb);

                }
            }

            setPositionInContainer(object, x, y){
                object.x = x;
                object.y = y;
                object.anchor.set(0.5);
                this.containerView.addChild(object);
            }

        }
    return CardContainerView;
});