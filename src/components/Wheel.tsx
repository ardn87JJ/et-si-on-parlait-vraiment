import { useEffect, useRef, useState } from 'react';
import { THEMES, WHEEL_SPIN_DURATION_MS } from '../config/game';
import type { ThemeId } from '../domain/types';

interface WheelProps {
  spinRequest: number;
  spinning: boolean;
  onSpinEnd: (theme: ThemeId) => void;
}

function positiveModulo(value: number, divisor: number): number {
  return ((value % divisor) + divisor) % divisor;
}

export function Wheel({ spinRequest, spinning, onSpinEnd }: WheelProps) {
  const [rotation, setRotation] = useState(0);
  const pendingTheme = useRef<ThemeId | null>(null);
  const lastRequest = useRef(0);

  useEffect(() => {
    if (spinRequest === 0 || spinRequest === lastRequest.current) {
      return;
    }

    lastRequest.current = spinRequest;
    const selectedIndex = Math.floor(Math.random() * THEMES.length);
    const selectedTheme = THEMES[selectedIndex];
    const targetAngle = -selectedIndex * (360 / THEMES.length);

    setRotation((currentRotation) => {
      const currentAngle = positiveModulo(currentRotation, 360);
      const alignment = positiveModulo(targetAngle - currentAngle, 360);
      const fullTurns = 6 + Math.floor(Math.random() * 3);
      return currentRotation + fullTurns * 360 + alignment;
    });
    pendingTheme.current = selectedTheme.id;
  }, [spinRequest]);

  function handleTransitionEnd(
    event: React.TransitionEvent<HTMLDivElement>,
  ): void {
    if (event.propertyName !== 'transform' || !pendingTheme.current) {
      return;
    }

    const theme = pendingTheme.current;
    pendingTheme.current = null;
    onSpinEnd(theme);

    if ('vibrate' in navigator) {
      navigator.vibrate(35);
    }
  }

  return (
    <div className="wheel-assembly" aria-live="polite">
      <div className="wheel-pointer" aria-hidden="true">
        <span />
      </div>
      <div
        className={`wheel${spinning ? ' wheel--spinning' : ''}`}
        style={{
          transform: `rotate(${rotation}deg)`,
          '--spin-duration': `${WHEEL_SPIN_DURATION_MS}ms`,
        } as React.CSSProperties}
        onTransitionEnd={handleTransitionEnd}
        role="img"
        aria-label={
          spinning
            ? 'La roue tourne'
            : 'Roue des cinq thèmes de conversation'
        }
      >
        {THEMES.map((theme, index) => (
          <div
            className="wheel__label"
            key={theme.id}
            style={{
              '--label-angle': `${index * (360 / THEMES.length)}deg`,
            } as React.CSSProperties}
          >
            <span className="wheel__symbol" aria-hidden="true">
              {theme.symbol}
            </span>
            <span>{theme.shortLabel}</span>
          </div>
        ))}
        <div className="wheel__hub">
          <span>Et si on</span>
          <strong>parlait</strong>
          <strong>vraiment&nbsp;?</strong>
          <i aria-hidden="true">♥</i>
        </div>
      </div>
      <p className="wheel-status">
        {spinning ? 'La roue choisit…' : 'La roue est prête'}
      </p>
    </div>
  );
}

