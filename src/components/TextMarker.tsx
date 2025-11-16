import type {ReactNode} from 'react';
import styles from './TextMarker.module.css';

interface TextMarkerProps {
  children: ReactNode;
  color?: string;
}

export const TextMarker = ({ children, color }: TextMarkerProps): ReactNode => {
  return (
    <span
      className={styles.textMarker}
      style={color ? { '--marker-color': color } as React.CSSProperties : undefined}
    >
      {children}
    </span>
  );
};
