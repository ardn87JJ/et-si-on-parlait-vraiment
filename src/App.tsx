import { useMemo, useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { WelcomeScreen } from './components/WelcomeScreen';
import { loadCards } from './data/cardRepository';

type CardsResult =
  | { status: 'ready'; cards: ReturnType<typeof loadCards> }
  | { status: 'error'; message: string };

export function App() {
  const [started, setStarted] = useState(false);
  const cardsResult = useMemo<CardsResult>(() => {
    try {
      return { status: 'ready', cards: loadCards() };
    } catch (error) {
      return {
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Le fichier de cartes ne peut pas être lu.',
      };
    }
  }, []);

  if (cardsResult.status === 'error') {
    return (
      <main className="data-error">
        <p>Impossible de préparer le jeu.</p>
        <h1>Vérifiez cartes.csv</h1>
        <pre>{cardsResult.message}</pre>
      </main>
    );
  }

  return started ? (
    <GameBoard cards={cardsResult.cards} />
  ) : (
    <WelcomeScreen onBegin={() => setStarted(true)} />
  );
}

