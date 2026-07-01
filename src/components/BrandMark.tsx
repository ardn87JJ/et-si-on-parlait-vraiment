interface BrandMarkProps {
  compact?: boolean;
}

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <div className={`brand-mark${compact ? ' brand-mark--compact' : ''}`}>
      <span className="brand-mark__rays" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="brand-mark__title">Et si on parlait vraiment&nbsp;?</span>
      {!compact && (
        <span className="brand-mark__subtitle">
          Le jeu des grandes conversations
        </span>
      )}
      <span className="brand-mark__heart" aria-hidden="true">
        ♥
      </span>
    </div>
  );
}

