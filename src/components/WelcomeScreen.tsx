import wheelReferenceUrl from '../../roue.jpeg';
import { BrandMark } from './BrandMark';

interface WelcomeScreenProps {
  onBegin: () => void;
}

export function WelcomeScreen({ onBegin }: WelcomeScreenProps) {
  return (
    <main className="welcome">
      <div
        className="welcome__reference"
        style={{ backgroundImage: `url(${wheelReferenceUrl})` }}
        aria-hidden="true"
      />
      <section className="welcome__panel">
        <BrandMark />
        <p className="welcome__invitation">
          Prenez place. Tournez la roue. Laissez la conversation commencer.
        </p>
        <button className="button button--primary button--large" onClick={onBegin}>
          Commencer
        </button>
      </section>
    </main>
  );
}

