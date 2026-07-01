import { JOKERS, JOKER_PROBABILITY } from '../config/game';
import type {
  ConversationCard,
  DrawResult,
  JokerDefinition,
  ThemeId,
} from './types';

interface DrawOptions {
  jokerProbability?: number;
  excludeCardId?: string;
  random?: () => number;
}

function pickOne<T>(items: readonly T[], random: () => number): T {
  if (items.length === 0) {
    throw new Error('Impossible de tirer dans une collection vide.');
  }

  const index = Math.min(Math.floor(random() * items.length), items.length - 1);
  return items[index];
}

export function drawForTheme(
  cards: readonly ConversationCard[],
  theme: ThemeId,
  options: DrawOptions = {},
): DrawResult {
  const {
    jokerProbability = JOKER_PROBABILITY,
    excludeCardId,
    random = Math.random,
  } = options;

  const boundedProbability = Math.max(0, Math.min(1, jokerProbability));

  if (random() < boundedProbability) {
    return {
      kind: 'joker',
      theme,
      joker: pickOne<JokerDefinition>(JOKERS, random),
    };
  }

  const themeCards = cards.filter((card) => card.theme === theme);
  const withoutPrevious = themeCards.filter((card) => card.id !== excludeCardId);
  const availableCards = withoutPrevious.length > 0 ? withoutPrevious : themeCards;

  return {
    kind: 'card',
    theme,
    card: pickOne(availableCards, random),
  };
}

