"use strict";
define([
        'backbone',
        'underscore',
        'pixi',
        'jquery',
        '../Settings',
        '../EventsConfig'
],
    function (Backbone, _, pixi, $, SETTINGS, Events) {
        class CardView{
            constructor(url) {
                this.sprite = new pixi.Sprite(new pixi.Texture.fromImage(url));
                this.sprite.interactive = true;
                this.sprite.buttonMode = true;
                this.sprite.width = SETTINGS.cardWidth;
                this.sprite.height = SETTINGS.oneLineHeight;
                _.extend(this, Backbone.Events);

            }

            changeClickListenerToBattleFieldListener(cardModel){
                this.sprite.off('click');

                this.sprite.on('click', function() {
                    this.onClickBattleCard(cardModel);
                }, this);
            }

            createBattlesInfoCard(playerOwner){
                this.battlesInfoCard = new pixi.Sprite(this.sprite.texture);
                this.battlesInfoCard.interactive = true;
                this.battlesInfoCard.buttonMode = true;
                this.battlesInfoCard.width = SETTINGS.cardWidth * 3;
                this.battlesInfoCard.height =  SETTINGS.oneLineHeight * 3;
                this.battlesInfoCard.x = this.battlesInfoCard.width/2;
                this.battlesInfoCard.y = this.battlesInfoCard.height/2;
                this.battlesInfoCard.anchor.set(0.5);
                $(playerOwner).trigger(Events.Game.AbstractPlayer.BattlesInfoCardCreated);
            }

            deleteBattlesInfoCard(){
                delete this.battlesInfoCard;
            }

            onClickBattleCard(cardModel){
                cardModel.trigger(Events.Game.AbstractCardModel.ShowInfoBattleCard);
            }

            onClickCard(cardModel){
                if (this.sprite.isClicked){
                    this.sprite.isClicked = false;
                    cardModel.trigger(Events.Game.AbstractCardModel.InfoCardBackToDeck);
                }
                else {
                    this.sprite.alpha = 0.1;
                    this.sprite.isClicked = true;
                    this.on(Events.Game.CardView.AlphaVisible, function(){
                        this.sprite.alpha = 1;
                        this.off(Events.Game.CardView.AlphaVisible);
                    }, this);
                    console.log("onclickcard");
                    cardModel.trigger(Events.Game.Player.CardViewPressed);
                }
            }

            cleanClickEventCard(){
                this.sprite.off('click');
            }

            setClickEventCard(cardModel){
                this.sprite.on('click', function () {
                    this.onClickCard(cardModel);
                }, this);
            }

            onMouseOver(){
                let filter = new pixi.filters.ColorMatrixFilter();
                this.sprite.filters = [filter];
                filter.brightness(1.5);
                this.sprite.y-=10;
            }

            onMouseOut(){
                this.sprite.y+=10;
                this.sprite.filters = null;
            }


            setTouchEventCard(cardModel){
                this.sprite
                    .on('click', function() {
                        this.onClickCard(cardModel);
                    }, this)
                    .on('mouseover', function(){
                        this.onMouseOver();
                    }, this)
                    .on('mouseout', function(){
                        this.onMouseOut();
                    }, this);
            }

            setPosition(x, y){
                this.sprite.x = x;
                this.sprite.y = y;
            }

            setPositionIntoContainer(index, containerView){
                this.sprite.x = this.sprite.width *
                    index + 3 + this.sprite.width / 2;
                this.sprite.y = this.sprite.y +
                    this.sprite.height / 2;
                this.sprite.anchor.set(0.5);
                containerView.trigger(Events.Game.CardContainerView.AddChild, this.sprite);
            }
        }
        return CardView;
    }
);

