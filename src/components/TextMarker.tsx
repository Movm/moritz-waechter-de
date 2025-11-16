import type {ReactNode} from 'react';
import styles from './TextMarker.module.css';

interface TextMarkerProps {
  children: ReactNode;
  /** Color variant: eucalyptus (default), cream, or phtalo */
  variant?: 'eucalyptus' | 'cream' | 'phtalo';
  /** Custom color (overrides variant) */
  color?: string;
}

const variantColors = {
  eucalyptus: 'var(--secondary-300)',
  cream: 'var(--tertiary-300)',
  phtalo: 'var(--primary-300)',
};

export const TextMarker = ({ children, variant = 'eucalyptus', color }: TextMarkerProps): ReactNode => {
  const markerColor = color || variantColors[variant];

  return (
    <span
      className={styles.textMarker}
      style={{ '--marker-color': markerColor } as React.CSSProperties}
    >
      {children}
    </span>
  );
};
