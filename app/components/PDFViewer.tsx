'use client';

import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import styles from './PDFViewer.module.css';

// Configure PDF.js worker using react-pdf's bundled version
if (typeof window !== 'undefined' && !pdfjs.GlobalWorkerOptions.workerSrc) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

interface PDFViewerProps {
  pdfPath: string;
}

export default function PDFViewer({ pdfPath }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateWidth = () => {
      const container = document.getElementById('pdf-container');
      if (container) {
        setContainerWidth(container.offsetWidth - 48); // Subtract padding
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && pageNumber > 1) {
        setPageNumber(pageNumber - 1);
      } else if (e.key === 'ArrowRight' && pageNumber < numPages) {
        setPageNumber(pageNumber + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [pageNumber, numPages]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
  }

  return (
    <div id="pdf-container" className={styles.container}>
      {loading && (
        <div className={styles.loading}>
          <div className={styles.loadingContent}>
            <div className={styles.spinner} />
            <p className={styles.spinnerText}>Loading presentation...</p>
          </div>
        </div>
      )}

      <div className={styles.documentWrapper}>
        <Document
          file={pdfPath}
          onLoadSuccess={onDocumentLoadSuccess}
          loading=""
          error={
            <div className={styles.spinnerText}>
              <p style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#BF616A' }}>Failed to load PDF</p>
              <p style={{ fontSize: '0.85rem' }}>
                Please check if the file exists and is accessible.
              </p>
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            width={containerWidth || undefined}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            className={styles.pdfPage}
          />
        </Document>
      </div>

      {!loading && numPages > 0 && (
        <div className={styles.controls}>
          <button
            onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
            disabled={pageNumber <= 1}
            className={styles.navButton}
          >
            <svg className={styles.navButtonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <div className={styles.pageInfo}>
            <span>Page</span>
            <strong>{pageNumber}</strong>
            <span>of</span>
            <span>{numPages}</span>
          </div>

          <button
            onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
            disabled={pageNumber >= numPages}
            className={styles.navButton}
          >
            Next
            <svg className={styles.navButtonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
