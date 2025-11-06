'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import PresentationCard from './components/PresentationCard';
import { presentations } from './lib/presentations';
import { Presentation } from './lib/types';
import styles from './page.module.css';

// Dynamically import PresentationModal to avoid SSR issues with react-pdf
const PresentationModal = dynamic(() => import('./components/PresentationModal'), {
  ssr: false,
});

export default function Home() {
  const [selectedPresentation, setSelectedPresentation] = useState<Presentation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'pdf' | 'revealjs'>('all');

  const filteredPresentations = presentations.filter(
    (presentation) => activeFilter === 'all' || presentation.type === activeFilter
  );
  const latestPresentation = filteredPresentations[0] ?? presentations[0];
  const gridPresentations = filteredPresentations.filter(
    (presentation) =>
      !(activeFilter === 'all' && latestPresentation && presentation.id === latestPresentation.id)
  );

  const handleCardClick = (presentation: Presentation) => {
    setSelectedPresentation(presentation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPresentation(null), 300);
  };

  return (
    <>
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={styles.titleBlock}
            >
              <h1 className={styles.title}>
                <span className={styles.titleMuted}>~/stephenokita/</span>presentations
              </h1>
              <p className={styles.count}>{presentations.length} presentations</p>
            </motion.div>

            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={styles.filterNav}
              aria-label="Presentation filters"
            >
              {['all', 'pdf', 'revealjs'].map((filter) => {
                const isActive = activeFilter === filter;
                const classes = [styles.filterButton];
                if (isActive) classes.push(styles.filterButtonActive);
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter as 'all' | 'pdf' | 'revealjs')}
                    className={classes.join(' ')}
                  >
                    {filter}
                  </button>
                );
              })}
            </motion.nav>
          </div>
        </header>

        <main className={styles.main}>
          {filteredPresentations.length > 0 && latestPresentation && (
            <section>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.featuredLayout}
              >
                <div className={styles.featuredCard}>
                  <span className={styles.featuredPill}>Latest</span>
                  <div>
                    <h2 className={styles.featuredTitle}>{latestPresentation.title}</h2>
                    <p className={styles.featuredDescription}>{latestPresentation.description}</p>
                  </div>
                  <div className={styles.featuredMeta}>
                    <time>
                      {new Date(latestPresentation.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <span className={styles.featuredMetaDivider} />
                    <span>{latestPresentation.type === 'pdf' ? 'PDF Deck' : 'Reveal.js'}</span>
                    <span className={styles.featuredMetaDivider} />
                    <span>{latestPresentation.id}</span>
                  </div>
                  <div className={styles.featuredActions}>
                    <button
                      type="button"
                      onClick={() => handleCardClick(latestPresentation)}
                      className={styles.ctaPrimary}
                    >
                      Open Presentation
                    </button>
                  </div>
                </div>
                <div className={styles.featuredPreview}>
                  <PresentationCard
                    presentation={latestPresentation}
                    onClick={() => handleCardClick(latestPresentation)}
                    isActive={selectedPresentation?.id === latestPresentation.id}
                  />
                </div>
              </motion.div>
            </section>
          )}

          <section>
            <header className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Chronological Stack</h2>
              <span className={styles.sectionTagline}>
                {activeFilter === 'all' ? 'All formats' : `${activeFilter} only`}
              </span>
            </header>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={styles.grid}
            >
              {gridPresentations.map((presentation) => (
                <PresentationCard
                  key={presentation.id}
                  presentation={presentation}
                  onClick={() => handleCardClick(presentation)}
                  isActive={selectedPresentation?.id === presentation.id}
                />
              ))}
            </motion.div>

            {gridPresentations.length === 0 && filteredPresentations.length > 0 && (
              <div className={styles.gridInfo}>
                The latest deck is featured above; no additional presentations match the current filter.
              </div>
            )}

            {filteredPresentations.length === 0 && (
              <div className={styles.gridEmpty}>No presentations match the current filter.</div>
            )}
          </section>

          {presentations.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.gridEmpty}>
              No presentations found.
            </motion.div>
          )}
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <p>Next.js · Reveal.js · Nord</p>
          </div>
        </footer>
      </div>

      {/* Modal */}
      <PresentationModal
        presentation={selectedPresentation}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
