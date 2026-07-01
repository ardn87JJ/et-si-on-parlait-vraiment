import type { JokerDefinition, ThemeDefinition } from '../domain/types';

export const JOKER_PROBABILITY = 0.12;
export const WHEEL_SPIN_DURATION_MS = 4_800;

export const THEMES: readonly ThemeDefinition[] = [
  {
    id: 'grandes_questions',
    label: 'Grandes questions',
    shortLabel: 'Grandes questions',
    symbol: '✦',
    color: '#be2e2e',
  },
  {
    id: 'faire_le_point',
    label: 'Faire le point',
    shortLabel: 'Faire le point',
    symbol: '⌖',
    color: '#df7410',
  },
  {
    id: 'histoires',
    label: 'Histoires',
    shortLabel: 'Histoires',
    symbol: '▤',
    color: '#d89a0e',
  },
  {
    id: 'talents',
    label: 'Talents',
    shortLabel: 'Talents',
    symbol: '♧',
    color: '#3e7d29',
  },
  {
    id: 'reves',
    label: 'Rêves & autre possible',
    shortLabel: 'Rêves',
    symbol: '☁',
    color: '#15888b',
  },
] as const;

export const JOKERS: readonly JokerDefinition[] = [
  {
    id: 'libre',
    name: 'Carte Libre',
    effect: 'Suivez l’instruction indiquée sur la carte.',
    imageUrl: '/assets/jokers/libre.webp',
  },
  {
    id: 'futur',
    name: 'Carte Futur',
    effect: 'Suivez l’instruction indiquée sur la carte.',
    imageUrl: '/assets/jokers/futur.webp',
  },
  {
    id: 'ia',
    name: 'Carte IA',
    effect: 'Suivez l’instruction indiquée sur la carte.',
    imageUrl: '/assets/jokers/ia.webp',
  },
  {
    id: 'miroir',
    name: 'Carte Miroir',
    effect: 'Suivez l’instruction indiquée sur la carte.',
    imageUrl: '/assets/jokers/miroir.webp',
  },
  {
    id: 'opposee',
    name: 'Carte Opposée',
    effect: 'Suivez l’instruction indiquée sur la carte.',
    imageUrl: '/assets/jokers/opposee.webp',
  },
] as const;

