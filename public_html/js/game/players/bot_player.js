"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['jquery', 'backbone', 'pixi', './AbstractPlayer', '../EventsConfig'], function ($, Backbone, pixi, AbstractPlayer, Events) {
    var Bot = function (_AbstractPlayer) {
        _inherits(Bot, _AbstractPlayer);

        function Bot(loaderRes, container) {
            _classCallCheck(this, Bot);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(Bot).call(this, loaderRes, container));
            //this.createDesc(container);
            //this.on(Events.Game.AbstractPlayer.Act, function(){
            //    this.act();
            //}, this);
            //for (let i = 0; i < this.cardCollection.length; i+=1){
            //    this.setTouchEventCard(this.cardCollection[i]);
            //}
        }

        //act(){
        //    if (this.cardCollection.length) {
        //        let card = this.cardCollection[((Math.floor(Math.random() * (this.cardCollection.length))))];
        //        $(this).one(Events.Game.Bot.MustAddToBattle, function () {
        //            let variantsOfBattleContainer = this.nowActiveContainer.length;
        //            let rand = Math.floor(Math.random() * variantsOfBattleContainer);
        //            this.trigger(Events.Game.AbstractPlayer.AddInfoCardToBattlesContainer, this.nowActiveContainer[rand]);
        //        }.bind(this));
        //        this.trigger(Events.Game.AbstractPlayer.MustCreateInfoCard, card);
        //
        //    }
        //}
        //
        //createDesc(container){
        //    super.createDeck(container);
        //}
        //
        //setTouchEventCard(card){
        //    card.trigger(Events.Game.AbstractCardModel.SetTouchEventCard, this);
        //}

        return Bot;
    }(AbstractPlayer);

    return Bot;
});
