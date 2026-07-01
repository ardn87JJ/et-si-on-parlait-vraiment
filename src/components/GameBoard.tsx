import { useState } from 'react';
import { THEMES } from '../config/game';
import { drawForTheme } from '../domain/drawEngine';
import type {
  ConversationCard,
  DrawResult,
  ThemeId,
} from '../domain/types';
import { BrandMark } from './BrandMark';
import { DrawnCard } from './DrawnCard';
import { Wheel } from './Wheel';

interface GameBoardProps {
  cards: readonly ConversationCard[];
}

export function GameBoard({ cards }: GameBoardProps) {
  const [spinRequest, setSpinRequest] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeId | null>(null);
  const [draw, setDraw] = useState<DrawResult | null>(null);

  function startSpin(): void {
    if (spinning) {
      return;
    }

    setDraw(null);
    setSpinning(true);
    setSpinRequest((request) => request + 1);
  }

  function handleSpinEnd(theme: ThemeId): void {
    setSelectedTheme(theme);
    setSpinning(false);
    setDraw(drawForTheme(cards, theme));
  }

  function drawAnotherCard(): void {
    if (!selectedTheme) {
      return;
    }

    const previousCardId = draw?.kind === 'card' ? draw.card.id : undefined;
    setDraw(
      drawForTheme(cards, selectedTheme, {
        excludeCardId: previousCardId,
      }),
    );
  }

  const selectedThemeLabel = THEMES.find(
    (theme) => theme.id === selectedTheme,
  )?.label;

  return (
    <main className="board">
      <header className="board__header">
        <BrandMark compact />
        <span className="board__theme">
          {selectedThemeLabel ?? 'Choisissez votre prochain échange'}
        </span>
      </header>

      <section className="board__play-area">
        <Wheel
          spinRequest={spinRequest}
          spinning={spinning}
          onSpinEnd={handleSpinEnd}
        />
      </section>

      <div className="board__controls">
        <button
          className="button button--primary button--spin"
          onClick={startSpin}
          disabled={spinning}
        >
          {spinning ? 'La roue tourne…' : 'Lancer la roue'}
        </button>
        <p>Ici, on écoute. On respecte. On partage.</p>
      </div>

      {draw && (
        <DrawnCard
          key={draw.kind === 'card' ? draw.card.id : draw.joker.id}
          draw={draw}
          onNewCard={drawAnotherCard}
          onSpinAgain={startSpin}
        />
      )}
    </main>
  );
}

