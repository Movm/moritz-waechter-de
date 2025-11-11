import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * Scrolls window to top on route change, matching standard web behavior:
 * - Forward navigation (link clicks): scroll to top
 * - Back/forward buttons: browser restores previous scroll position
 * - Anchor links: preserve hash scrolling
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  // Enable browser scroll restoration for back/forward button
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'auto';
    }
  }, []);

  // Scroll to top for forward navigation (PUSH/REPLACE), but not for back/forward (POP)
  useLayoutEffect(() => {
    // Don't scroll if:
    // 1. Navigation is from back/forward button (POP)
    // 2. There's a hash (anchor link)
    if (navigationType === 'POP' || hash) {
      return;
    }

    // Scroll to top for regular link clicks (PUSH/REPLACE)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash, navigationType]);

  return null;
};
