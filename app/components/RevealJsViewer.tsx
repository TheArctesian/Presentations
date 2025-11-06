'use client';

import { useState } from 'react';
import styles from './RevealJsViewer.module.css';

interface RevealJsViewerProps {
  htmlPath: string;
}

export default function RevealJsViewer({ htmlPath }: RevealJsViewerProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingContent}>
            <div className={styles.spinner} />
            <p>Loading presentation...</p>
          </div>
        </div>
      )}

      <iframe
        src={htmlPath}
        className={styles.iframe}
        onLoad={() => setLoading(false)}
        title="Reveal.js Presentation"
        allow="fullscreen"
      />

      {!loading && <div className={styles.hint}>Use arrow keys to navigate</div>}
    </div>
  );
}
