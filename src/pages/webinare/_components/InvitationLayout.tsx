import React, { useState, useRef, ReactNode } from 'react';
import Link from '@docusaurus/Link';
import styles from '../einladung-styles.module.css';

interface InvitationLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function InvitationLayout({ title, description, children }: InvitationLayoutProps) {
  const [copied, setCopied] = useState(false);
  const invitationRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    if (invitationRef.current) {
      const text = invitationRef.current.innerText;
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
      <div className={styles.container}>
        {/* Background Gradient */}
        <div className={styles.backgroundGradient} />
        
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <h1 className={styles.heroTitle}>
              {title}
            </h1>
            <p className={styles.heroDescription}>
              {description}
            </p>
            <button
              onClick={handleCopy}
              className={styles.copyButton}
            >
              {copied ? (
                <>
                  <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Kopiert!
                </>
              ) : (
                <>
                  <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Einladungstext kopieren
                </>
              )}
            </button>
          </div>
        </div>

        {/* Invitation Content */}
        <div className={styles.invitationSection}>
          <div className={styles.invitationContainer} ref={invitationRef}>
            <div className="invitation-content">
              {children}
            </div>
          </div>
        </div>

      </div>
  );
}