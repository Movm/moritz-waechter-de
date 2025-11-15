import type {ReactNode} from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Layout, ChatInterface } from '@/components';
import type { ChatTopic } from '@/types/chat';
import styles from './index.module.css';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

const Section = ({ children, className }: { children: ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      className={className}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={fadeInUp}
    >
      {children}
    </motion.section>
  );
};

export default function Home(): ReactNode {
  const [showChat, setShowChat] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<ChatTopic | null>(null);

  const handleChatStart = (topic: ChatTopic) => {
    setSelectedTopic(topic);
    setShowChat(true);
  };

  const handleChatClose = () => {
    setShowChat(false);
    setSelectedTopic(null);
  };

  return (
    <Layout
      title="Moritz Wächter - Politik und Kommunikation"
      description="Hi, ich bin Moritz Wächter">
      <div className={styles.container}>
        {/* Hero Section */}
        <motion.section
          className={styles.heroSection}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className={styles.heroContent}>
            <div className={styles.heroImage}>
              <img
                src="/img/IMG_2601-1365x2048.jpg"
                alt="Moritz Wächter"
                className={styles.profileImage}
              />
            </div>
            <div className={styles.heroText}>
              <h1 className={styles.mainHeading}>
                Hi, ich bin<br />
                <span className={styles.headingBrand}>Moritz Wächter.</span>
              </h1>
            </div>
          </div>
        </motion.section>

        {/* Facts Section */}
        <Section className={styles.factsSection}>
          <div className={styles.factsContent}>
            <h2 className={styles.sectionHeading}>Facts</h2>
            <div className={styles.factsText}>
              <p>
                Ich bin Student, 1997 geboren und lebe in Alfter im Rhein-Sieg-Kreis.
                Ich liebe Politik und Kommunikation. Ich bin in Detmold im Kreis Lippe geboren.
                Das ist so ländlich, dass es weder ICE- noch Autobahnanschluss gibt. Aber dafür die{' '}
                <a
                  href="https://de.wikipedia.org/wiki/Hermannsdenkmal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.textLink}
                >
                  höchste Statue
                </a> Deutschlands.
              </p>
            </div>
          </div>
        </Section>

        {/* Beruf Section */}
        <Section className={styles.infoSection}>
          <div className={styles.infoContent}>
            <h2 className={styles.sectionHeading}>Beruf</h2>
            <div className={styles.infoText}>
              <p>
                Ich studiere Politikwissenschaften an der Rheinischen Friedrich-Wilhelms-Universität und bin nebenberuflich bei der bpb sowie Martin Metz, MdL. Vorher habe ich drei Jahre lang als Assistent von Alexandra Geese, MdEP in Bonn gearbeitet. Im Rahmen meines Bachelorstudiums der Sozialpolitik an der Hochschule Bonn-Rhein-Sieg forschte über die soziale Mobilität von Kindertagesstätten. Ganzer Lebenslauf auf{' '}
                <a
                  href="https://www.linkedin.com/in/moritz-waechter/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.textLink}
                >
                  LinkedIn
                </a>.
              </p>
            </div>
          </div>
        </Section>

        {/* Politik Section */}
        <Section className={styles.factsSection}>
          <div className={styles.factsContent}>
            <h2 className={styles.sectionHeading}>Politik</h2>
            <div className={styles.factsText}>
              <p>
                Ich bin Mitglied der Grünen Jugend und Kreisvorsitzender der Grünen im Rhein-Sieg-Kreis. Mein Herz schlägt für Sozial- und Familienpolitik, aber seit ich bei den Grünen bin kämpfe ich auch für Umwelt- und Klimaschutz.
              </p>
            </div>
          </div>
        </Section>

        {/* Medien Section */}
        <Section className={styles.infoSection}>
          <div className={styles.infoContent}>
            <h2 className={styles.sectionHeading}>Medien</h2>
            <div className={styles.infoText}>
              <p>
                In meiner Freizeit mache ich Grafik- und Webdesign, unter anderem diese kleine Seite. Wenn ich mal richtig viel Zeit habe, schreibe ich Texte. Häufiger{' '}
                <a
                  href="https://twitter.com/moritz_waechter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.textLink}
                >
                  hier
                </a> in Kurzfassung.
              </p>
            </div>
          </div>
        </Section>

        {/* Contact & Chat Section */}
        <Section className={styles.contactSection}>
          <div className={styles.contactContent}>
            {!showChat ? (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className={styles.contactHeading}>Wie kann ich dir helfen?</h2>
                <div className={styles.actionCards}>
                  {/* <motion.button
                    className={styles.actionCard}
                    onClick={() => handleChatStart('frage')}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className={styles.actionCardIcon}>💬</div>
                    <h3 className={styles.actionCardTitle}>Eine Frage stellen</h3>
                  </motion.button>

                  <motion.button
                    className={styles.actionCard}
                    onClick={() => handleChatStart('webinar')}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className={styles.actionCardIcon}>🎓</div>
                    <h3 className={styles.actionCardTitle}>Ein Webinar buchen</h3>
                  </motion.button> */}

                  <motion.a
                    href="mailto:info@moritz-waechter.de"
                    className={`${styles.actionCard} ${styles.actionCardSmall}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <svg className={styles.actionCardIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <h3 className={styles.actionCardTitle}>E-Mail schreiben</h3>
                  </motion.a>

                  <motion.a
                    href="https://www.linkedin.com/in/moritz-waechter/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.actionCard} ${styles.actionCardSmall}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <svg className={styles.actionCardIconSvg} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <h3 className={styles.actionCardTitle}>Vernetzen</h3>
                  </motion.a>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Contact buttons stay visible above chat */}
                <div className={styles.contactButtonsRow}>
                  <motion.a
                    href="mailto:info@moritz-waechter.de"
                    className={`${styles.actionCard} ${styles.actionCardSmall}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <svg className={styles.actionCardIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <h3 className={styles.actionCardTitle}>E-Mail schreiben</h3>
                  </motion.a>

                  <motion.a
                    href="https://www.linkedin.com/in/moritz-waechter/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.actionCard} ${styles.actionCardSmall}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <svg className={styles.actionCardIconSvg} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <h3 className={styles.actionCardTitle}>Vernetzen</h3>
                  </motion.a>
                </div>

                <motion.div
                  className={styles.chatWrapper}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <ChatInterface
                    initialTopic={selectedTopic}
                    onClose={handleChatClose}
                  />
                </motion.div>
              </>
            )}
          </div>
        </Section>

      </div>
    </Layout>
  );
}
