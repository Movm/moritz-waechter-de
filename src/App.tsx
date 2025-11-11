import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Page imports
import Home from './pages/index';
import ProjektePage from './pages/projekte';
import WebinarePage from './pages/webinare';
import ImpressumPage from './pages/impressum';
import PrivacyPage from './pages/privacy';

// Lazy load MDX pages
const KIBasicsPage = lazy(() => import('./pages/webinare/ki-basics.mdx'));
const GrueneratorBasicsPage = lazy(() => import('./pages/webinare/gruenerator-basics.mdx'));
const GrueneratorAdvancedPage = lazy(() => import('./pages/webinare/gruenerator-advanced.mdx'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
);

// 404 Page component
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-dark px-4">
      <h1 className="text-6xl font-display font-bold text-primary-600 dark:text-primary-400 mb-4">
        404
      </h1>
      <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8">
        Seite nicht gefunden
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-colors"
      >
        Zurück zur Startseite
      </a>
    </div>
  );
};

function App() {
  return (
    <Routes>
      {/* Main pages */}
      <Route path="/" element={<Home />} />
      <Route path="/projekte" element={<ProjektePage />} />
      <Route path="/webinare" element={<WebinarePage />} />
      <Route path="/impressum" element={<ImpressumPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />

      {/* MDX pages with Suspense for lazy loading */}
      <Route
        path="/webinare/ki-basics"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <KIBasicsPage />
          </Suspense>
        }
      />
      <Route
        path="/webinare/gruenerator-basics"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <GrueneratorBasicsPage />
          </Suspense>
        }
      />
      <Route
        path="/webinare/gruenerator-advanced"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <GrueneratorAdvancedPage />
          </Suspense>
        }
      />

      {/* 404 catch-all route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
