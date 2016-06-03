"use strict";
define([
        'backbone',
        'underscore',
        'jquery',
        'pixi',
        '../containers/SpritesContainerView',
        '../Settings',
        '../EventsConfig'
    ],
    function (Backbone, _, $, pixi, SpritesContainerView, SETTING, Events) {
        class InfoCardView{

            constructor(container, playerOwner) {
                _.extend(this, Backbone.Events);
                let duration = 200;
                this.frames = SETTING.fps * (duration/SETTING.second);
                this.sprite = new pixi.Sprite();
                this.playerOwner = playerOwner;
                this.container = new SpritesContainerView(undefined, this.sprite);
                this.containerView = this.container.containerView;
                this.container.offMouseEvents();
            }

            showInfoCard(cardModel, infoCardModel){
                let card = cardModel.cardView.sprite;
                this.sprite.texture = card.texture;
                this.calcSize(card.width * 2, card.height * 2);
                this.zeroMustPosition();
                this.zeroSpritePosition();
                Backbone.trigger(Events.Backbone.Renderer.AddChildToStage, this.containerView);
                this.calcStartPositionForInfoCard(card);
                this.calcMustPosition(SETTING.infoCardContainerPositionX, SETTING.infoCardContainerPositionY);
                this.calcDeltaAndRate();
                this.container.setPowerText(cardModel, this.sprite);
                this.couldGoToBack = true;
                Backbone.trigger(Events.Backbone.Renderer.RenderAnimation, this.moveCard.bind(this), this.frames);
                $(this).off(Events.Game.InfoCardModel.InfoCardInOwnContainer);
                $(this).one(Events.Game.InfoCardModel.InfoCardInOwnContainer, function () {
                    infoCardModel.trigger(Events.Game.Player.InfoCardInOwnContainer, cardModel);
                });
            }

            calcStartPositionForInfoCard(card){
                this.containerView.x = 0;
                this.containerView.y = 0;
                let cardX = card.x, cardY= card.y;
                while(card.parent.parent !== undefined) {
                    this.containerView.x += card.parent.x;
                    this.containerView.y += card.parent.y;
                    card = card.parent;
                }
                this.containerView.x -= SETTING.cardWidth/2;
                this.containerView.y -= SETTING.oneLineHeight/2;
                this.sprite.x = this.sprite.width/2;
                this.sprite.y = this.sprite.height/2;
                this.containerView.addChild(this.sprite);
            }

            moveCard(){
                this.containerView.x+=this.sprite.rateX;
                this.containerView.y+=this.sprite.rateY;
                if (Math.abs(this.containerView.x - this.sprite.mustX) < 10 && Math.abs(this.containerView.y - this.sprite.mustY) < 10){
                    if (!this.couldGoToBack) {
                        $(this).trigger("CardOnPosition");
                        this.couldGoToBack = true;
                    }
                    if (Math.abs(this.sprite.x - this.container.containerView.x) <= SETTING.cardWidth + 10) {
                        $(this).trigger(Events.Game.InfoCardModel.InfoCardInOwnContainer);
                    }
                }
            }

            calcSize(width, height){
                this.sprite.width = width;
                this.sprite.height = height;
                this.sprite.anchor.set(0.5);
            }

            calcMustPosition(cardPositionInContainerX, cardPositionInContainerY, object = undefined){
                let par = object;
                while(object !== undefined && par.parent){
                    this.sprite.mustX += par.x;
                    this.sprite.mustY += par.y;
                    par = par.parent;
                }
                this.sprite.mustX += cardPositionInContainerX;
                this.sprite.mustY += cardPositionInContainerY;
            }

            moveToBattleField(cardModel, containerModel){
                this.zeroMustPosition();
                this.calcSize(cardModel.cardView.sprite.width, cardModel.cardView.sprite.height);
                let positionX = 0;
                console.log(containerModel, "move To Battle Field");
                if (containerModel.cardCollection.length) {
                    positionX = containerModel.cardCollection[containerModel.cardCollection.length - 1].cardView.sprite.x;
                    positionX += cardModel.cardView.sprite.width / 2;
                }
                if (positionX === 0){
                    positionX = containerModel.View.containerView.width / 2;
                }
                this.calcMustPosition(positionX, cardModel.cardView.sprite.y, containerModel.View.containerView);
                this.calcDeltaAndRate();
                this.couldGoToBack = false;
                cardModel.cardView.sprite.parent.removeChild(cardModel.cardView.sprite);
                $(this).one("CardOnPosition", function () {
                    containerModel.trigger(Events.Game.AbstractCardContainerModel.AddChild, cardModel);
                    if (this.sprite.parent) {
                        this.sprite.parent.removeChild(this.sprite);
                    }
                    this.trigger(Events.Game.InfoCardModel.InfoCardInBattleContainer, cardModel, containerModel);
                    this.playerOwner.trigger(Events.Game.AbstractPlayer.GraphicsVisibleAndEventsOnForContainer);
                }.bind(this));
                Backbone.trigger(Events.Backbone.Renderer.RenderAnimation, this.moveCard.bind(this), this.frames);
            }

            zeroSpritePosition(){
                this.sprite.x = 0;
                this.sprite.y = 0;
            }

            zeroMustPosition(){
                this.sprite.mustX = 0;
                this.sprite.mustY = 0;
            }

            calcDeltaAndRate(){
                this.sprite.deltaX = this.sprite.mustX - this.containerView.x;
                this.sprite.deltaY = this.sprite.mustY - this.containerView.y;
                this.sprite.rateX = this.sprite.deltaX/this.frames;
                this.sprite.rateY = this.sprite.deltaY/this.frames;
                console.log(this.sprite.deltaX, this.sprite.deltaY, this.sprite.rateX, this.sprite.rateY);
            }


            backToDeck(cardModel){
                let card = cardModel.cardView;
                if (this.couldGoToBack) {
                    this.zeroMustPosition();
                    this.calcSize(card.sprite.width, card.sprite.height);
                    this.calcMustPosition(card.sprite.x - SETTING.cardWidth/2, card.sprite.y - SETTING.oneLineHeight/2, card.sprite.parent);
                    this.calcDeltaAndRate();
                    this.container.removeText("power");
                    this.couldGoToBack = false;
                    $(this).off(Events.Game.InfoCardModel.InfoCardInOwnContainer);
                    Backbone.trigger(Events.Backbone.Renderer.RenderAnimation, this.moveCard.bind(this), this.frames);
                }
                $(this).one("CardOnPosition", function () {
                    if (this.sprite.parent){
                        this.sprite.parent.removeChild(this.sprite);
                        this.trigger(Events.Game.InfoCardModel.InfoCardInContainer, cardModel);
                        this.couldGoToBack = true;
                        console.log(this.couldGoToBack);
                    }
                }.bind(this));
            }
        }
        return InfoCardView;
    }
);

