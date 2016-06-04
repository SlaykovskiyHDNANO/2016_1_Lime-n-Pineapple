"use strict";
define([
         'jquery',
        'backbone',
        'pixi',
        '../containers/AbstractCardContainerModel',
        '../containers/CardContainerModel',
        '../containers/PlayersCardsDeck',
        '../containers/PlayersContainer',
        './AbstractPlayer',
        '../Settings',
        '../EventsConfig'
    ],  function ($, Backbone, pixi, AbstractCardContainerModel, CardContainerModel, PlayersCardsDeck, PlayersContainer, AbstractPlayer, SETTINGS, Events) {
        class Player extends AbstractPlayer{

            _createPlayersContainerInfo(){
                this.enemyContainerBoss = new PlayersContainer();

                this.enemyContainerBoss.setContainerPosition(this.stage, 10, 0);
                this.enemyContainerBoss.createGraphicsEdging(SETTINGS.battleContainerPositionX - 10, SETTINGS.oneLineHeight, false);
                this.enemyContainerBoss.trigger(Events.Game.AbstractCardContainerModel.CreateText, "score", "0", SETTINGS.cardWidth * 1.5, SETTINGS.oneLineHeight/2);
                this.enemyContainerBoss.trigger(Events.Game.PlayersContainer.PreparedForBattle);

                this.playersContainerBoss.setContainerPosition(this.stage, 10, 3 * SETTINGS.oneLineHeight);
                this.playersContainerBoss.createGraphicsEdging(SETTINGS.battleContainerPositionX - 10, SETTINGS.oneLineHeight, false);
                this.playersContainerBoss.trigger(Events.Game.AbstractCardContainerModel.CreateText, "score", "0", SETTINGS.cardWidth * 1.5, SETTINGS.oneLineHeight/2);
                this.playersContainerBoss.trigger(Events.Game.PlayersContainer.PreparedForBattle);

            }

            constructor(loaderRes, playersField){
                super(loaderRes, playersField);
                this.playersCardsDeck = new PlayersCardsDeck(this.cardCollection);
                this.createDeck();


                this
                    .listenTo(this.playersContainerBoss.bossCard, Events.Game.Player.CardViewPressed, function () {
                        console.log("BOSSES CARD PRESSED");
                        this.cardViewWasPressed(this.playersContainerBoss.bossCard);
                    }, this)
                    .listenTo(this.playersContainerBoss.bossCard, Events.Game.AbstractCardModel.BackToDeck, function () {
                        this.playersContainerBoss.bossCard.alreadyGoingBack = true;
                        this.infoCard.trigger(Events.Game.InfoCardModel.BackToDeck, this.playersContainerBoss.bossCard);
                        this.playersField.setGraphicsVisible(false);
                        this.playersField.setGraphicsListener(false);
                    });


                // create events for cards and listenTo card's events by player
                for (let i = 0; i < this.cardCollection.length; i+=1){
                    this.setTouchEventCard(this.cardCollection[i]);
                    let card = this.cardCollection[i];

                    this
                        .listenTo(card, Events.Game.Player.CardViewPressed, function () {
                            this.cardViewWasPressed(card);
                        }, this)
                        .listenTo(card, Events.Game.AbstractCardModel.BackToDeck, function () {
                            card.alreadyGoingBack = true;
                            this.infoCard.trigger(Events.Game.InfoCardModel.BackToDeck, card);
                            this.playersField.setGraphicsVisible(false);
                            this.playersField.setGraphicsListener(false);
                        }, this);
                }

                this.playersBattleInfoCardContainer = new CardContainerModel();
                this.playersBattleInfoCardContainer.setContainerPosition(this.stage, SETTINGS.infoBattleCardContainerPositionX, SETTINGS.infoBattleCardContainerPositionY);

                this._createPlayersContainerInfo();

                this.on(Events.Game.Player.InfoCardInContainer, function (cardModel) {
                    console.log("Info card in container", cardModel);
                    this.playersField.cleanClickListenerForContainers();
                    this.playersField.setTouchEventCardsOnField();
                    this.playersField.setGraphicsVisible(false);
                    this.playersField.setGraphicsListener(true);
                    cardModel.setClickEventCard();
                }, this);

                this
                    .listenTo(this.infoCard, Events.Game.Player.InfoCardInOwnContainer, function (cardModel) {
                        this.infoCardCameToOwnContainer(cardModel);
                    }, this)
                    .listenTo(this.playersField, Events.Game.Field.AddInfoCardToBattlesContainer, function (container) {
                        this.addInfoCardToBattlesContainer(container);
                    }, this)
                    .listenTo(this.playersField, Events.Game.AbstractCardContainerModel.UpdateText, function (name, value) {
                        this.playersContainerBoss.trigger(Events.Game.AbstractCardContainerModel.UpdateText, name, value);
                    }, this);

                this.on(Events.Game.Player.ShowBattlesInfoCard, function (cardModel) {
                    if(!this.infoCard.isHide){
                        this.trigger(Events.Game.AbstractPlayer.InfoCardBackToDeck, this.touchedCards[this.touchedCards.length - 1]);
                    }
                    if(this.battleCardModel){
                        this.playersBattleInfoCardContainer.View.containerView.removeChild(this.battleCardModel.cardView.battlesInfoCard);
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
                                    this.playersBattleInfoCardContainer.View.containerView.removeChild(cardModel.cardView.battlesInfoCard);
                                    cardModel.trigger(Events.Game.AbstractCardModel.ChangeClickListener);
                                    delete this.battleCardModel;
                                }
                            }.bind(this));
                        }.bind(this));
                        Backbone.trigger(Events.Backbone.Renderer.GetStage, this);
                        this.playersBattleInfoCardContainer.View.containerView.addChild(cardModel.cardView.battlesInfoCard);
                    }.bind(this));
                    cardModel.trigger(Events.Game.AbstractCardModel.CreateBattlesInfoCard);
                }, this);
            }


            cardViewWasPressed(cardModel){
                this.touchedCards.push(cardModel);
                this.touchedCards[this.touchedCards.length - 1].alreadyGoingBack = false;
                if (this.infoCard.isHide) {
                    this.playersField.offTouchEventCardsOnField();
                    this.infoCard.trigger(Events.Game.InfoCardModel.ShowInfoCard, cardModel);
                }
                else{
                    this.createNewInfoCard(cardModel);
                }
            }

            createNewInfoCard(){
                console.log("CreateNewInfoCard");
                this.playersField.cleanClickListenerForContainers();
                //this.playersField.setGraphicsVisible(false);
                if (!this.touchedCards[this.touchedCards.length - 2].alreadyGoingBack) {
                    this.infoCard.trigger(Events.Game.InfoCardModel.BackToDeck, this.touchedCards[this.touchedCards.length - 2]);
                    this.playersField.setGraphicsVisible(false);
                    this.playersField.setGraphicsListener(false);
                }
                let newCard = this.touchedCards[this.touchedCards.length - 1];
                $(this.touchedCards[this.touchedCards.length - 2]).one(Events.Game.Player.PreviousInfoCardInDeck, function (){
                    this.cardViewWasPressed(newCard);
                }.bind(this));
            }

            infoCardCameToOwnContainer(cardModel){
                this.playersField.definitionCardsClasses(cardModel);
            }

            act(){
            }

            setTouchEventCard(card){
                card.trigger(Events.Game.AbstractCardModel.SetTouchEventCard, this);
            }

            createDeck() {
                this.playersCardsDeck.createPlayersDeck();
            }


            addInfoCardToBattlesContainer(container){
                if (this.touchedCards[this.touchedCards.length - 1]) {
                    this.touchedCards[this.touchedCards.length - 1].trigger(Events.Game.AbstractCardModel.ChangeClickListener);
                    this.infoCard.trigger(Events.Game.InfoCardModel.AddToBattlesContainer, this.touchedCards[this.touchedCards.length - 1], container);
                    this.touchedCards.length = 0;
                    this.playersField.cleanClickListenerForContainers();
                    this.playersField.setGraphicsVisible(false);
                    this.playersField.setGraphicsListener(true);
                }
            }
        }
        return Player;
    }
);

