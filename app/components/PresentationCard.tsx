'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Presentation } from '../lib/types';
import styles from './PresentationCard.module.css';

interface PresentationCardProps {
  presentation: Presentation;
  onClick: () => void;
  isActive?: boolean;
}

export default function PresentationCard({
  presentation,
  onClick,
  isActive = false,
}: PresentationCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className={`${styles.cardButton} ${isActive ? styles.active : ''}`}
    >
      <div className={styles.card}>
        <div className={styles.thumbnail}>
          <Image
            src={presentation.thumbnail}
            alt={presentation.title}
            fill
            unoptimized
            className={styles.thumbnailImage}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <span className={styles.badge}>View</span>
        </div>

        <div className={styles.content}>
          <div>
            <h3 className={styles.title}>{presentation.title}</h3>
            <time className={styles.date}>{formatDate(presentation.date)}</time>
          </div>

          <p className={styles.description}>{presentation.description}</p>

          <div className={styles.footer}>
            <span className={styles.footerFormat}>
              <span className={styles.footerFormatDot} />
              {presentation.type === 'pdf' ? 'PDF' : 'HTML'}
            </span>
            <span>{presentation.id}</span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
