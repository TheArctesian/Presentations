'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Presentation } from '../lib/types';
import PDFViewer from './PDFViewer';
import RevealJsViewer from './RevealJsViewer';
import styles from './PresentationModal.module.css';

interface PresentationModalProps {
  presentation: Presentation | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PresentationModal({
  presentation,
  isOpen,
  onClose,
}: PresentationModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    const modalElement = document.querySelector(`.${styles.modal}`);
    if (!modalElement) return;

    try {
      if (!document.fullscreenElement) {
        await modalElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  const handleDownload = () => {
    if (!presentation || presentation.type !== 'pdf') return;
    const link = document.createElement('a');
    link.href = presentation.pdfPath;
    link.download = `${presentation.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!presentation) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={styles.backdrop}
            aria-label="Close presentation"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className={styles.modalShell}
          >
            <div className={styles.modal}>
              <header className={styles.header}>
                <div className={styles.headerRow}>
                  <span className={styles.badge}>
                    {presentation.type === 'pdf' ? 'PDF Deck' : 'Reveal.js'}
                  </span>
                  <time className={styles.headerDate}>{formatDate(presentation.date)}</time>
                </div>
                <div className={styles.headerTitleRow}>
                  <h2 className={styles.title}>{presentation.title}</h2>
                  <div className={styles.headerButtons}>
                    {presentation.type === 'pdf' && (
                      <button
                        onClick={handleDownload}
                        className={styles.actionButton}
                        aria-label="Download PDF"
                        title="Download PDF"
                      >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} width={20} height={20}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={toggleFullscreen}
                      className={styles.actionButton}
                      aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                      title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                    >
                      {isFullscreen ? (
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} width={20} height={20}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                        </svg>
                      ) : (
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} width={20} height={20}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                      )}
                    </button>
                    <button onClick={onClose} className={styles.closeButton} aria-label="Close modal">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} width={20} height={20}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </header>

              <div className={styles.viewer}>
                {presentation.type === 'pdf' ? (
                  <PDFViewer pdfPath={presentation.pdfPath} />
                ) : (
                  <RevealJsViewer htmlPath={presentation.htmlPath} />
                )}
              </div>

              <footer className={styles.footer}>
                <div className={styles.footerContent}>
                  <p>{presentation.description}</p>
                  <div className={styles.footerHints}>
                    <span className={styles.hintKey}>
                      <span className={styles.kbd}>Esc</span>
                      Close
                    </span>
                    <span className={styles.hintKey}>
                      <span className={styles.kbd}>←</span>
                      <span className={styles.kbd}>→</span>
                      Navigate pages
                    </span>
                  </div>
                </div>
              </footer>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
