import cardsCsv from '../../cartes.csv?raw';
import {
  THEME_IDS,
  type CardEdition,
  type ConversationCard,
  type ThemeId,
} from '../domain/types';
import { parseCsv } from './parseCsv';

const EXPECTED_HEADERS = ['id', 'type', 'theme', 'question', 'exploration'];
const EDITIONS: readonly CardEdition[] = ['standard', 'premium'];
const SECTION_MARKER = /\s*⸻[\s\S]*$/u;

function isTheme(value: string): value is ThemeId {
  return THEME_IDS.some((theme) => theme === value);
}

function isEdition(value: string): value is CardEdition {
  return EDITIONS.some((edition) => edition === value);
}

function cleanExploration(value: string): string {
  return value.replace(SECTION_MARKER, '').trim();
}

export function loadCards(): readonly ConversationCard[] {
  const [headers, ...rows] = parseCsv(cardsCsv);

  if (!headers || headers.join(',') !== EXPECTED_HEADERS.join(',')) {
    throw new Error(
      `Colonnes CSV attendues : ${EXPECTED_HEADERS.join(', ')}.`,
    );
  }

  const cards = rows.map((values, rowIndex): ConversationCard => {
    if (values.length !== EXPECTED_HEADERS.length) {
      throw new Error(`Nombre de colonnes invalide à la ligne ${rowIndex + 2}.`);
    }

    const [id, edition, theme, question, exploration] = values.map((value) =>
      value.trim(),
    );

    if (!id || !question || !exploration) {
      throw new Error(`Valeur obligatoire manquante à la ligne ${rowIndex + 2}.`);
    }
    if (!isEdition(edition)) {
      throw new Error(`Type de carte inconnu à la ligne ${rowIndex + 2}.`);
    }
    if (!isTheme(theme)) {
      throw new Error(`Thème inconnu à la ligne ${rowIndex + 2}.`);
    }

    return {
      id,
      edition,
      theme,
      question,
      exploration: cleanExploration(exploration),
    };
  });

  if (new Set(cards.map((card) => card.id)).size !== cards.length) {
    throw new Error('Les identifiants de cartes doivent être uniques.');
  }

  for (const theme of THEME_IDS) {
    if (!cards.some((card) => card.theme === theme)) {
      throw new Error(`Aucune carte disponible pour le thème ${theme}.`);
    }
  }

  return cards;
}

