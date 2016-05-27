"use strict";
define([
        'jquery',
        'backbone',
        'underscore',
        'pixi',
        '../cards/card_collection',
        '../cards/InfoCardModel',
        '../cards/CardBossModel',
        '../EventsConfig'
],  function ($, Backbone, _, pixi, CardCollection, InfoCardModel, CardBossModel, Events) {

        class AbstractPlayer {

            constructor(loaderRes, container){
                _.extend(this, Backbone.Events);
                this.loaderRes = loaderRes;
                this.cardCollection = new CardCollection(loaderRes,20);
                if (container.playersCardsDeck !== undefined) {
                    this.playersCardsDeck = container.playersCardsDeck;
                }
                this.playersCardContainerMelee = container.playersCardContainerMelee;
                this.playersCardContainerDistant = container.playersCardContainerDistant;
                this.playersContainerBoss = container.playersContainerBoss;
                this.playersContainerBossCard = container.playersContainerBossCard;
                this.playersInfoCardContainer = container.playersInfoCardContainer;
                this.enemyCardContainerMelee = container.enemyCardContainerMelee;
                this.enemyCardContainerDistant = container.enemyCardContainerDistant;
                this.playersBattleInfoCardContainer = container.playersBattleInfoCardContainer;
                this.battleContainers = [this.playersCardContainerMelee, this.playersCardContainerDistant, this.enemyCardContainerMelee,
                    this.enemyCardContainerDistant];
                this.touchedCards = [];
                this.infoCard = new InfoCardModel(this.playersInfoCardContainer.containerView, this);

                this.createBossCard();

                this
                    .on(Events.Game.AbstractPlayer.InfoCardInOwnContainer, function (cardModel) {
                        this.definitionCardsClasses(cardModel);
                        $(this).trigger(Events.Game.Bot.MustAddToBattle);
                    }, this)

                    .on(Events.Game.AbstractPlayer.MustCreateInfoCard, function (cardModel){
                        this.touchedCards.push(cardModel);
                        if (this.infoCard.isHide) {
                            this.infoCard.trigger(Events.Game.InfoCardModel.ShowInfoCard, cardModel);
                            this.infoCard.alreadyGoingBack = false;
                        }
                        else{
                            this.createNewInfoCard();
                        }
                    }, this)

                    .on(Events.Game.AbstractPlayer.InfoCardBackToDeck, function(cardModel){
                        this.cleanClickListenerForContainers();
                        this.infoCard.alreadyGoingBack = !this.infoCard.alreadyGoingBack;
                        this.infoCard.trigger(Events.Game.InfoCardModel.BackToDeck, cardModel);
                        cardModel.trigger(Events.Game.AbstractCardModel.CleanClickEventCard);
                        this.setGraphicsVisible(false);
                        this.setGraphicsListener(true);
                    }, this)

                    .on(Events.Game.AbstractPlayer.GraphicsVisibleAndEventsOnForContainer, function () {
                        this.setGraphicsVisible(false);
                        this.setGraphicsListener(true);
                    }, this)

                    .on(Events.Game.AbstractPlayer.RemoveGapsInDeck, function () {
                        this.playersCardsDeck.trigger(Events.Game.PlayersCardsDeck.RemoveGapsInDeck);
                    }, this)

                    .on(Events.Game.AbstractPlayer.DeleteCardFromCardCollection, function (cardModel) {
                        this.playersCardsDeck.trigger(Events.Game.PlayersCardsDeck.DeleteCardFromCardCollection, cardModel);
                    }, this)

                    .on(Events.Game.AbstractPlayer.AddInfoCardToBattlesContainer, function (container) {
                        this.touchedCards[this.touchedCards.length - 1].trigger(Events.Game.AbstractCardModel.ChangeClickListener);
                        this.infoCard.trigger(Events.Game.InfoCardModel.AddToBattlesContainer, this.touchedCards[this.touchedCards.length - 1], container);
                        this.touchedCards.length = 0;
                        this.cleanClickListenerForContainers();
                    }, this)

                    .on(Events.Game.AbstractPlayer.ShowBattlesInfoCard, function (cardModel) {
                        this.cleanClickListenerForContainers();
                        if(!this.infoCard.isHide){
                            this.trigger(Events.Game.AbstractPlayer.InfoCardBackToDeck, this.touchedCards[this.touchedCards.length - 1]);
                        }
                        if(this.battleCardModel){
                            this.playersBattleInfoCardContainer.containerView.containerView.removeChild(this.battleCardModel.cardView.battlesInfoCard);
                            this.battleCardModel.trigger(Events.Game.AbstractCardModel.ChangeClickListener);
                            delete this.battleCardModel;
                        }
                        $(this).one(Events.Game.AbstractPlayer.BattlesInfoCardCreated, function () {
                            this.battleCardModel = cardModel;
                            cardModel.trigger(Events.Game.AbstractCardModel.CleanClickEventCard);
                            $(this).one(Events.Backbone.SomeObject.SendStage, function (event, stage) {
                                stage.off('click');
                                let count = 0;
                                stage.on('click', function () {
                                    count+=1;
                                    if (count === 2) {
                                        this.playersBattleInfoCardContainer.containerView.containerView.removeChild(cardModel.cardView.battlesInfoCard);
                                        cardModel.trigger(Events.Game.AbstractCardModel.ChangeClickListener);
                                        delete this.battleCardModel;
                                    }
                                }.bind(this));
                            }.bind(this));
                            Backbone.trigger(Events.Backbone.Renderer.GetStage, this);
                            this.playersBattleInfoCardContainer.containerView.containerView.addChild(cardModel.cardView.battlesInfoCard);
                        }.bind(this));
                        cardModel.trigger(Events.Game.AbstractCardModel.CreateBattlesInfoCard);
                    }, this)

                    .on(Events.Game.AbstractPlayer.InfoCardInContainer, function () {
                        this.setGraphicsVisible(false);
                        this.setGraphicsListener(true);
                        this.touchedCards.length = 0;
                    }, this)

                    .on(Events.Game.AbstractPlayer.InfoCardAddedToBattle, function () {
                        this.infoCard.isHide = true;
                        this.touchedCards.length = 0;
                        let score = 0;
                        score+=parseInt(this.playersCardContainerDistant.containerView.textField.score.text);
                        score+=parseInt(this.playersCardContainerMelee.containerView.textField.score.text);
                        this.playersContainerBoss.trigger(Events.Game.AbstractCardContainerModel.UpdateText, "score", score.toString());
                        Backbone.trigger(Events.Backbone.All.NextPlayerStep);
                    }, this);
            }

            createNewInfoCard(){
                this.cleanClickListenerForContainers();
                this.setGraphicsVisible(false);
                if (!this.infoCard.alreadyGoingBack) {
                    this.infoCard.alreadyGoingBack = !this.infoCard.alreadyGoingBack;
                    this.trigger(Events.Game.AbstractPlayer.InfoCardBackToDeck, this.touchedCards[this.touchedCards.length - 2]);
                }
                let newCard = this.touchedCards[this.touchedCards.length - 1];
                $(this.touchedCards[this.touchedCards.length - 2]).one(Events.Game.AbstractPlayer.PreviousInfoCardInDeck, function (){
                    this.trigger(Events.Game.AbstractPlayer.MustCreateInfoCard, newCard);
                }.bind(this));
            }

            setGraphicsVisible(bool){
                for (let i = 0; i < this.battleContainers.length; i+=1){
                    this.battleContainers[i].trigger(Events.Game.AbstractCardContainerModel.GraphicsVisible, bool);
                }
            }

            setGraphicsListener(bool){
                for (let i = 0; i < this.battleContainers.length; i+=1){
                    this.battleContainers[i].trigger(Events.Game.AbstractCardContainerModel.SetGraphicsListener, bool);
                }
            }

            cleanClickListenerForContainers(){
                for (let i = 0; i < this.battleContainers.length; i+=1){
                    this.battleContainers[i].trigger(Events.Game.AbstractCardContainerModel.CleanClickListener);
                }
            }

            definitionCardsClasses(card){
                this.nowActiveContainer = [];
                this.playersCardContainerMelee.trigger(Events.Game.AbstractCardContainerModel.GraphicsVisible, card.disposableContainers.melee);
                if (card.disposableContainers.melee){
                    this.playersCardContainerMelee.trigger(Events.Game.AbstractCardContainerModel.SetClickListener, this);
                    this.nowActiveContainer.push(this.playersCardContainerMelee);
                }

                this.playersCardContainerDistant.trigger(Events.Game.AbstractCardContainerModel.GraphicsVisible, card.disposableContainers.distant);
                if (card.disposableContainers.distant){
                    this.playersCardContainerDistant.trigger(Events.Game.AbstractCardContainerModel.SetClickListener, this);
                    this.nowActiveContainer.push(this.playersCardContainerDistant);
                }

                this.enemyCardContainerMelee.trigger(Events.Game.AbstractCardContainerModel.GraphicsVisible, card.disposableContainers.enemyMelee);
                if (card.disposableContainers.enemyMelee){
                    this.enemyCardContainerMelee.trigger(Events.Game.AbstractCardContainerModel.SetClickListener, this);
                    this.nowActiveContainer.push(this.enemyCardContainerMelee);
                }

                this.enemyCardContainerDistant.trigger(Events.Game.AbstractCardContainerModel.GraphicsVisible, card.disposableContainers.enemyDistant);
                if (card.disposableContainers.enemyDistant){
                    this.enemyCardContainerDistant.trigger(Events.Game.AbstractCardContainerModel.SetClickListener, this);
                    this.nowActiveContainer.push(this.enemyCardContainerDistant);
                }
            }

            createBossCard(){
                this.bossCard = new CardBossModel(this.loaderRes);
                this.playersContainerBossCard.trigger(Events.Game.AbstractCardContainerModel.SetPositionInContainer, this.bossCard.cardView.sprite);
                this.playersContainerBossCard.trigger(Events.Game.AbstractCardContainerModel.SetCardToCardCollection, this.bossCard);
            }

            createDeck() {
                if (this.playersCardsDeck !== undefined) {
                    this.playersCardsDeck.trigger(Events.Game.PlayersCardsDeck.CreatePlayersDeck, this.cardCollection);
                }
            }

        }
        return AbstractPlayer;
    }
);