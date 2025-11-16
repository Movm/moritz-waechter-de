import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  ReactCompareSlider,
  ReactCompareSliderImage
} from 'react-compare-slider';
import styles from './ImageComparison.module.css';

interface ImageComparisonProps {
  imageBefore: string;
  imageAfter: string;
  altBefore: string;
  altAfter: string;
}

export const ImageComparison = ({
  imageBefore,
  imageAfter,
  altBefore,
  altAfter
}: ImageComparisonProps): ReactNode => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrame = useRef<number | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);

  useEffect(() => {
    const updateSliderPosition = () => {
      animationFrame.current = null;

      if (!containerRef.current) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      // Early exit if the comparison is outside of the viewport
      if (rect.bottom <= 0 || rect.top >= viewportHeight) {
        return;
      }

      const scrollRange = viewportHeight + rect.height;
      const rawProgress = (viewportHeight - rect.top) / scrollRange;
      const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);
      const targetPosition = (1 - clampedProgress) * 100;

      setSliderPosition((prev) => (
        Math.abs(prev - targetPosition) < 0.5 ? prev : targetPosition
      ));
    };

    const scheduleUpdate = () => {
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }

      animationFrame.current = window.requestAnimationFrame(updateSliderPosition);
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }

      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={imageBefore}
            alt={altBefore}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={imageAfter}
            alt={altAfter}
          />
        }
        position={sliderPosition}
        className={styles.slider}
        onPositionChange={(position) => setSliderPosition(position)}
      />
    </div>
  );
};
