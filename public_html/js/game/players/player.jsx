"use strict";
define([
        'jquery',
        'backbone',
        'pixi',
        '../containers/AbstractCardContainerModel',
        '../containers/CardContainerModel',
        '../containers/PlayersCardsDeck',
        './AbstractPlayer',
        '../Settings',
        '../EventsConfig'
    ],  function ($, Backbone, pixi, AbstractCardContainerModel, CardContainerModel, PlayersCardsDeck, AbstractPlayer, SETTINGS, Events) {
        class Player extends AbstractPlayer{

            constructor(loaderRes, playersField){
                super(loaderRes, playersField);
                this.playersCardsDeck = new PlayersCardsDeck(this.cardCollection);
                this.createDeck();
                this.playersBattleInfoCardContainer = new CardContainerModel();

                this.on(Events.Game.Player.PlayerAct, function(){
                    this.act();
                }, this);

                this.playersContainerBoss.setContainerPosition(this.stage, 10, 3 * SETTINGS.oneLineHeight);
                this.playersContainerBoss.createGraphicsEdging(SETTINGS.battleContainerPositionX - 10, SETTINGS.oneLineHeight, false);
                this.playersContainerBoss.trigger(Events.Game.AbstractCardContainerModel.CreateText, "score", "0", SETTINGS.cardWidth * 1.5, SETTINGS.oneLineHeight/2);
                this.playersContainerBoss.trigger(Events.Game.PlayersContainer.PreparedForBattle);

                this.listenTo(this.infoCard, Events.Game.Player.InfoCardInOwnContainer, function (cardModel) {
                    this.infoCardCameToOwnContainer(cardModel);
                }, this);

                for (let i = 0; i < this.cardCollection.length; i+=1){
                    this.setTouchEventCard(this.cardCollection[i]);
                    this.listenTo(this.cardCollection[i], Events.Game.Player.CardViewPressed, function () {
                        this.cardViewWasPressed(this.cardCollection[i]);
                    }, this);
                }
            }

            cardViewWasPressed(cardModel){
                this.touchedCards.push(cardModel);
                if (this.infoCard.isHide) {
                    this.infoCard.trigger(Events.Game.InfoCardModel.ShowInfoCard, cardModel);
                    this.infoCard.alreadyGoingBack = false;
                }
                else{
                    this.createNewInfoCard();
                }
            }

            createNewInfoCard(){
                this.playersField.cleanClickListenerForContainers();
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


        }
        return Player;
    }
);

