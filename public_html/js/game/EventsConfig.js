'use strict';

define([], function () {
    return {
        Game: {
            AbstractPlayer: {
                Act: "AbstractPlayer::Act",
                InfoCardInOwnContainer: "AbstractPlayer::InfoCardInOwnContainer",
                MustCreateInfoCard: "AbstractPlayer::MustCreateInfoCard",
                InfoCardBackToDeck: "AbstractPlayer::InfoCardBackToDeck",
                GraphicsVisibleAndEventsOnForContainer: "AbstractPlayer::GraphicsVisibleAndEventsOnForContainer",
                RemoveGapsInDeck: "AbstractPlayer::RemoveGapsInDeck",
                DeleteCardFromCardCollection: "AbstractPlayer::DeleteCardFromCardCollection",
                AddInfoCardToBattlesContainer: "AbstractPlayer::AddInfoCardToBattlesContainer",
                ShowBattlesInfoCard: "AbstractPlayer::ShowBattlesInfoCard",
                BattlesInfoCardCreated: "AbstractPlayer::BattlesInfoCardCreated",
                InfoCardInContainer: "AbstractPlayer::InfoCardInContainer",
                InfoCardAddedToBattle: "AbstractPlayer::InfoCardAddedToBattle",
                PreviousInfoCardInDeck: "AbstractPlayer::PreviousInfoCardInDeck"

            },
            AbstractCardContainerModel: {
                GraphicsVisible: "AbstractCardContainerModel::GraphicsVisible",
                SetGraphicsListener: "AbstractCardContainerModel::SetGraphicsListener",
                CleanClickListener: "AbstractCardContainerModel::CleanClickListener",
                SetClickListener: "AbstractCardContainerModel::SetClickListener",
                SetPositionInContainer: "AbstractCardContainerModel::SetPositionInContainer",
                SetCardToCardCollection: "AbstractCardContainerModel::SetCardToCardCollection",
                SetContainerPosition: "AbstractCardContainerModel::SetContainerPosition",
                AddChildToBattle: "AbstractCardContainerModel::AddChildToBattle",
                CreateGraphics: "AbstractCardContainerModel::CreateGraphics",
                RemoveGapsInContainer: "AbstractCardContainerModel::RemoveGapsInContainer",
                AddChild: "AbstractCardContainerModel::AddChild",
                CreateText: "AbstractCardContainerModel::CreateText",
                UpdateText: "AbstractCardContainerModel::UpdateTextField",
                UpdateContainersScoreAfterAddedInfoCard: "AbstractCardContainerModel::UpdateContainersScoreAfterAddedInfoCard"
            },
            AbstractCardModel: {
                ChangeClickListener: "AbstractCardModel::ChangeClickListener",
                CreateBattlesInfoCard: "AbstractCardModel::CreateBattlesInfoCard",
                SetTouchEventCard: "AbstractCardModel::SetTouchEventCard",
                CleanClickEventCard: "AbstractCardModel::CleanClickEventCard",
                InfoCardBackToDeck: "AbstractCardModel::InfoCardBackToDeck",
                ShowInfoBattleCard: "AbstractCardModel::ShowInfoBattleCard",
                SetClickEventCard: "AbstractCardModel::SetClickEventCard"
            },
            PlayersContainer: {
                PreparedForBattle: "PlayersContainer::PreparedForBattle"
            },

            Player: {
                PlayerAct: "Player::PlayerAct",
                CardViewPressed: "Player::CardViewPressed",
                InfoCardInOwnContainer: "Player::InfoCardInOwnContainer"
            },
            Bot: {
                MustAddToBattle: "Bot::MustAddToBattle"
            },
            CardModel: {
                CleanClickEventCard: "CardModel::CleanClickEventCard"
            },
            InfoCardModel: {
                ShowInfoCard: "InfoCardModel::ShowInfoCard",
                BackToDeck: "InfoCardModel::BackToDeck",
                AddToBattlesContainer: "InfoCardModel::AddToBattlesContainer",
                InfoCardInOwnContainer: "InfoCardModel::InfoCardInOwnContainer",
                InfoCardInContainer: "InfoCardModel::InfoCardInContainer",
                InfoCardInBattleContainer: "InfoCardModel::InfoCardInBattleContainer"
            },
            PlayersCardsDeck: {
                RemoveGapsInDeck: "PlayersCardsDeck::RemoveGapsInDeck",
                DeleteCardFromCardCollection: "PlayersCardsDeck::DeleteCardFromCardCollection",
                CreatePlayersDeck: "PlayersCardsDeck::CreatePlayersDeck",
                GetDeckWidth: "PlayersCardsDeck::GetDeckWidth"
            },
            CardView: {
                AlphaVisible: "CardView::AlphaVisible"
            },
            CardContainerView: {
                AddChild: "CardContainerView::AddChild",
                RemoveGapsInContainer: "CardContainerView::RemoveGapsInContainer"
            }
        },
        Backbone: {
            Renderer: {
                AddChildToStage: "Renderer::AddChildToStage",
                RenderAnimation: "Renderer::renderAnimation",
                GetStage: "Renderer::GetStage",
                StopRender: "Renderer::StopRender",
                ResumeRender: "Renderer::ResumeRender",
                GameRender: "Renderer::GameRender"
            },
            SomeObject: {
                SendStage: "SomeObject::SendStage"
            },
            All: {
                AllRendered: "All::AllRendered",
                RendererStopped: "All::RendererStopped",
                RendererResume: "All::RendererResume",
                NextPlayerStep: "All::NextPlayerStep"
            }
        },
        Messenger: {}
    };
});
