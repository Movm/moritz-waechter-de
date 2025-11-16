import type {ReactNode} from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Layout, TextMarker, ImageComparison, ContactForm } from '@/components';
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
                <span className={styles.headingBrand}>Moritz <TextMarker>Wächter</TextMarker>.</span>
              </h1>
            </div>
          </div>
        </motion.section>

        {/* Section 1: Künstliche Intelligenz */}
        <Section className={`${styles.imageTextSection} ${styles.whiteBackground}`}>
          <div className={styles.imageTextGrid}>
            <div className={styles.textColumn}>
              <h2 className={styles.imageTextHeading}>
                Künstliche Intelligenz.{' '}
                <span className={styles.emphasisText}>Aber <TextMarker>Sinnvoll</TextMarker>.</span>
              </h2>
              <p className={styles.imageTextBody}>
                KI kann vieles – aber nicht alles sollte sie auch tun. Ich nutze künstliche Intelligenz dort, wo sie <span className={styles.boldText}>echten Mehrwert</span> schafft: bei der Erstellung von Grafiken, beim Verfassen von Texten oder bei der Automatisierung repetitiver Aufgaben. Aber immer mit Köpfchen, nicht blind.
              </p>
            </div>
            <div className={styles.imageColumn}>
              <img
                src="/img/icebergs-aerial.jpg"
                alt="Aerial view of icebergs"
                className={styles.sectionImage}
              />
            </div>
            <div className={styles.bottomAccentBar}></div>
          </div>
        </Section>

        {/* Section 2: Also, wirklich Sinnvoll */}
        <Section className={`${styles.imageTextSection} ${styles.secondary100WithSecondary200Line}`}>
          <div className={styles.verticalStackSection}>
            <div className={styles.verticalStackText}>
              <h2 className={styles.imageTextHeading}>
                Also, <span className={styles.emphasisText}>wirklich <TextMarker>Sinnvoll</TextMarker>.</span>
              </h2>
              <p className={styles.imageTextBody}>
                Ich bin der <span className={styles.boldText}>Entwickler des Grünerators</span> – ein KI-Tool, das speziell für grüne Politik gemacht ist. Es verwandelt Stichworte in fertige Texte, verpixelte Bilder in scharfe Grafiken. Das Ergebnis: <span className={styles.boldText}>Weniger Zeitaufwand, mehr politische Wirkung.</span>
              </p>
            </div>
            <div className={styles.verticalStackImage}>
              <ImageComparison
                imageBefore="/img/imagine_old.jpg"
                imageAfter="/img/gruenerator_imagine.png"
                altBefore="Original"
                altAfter="Optimiert"
              />
            </div>
          </div>
        </Section>

        {/* Section 3: Politik */}
        <Section className={styles.imageTextSection}>
          <div className={styles.verticalStackSection}>
            <div className={styles.verticalStackText}>
              <h2 className={styles.imageTextHeading}>
                Für eine Politik, die alle{' '}
                <span className={styles.emphasisText}><TextMarker>mitdenkt</TextMarker>. Alle!</span>
              </h2>
              <p className={styles.imageTextBody}>
                Gute Politik vergisst niemanden. Ob <span className={styles.boldText}>Klimaschutz, soziale Gerechtigkeit oder Familienpolitik</span> – ich setze mich dafür ein, dass alle gehört werden und alle profitieren. Denn eine Gesellschaft ist nur so stark wie ihr schwächstes Glied.
              </p>
            </div>
            <div className={styles.verticalStackImage}>
              <img
                src="/img/portrait-politics.jpg"
                alt="Portrait of Moritz Wächter"
                className={styles.sectionImage}
              />
            </div>
            <div className={styles.rightAccentBar}></div>
          </div>
        </Section>

        {/* Section 4: Tue gutes */}
        <Section className={`${styles.imageTextSection} ${styles.lastSection}`}>
          <div className={styles.textOnlyContent}>
            <h2 className={styles.multiLineHeading}>
              Tue <strong>gutes</strong>. Und<br />
              sprich/schreib/<br />
              tweete/poste <strong>drüber</strong>.
            </h2>
            <p className={styles.imageTextBody}>
              Kommunikation ist Politik. Wer Veränderung will, muss darüber reden – <span className={styles.boldText}>laut, klar und für alle verständlich</span>. Deshalb schreibe ich Texte, gestalte Grafiken und teile Ideen. Denn die beste Idee bringt nichts, wenn sie keiner kennt.
            </p>
          </div>
        </Section>

        {/* Contact Section */}
        <Section className={styles.contactSection}>
          <div className={styles.contactContent}>
            <h2 className={styles.contactHeading}>Sag <TextMarker>Hallo</TextMarker>.</h2>

            <div className={styles.alternativeButtons}>
              <motion.a
                href="mailto:info@moritz-waechter.de"
                className={styles.alternativeButton}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                whileTap={{ scale: 0.98 }}
                aria-label="E-Mail schreiben"
              >
                <svg className={styles.alternativeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/moritz-w%C3%A4chter-6ab033210/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.alternativeButton}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Auf LinkedIn vernetzen"
              >
                <svg className={styles.alternativeIcon} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>
            </div>

            <ContactForm />
          </div>
          <div className={styles.contactAccentBar}></div>
        </Section>

      </div>
    </Layout>
  );
}
