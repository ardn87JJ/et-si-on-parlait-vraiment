export const THEME_IDS = [
  'grandes_questions',
  'faire_le_point',
  'histoires',
  'talents',
  'reves',
] as const;

export type ThemeId = (typeof THEME_IDS)[number];
export type CardEdition = 'standard' | 'premium';

export interface ThemeDefinition {
  id: ThemeId;
  label: string;
  shortLabel: string;
  symbol: string;
  color: string;
}

export interface ConversationCard {
  id: string;
  edition: CardEdition;
  theme: ThemeId;
  question: string;
  exploration: string;
}

export type JokerId = 'libre' | 'futur' | 'ia' | 'miroir' | 'opposee';

export interface JokerDefinition {
  id: JokerId;
  name: string;
  effect: string;
  imageUrl: string;
}

export type DrawResult =
  | {
      kind: 'card';
      theme: ThemeId;
      card: ConversationCard;
    }
  | {
      kind: 'joker';
      theme: ThemeId;
      joker: JokerDefinition;
    };

