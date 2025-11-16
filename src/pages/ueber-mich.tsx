import type {ReactNode} from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Layout, Hero } from '@/components';
import styles from './ueber-mich.module.css';

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

export default function UeberMich(): ReactNode {
  return (
    <Layout
      title="Über mich"
      description="Erfahre mehr über Moritz Wächter - Student der Politikwissenschaften, Grünen-Politiker und Kommunikationsexperte aus dem Rhein-Sieg-Kreis.">
      <div className={styles.container}>
        {/* Hero Section */}
        <Hero
          title="Über mich"
          markedWord="mich"
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
          image="/img/portrait-politics.jpg"
          imageAlt="Moritz Wächter"
        />

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
                Ich studiere Politikwissenschaften an der Rheinischen Friedrich-Wilhelms-Universität
                und bin nebenberuflich bei der bpb sowie Martin Metz, MdL. Vorher habe ich drei Jahre
                lang als Assistent von Alexandra Geese, MdEP in Bonn gearbeitet. Im Rahmen meines
                Bachelorstudiums der Sozialpolitik an der Hochschule Bonn-Rhein-Sieg forschte über
                die soziale Mobilität von Kindertagesstätten. Ganzer Lebenslauf auf{' '}
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
                Ich bin Mitglied der Grünen Jugend und Kreisvorsitzender der Grünen im Rhein-Sieg-Kreis.
                Mein Herz schlägt für Sozial- und Familienpolitik, aber seit ich bei den Grünen bin
                kämpfe ich auch für Umwelt- und Klimaschutz.
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
                In meiner Freizeit mache ich Grafik- und Webdesign, unter anderem diese kleine Seite.
                Wenn ich mal richtig viel Zeit habe, schreibe ich Texte. Häufiger{' '}
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
      </div>
    </Layout>
  );
}
