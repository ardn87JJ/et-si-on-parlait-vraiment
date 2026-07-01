import { THEMES } from '../config/game';
import type { CardEdition, DrawResult, ThemeId } from '../domain/types';

interface DrawnCardProps {
  draw: DrawResult;
  onNewCard: () => void;
  onSpinAgain: () => void;
}

const CARD_BACKGROUNDS: Record<ThemeId, Record<CardEdition, string>> = {
  grandes_questions: {
    standard: '/assets/cards/01_Grandes_Questions_Standard.webp',
    premium: '/assets/cards/06_Grandes_Questions_Premium.webp',
  },
  faire_le_point: {
    standard: '/assets/cards/02_Faire_Le_Point_Standard.webp',
    premium: '/assets/cards/07_Faire_Le_Point_Premium.webp',
  },
  histoires: {
    standard: '/assets/cards/03_Histoires_Standard.webp',
    premium: '/assets/cards/08_Histoires_Premium.webp',
  },
  talents: {
    standard: '/assets/cards/04_Talents_Standard.webp',
    premium: '/assets/cards/09_Talents_Premium.webp',
  },
  reves: {
    standard: '/assets/cards/05_Reves_Standard.webp',
    premium: '/assets/cards/10_Reves_Premium.webp',
  },
};

export function DrawnCard({
  draw,
  onNewCard,
  onSpinAgain,
}: DrawnCardProps) {
  const theme = THEMES.find((item) => item.id === draw.theme);

  return (
    <div className="card-layer">
      <div className="card-layer__scrim" aria-hidden="true" />
      <section className="draw-panel" aria-label="Carte tirée">
        {draw.kind === 'card' ? (
          <article
            className="conversation-card"
            style={{
              backgroundImage: `url(${CARD_BACKGROUNDS[draw.theme][draw.card.edition]})`,
            }}
          >
            <span className="conversation-card__edition">
              {draw.card.edition}
            </span>
            <div className="conversation-card__question">
              <span>{theme?.label}</span>
              <h2>{draw.card.question}</h2>
            </div>
          </article>
        ) : (
          <article className="joker-card">
            <img src={draw.joker.imageUrl} alt="" />
            <div className="joker-card__caption">
              <span>Joker</span>
              <h2>{draw.joker.name}</h2>
              <p>{draw.joker.effect}</p>
            </div>
          </article>
        )}

        <div className="draw-panel__actions">
          <button className="button button--primary" onClick={onNewCard}>
            Nouvelle carte
          </button>
          <button className="button button--secondary" onClick={onSpinAgain}>
            Relancer la roue
          </button>
        </div>
      </section>
    </div>
  );
}

