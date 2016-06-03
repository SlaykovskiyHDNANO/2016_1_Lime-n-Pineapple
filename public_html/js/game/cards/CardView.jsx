"use strict";
define([
        'backbone',
        'underscore',
        'pixi',
        'jquery',
        '../containers/SpritesContainerView',
        '../Settings',
        '../EventsConfig'
],
    function (Backbone, _, pixi, $, SpritesContainerView, SETTINGS, Events) {
        class CardView{
            constructor(cardModel) {
                _.extend(this, Backbone.Events);
                console.log(cardModel);
                this.sprite = new pixi.Sprite(new pixi.Texture.fromImage(cardModel.url));
                this.sprite.interactive = true;
                this.sprite.buttonMode = true;
                this.sprite.isClicked = false;
                this.sprite.width = SETTINGS.cardWidth;
                this.sprite.height = SETTINGS.oneLineHeight;
                this.container = new SpritesContainerView(cardModel, this.sprite);

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
                console.log(this.sprite.isClicked, "isClicked");
                if (this.sprite.isClicked){
                    this.sprite.isClicked = false;
                    cardModel.trigger(Events.Game.AbstractCardModel.BackToDeck);
                }
                else {
                    this.container.containerView.alpha = 0.1;
                    this.sprite.isClicked = true;
                    this.on(Events.Game.CardView.AlphaVisible, function(){
                        this.container.containerView.alpha = 1;
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
                cardModel.cardView.sprite.isClicked = false;
                this.sprite.on('click', function () {
                    this.onClickCard(cardModel);
                }, this);
            }

            setTouchEventCard(cardModel){
                this.sprite
                    .on('click', function() {
                        this.onClickCard(cardModel);
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

            getPositionX(){
                return this.sprite.x;
            }

            getPositionY(){
                return this.sprite.y;
            }

            getContainersPositionX(){
                return this.container.containerView.x;
            }

            getContainersPositionY(){
                return this.container.containerView.y;
            }
        }
        return CardView;
    }
);

