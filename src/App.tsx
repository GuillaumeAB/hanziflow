import React, { useState, useEffect } from 'react';
import { UserProgress, Deck, Flashcard, LessonUnit } from './types';
import { StorageService } from './services/storageService';
import { SrsService } from './services/srsService';
import { Header } from './components/layout/Header';
import { Sidebar, NavTab } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { LessonListView } from './components/lessons/LessonListView';
import { LessonExerciseModal } from './components/lessons/LessonExerciseModal';
import { DeckListView } from './components/anki/DeckListView';
import { DeckBrowser } from './components/anki/DeckBrowser';
import { AnkiReviewSession } from './components/anki/AnkiReviewSession';
import { AudioSpeedSprint } from './components/games/AudioSpeedSprint';
import { RadicalBuilder } from './components/games/RadicalBuilder';
import { ToneTrainer } from './components/tones/ToneTrainer';
import { RadicalExplorer } from './components/radicals/RadicalExplorer';
import { OralSentencesView } from './components/sentences/OralSentencesView';
import { CharacterInspectorModal } from './components/inspector/CharacterInspectorModal';
import { CustomCardModal } from './components/common/CustomCardModal';

export const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>(() => StorageService.loadProgress());
  const [decksAndCards, setDecksAndCards] = useState<{ decks: Deck[]; cards: Flashcard[] }>(() =>
    StorageService.loadDecksAndCards()
  );
  const [activeTab, setActiveTab] = useState<NavTab>('lessons');

  // Modals & Active Sessions
  const [inspectingCharacter, setInspectingCharacter] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<LessonUnit | null>(null);
  const [activeAnkiDeck, setActiveAnkiDeck] = useState<Deck | null>(null);
  const [isBrowsingCards, setIsBrowsingCards] = useState<boolean>(false);
  const [isCreatingCard, setIsCreatingCard] = useState<boolean>(false);

  // Sync dark mode class with DOM
  useEffect(() => {
    if (progress.settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [progress.settings.darkMode]);

  const handleUpdateSettings = (newSettings: Partial<UserProgress['settings']>) => {
    const updated = {
      ...progress,
      settings: {
        ...progress.settings,
        ...newSettings
      }
    };
    setProgress(updated);
    StorageService.saveProgress(updated);
  };

  const handleLessonComplete = (xpEarned: number) => {
    if (!activeLesson) return;
    const updated = StorageService.completeLesson(activeLesson.id, xpEarned);
    setProgress(updated);
  };

  const handleAddXP = (amount: number) => {
    const updated = StorageService.addXP(amount);
    setProgress(updated);
  };

  const handleUpdateCardSRS = (cardId: string, updatedCard: Flashcard) => {
    const updatedCards = StorageService.updateCardSRS(cardId, updatedCard);
    setDecksAndCards(prev => ({
      ...prev,
      cards: updatedCards
    }));
    // Award 5 XP for reviewing an Anki flashcard
    const updatedProg = StorageService.addXP(5);
    setProgress(updatedProg);
  };

  const handleAddCustomCard = (newCard: Flashcard) => {
    const updatedCards = [newCard, ...decksAndCards.cards];
    StorageService.saveCards(updatedCards);
    setDecksAndCards(prev => ({
      ...prev,
      cards: updatedCards
    }));
    const updatedProg = StorageService.addXP(15);
    setProgress(updatedProg);
  };

  const handleToggleStarCharacter = (char: string) => {
    const updated = StorageService.toggleStarCharacter(char);
    setProgress(updated);
  };

  const dueCardsCount = decksAndCards.cards.filter(c => SrsService.isDue(c)).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-red-500 selection:text-white pb-20 md:pb-0">
      {/* Top Header */}
      <Header
        progress={progress}
        onUpdateSettings={handleUpdateSettings}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setIsBrowsingCards(false);
          }}
          dueCardsCount={dueCardsCount}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'lessons' && (
            <LessonListView
              completedLessonIds={progress.completedLessons}
              onStartLesson={(lesson) => setActiveLesson(lesson)}
              onSelectCharacter={(char) => setInspectingCharacter(char)}
            />
          )}

          {activeTab === 'anki' && (
            isBrowsingCards ? (
              <DeckBrowser
                decks={decksAndCards.decks}
                cards={decksAndCards.cards}
                onSelectCharacter={(char) => setInspectingCharacter(char)}
                onUpdateCardSRS={handleUpdateCardSRS}
                onBackToDecks={() => setIsBrowsingCards(false)}
              />
            ) : (
              <DeckListView
                decks={decksAndCards.decks}
                cards={decksAndCards.cards}
                onSelectDeck={(deck) => setActiveAnkiDeck(deck)}
                onBrowseCards={() => setIsBrowsingCards(true)}
                onAddCard={() => setIsCreatingCard(true)}
                streak={progress.streak}
              />
            )
          )}

          {activeTab === 'sprint' && (
            <AudioSpeedSprint
              onAddXP={handleAddXP}
              onSelectCharacter={(char) => setInspectingCharacter(char)}
            />
          )}

          {activeTab === 'builder' && (
            <RadicalBuilder
              onAddXP={handleAddXP}
              onSelectCharacter={(char) => setInspectingCharacter(char)}
            />
          )}

          {activeTab === 'tones' && (
            <ToneTrainer />
          )}

          {activeTab === 'radicals' && (
            <RadicalExplorer
              onSelectCharacter={(char) => setInspectingCharacter(char)}
            />
          )}

          {activeTab === 'sentences' && (
            <OralSentencesView
              onSelectCharacter={(char) => setInspectingCharacter(char)}
              showPinyin={progress.settings.showPinyin}
              toneColors={progress.settings.toneColors}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setIsBrowsingCards(false);
        }}
        dueCardsCount={dueCardsCount}
      />

      {/* Interactive Character & Radical Inspector (The HelloChinese breakdown popup) */}
      {inspectingCharacter && (
        <CharacterInspectorModal
          char={inspectingCharacter}
          onClose={() => setInspectingCharacter(null)}
          isStarred={progress.starredCharacters.includes(inspectingCharacter)}
          onToggleStar={handleToggleStarCharacter}
          onSelectComponent={(char) => setInspectingCharacter(char)}
        />
      )}

      {/* Active HelloChinese Lesson Modal */}
      {activeLesson && (
        <LessonExerciseModal
          lesson={activeLesson}
          onClose={() => setActiveLesson(null)}
          onComplete={handleLessonComplete}
          onSelectCharacter={(char) => setInspectingCharacter(char)}
        />
      )}

      {/* Active Anki Review Session */}
      {activeAnkiDeck && (
        <AnkiReviewSession
          deck={activeAnkiDeck}
          allDeckCards={decksAndCards.cards.filter(c => c.deckId === activeAnkiDeck.id)}
          onClose={() => setActiveAnkiDeck(null)}
          onUpdateCardSRS={handleUpdateCardSRS}
          onSelectCharacter={(char) => setInspectingCharacter(char)}
        />
      )}

      {/* Custom Card Creator Modal */}
      {isCreatingCard && (
        <CustomCardModal
          decks={decksAndCards.decks}
          onClose={() => setIsCreatingCard(false)}
          onAddCard={handleAddCustomCard}
        />
      )}
    </div>
  );
};

export default App;
