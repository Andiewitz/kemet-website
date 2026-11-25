import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router'

import { Footer } from './components/Footer'
import { ToastProvider } from './components/Toast'
import { StoreProvider } from './lib/store'
import { Home } from './pages/Home'

// Home is in the first bundle; every other route loads on navigation.
const Book = lazy(() => import('./pages/Book').then((m) => ({ default: m.Book })))
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })))
const DestinationPage = lazy(() => import('./pages/Destination').then((m) => ({ default: m.DestinationPage })))
const Destinations = lazy(() => import('./pages/Destinations').then((m) => ({ default: m.Destinations })))
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })))
const Reviews = lazy(() => import('./pages/Reviews').then((m) => ({ default: m.Reviews })))
const Styleguide = lazy(() => import('./pages/Styleguide').then((m) => ({ default: m.Styleguide })))
const TourPage = lazy(() => import('./pages/Tour').then((m) => ({ default: m.TourPage })))
const Tours = lazy(() => import('./pages/Tours').then((m) => ({ default: m.Tours })))
const Trips = lazy(() => import('./pages/Trips').then((m) => ({ default: m.Trips })))

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) return void setTimeout(() => el.scrollIntoView(), 380)
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])
  return null
}

function PageFallback() {
  return (
    <div className="flex min-h-[60svh] items-center justify-center" role="status">
      <span className="sr-only">Loading page</span>
    </div>
  )
}

function Pages() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.main
        id="main"
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1"
      >
        <Suspense fallback={<PageFallback />}>
          <Routes location={location}>
            <Route index element={<Home />} />
            <Route path="tours" element={<Tours />} />
            <Route path="tours/:slug" element={<TourPage />} />
            <Route path="book/:slug" element={<Book />} />
            <Route path="destinations" element={<Destinations />} />
            <Route path="destinations/:slug" element={<DestinationPage />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="contact" element={<Contact />} />
            <Route path="trips" element={<Trips />} />
            <Route path="styleguide" element={<Styleguide />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.main>
    </AnimatePresence>
  )
}

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <StoreProvider>
          <ToastProvider>
            <ScrollToTop />
            <a href="#main" className="sr-only z-[100] rounded-full bg-ink px-5 py-3 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
              Skip to content
            </a>
            <div className="flex min-h-svh flex-col">
              <Pages />
              <Footer />
            </div>
          </ToastProvider>
        </StoreProvider>
      </BrowserRouter>
    </MotionConfig>
  )
}
