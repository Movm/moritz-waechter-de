import { HiCheckCircle, HiDownload, HiQuestionMarkCircle } from 'react-icons/hi';
import { Layout } from '@/components';
import styles from './gruenerator-basics-danke.module.css';

const presentationUrl = '/downloads/Gruenerator-Advanced.pdf#view=FitH';
const downloadUrl = '/downloads/Gruenerator-Advanced.pdf';
const supportUrl = 'https://gruenerator.eu/support';

export default function GrueneratorAdvancedDankePage() {
  return (
    <Layout
      title="Danke für deine Teilnahme"
      description="Die Präsentation zum Grünerator Advanced Webinar herunterladen und nochmals ansehen."
    >
      <div className={styles.page}>
        <section className={styles.intro}>
          <div className={styles.introContent}>
            <HiCheckCircle className={styles.checkIcon} aria-hidden="true" />
            <p className={styles.eyebrow}>Grünerator Advanced</p>
            <h1>Danke für deine Teilnahme am Webinar</h1>
            <p className={styles.lead}>
              Schön, dass du dabei warst. Hier findest du die Präsentation mit allen Inhalten
              und Übungen aus dem Webinar.
            </p>
            <div className={styles.actions}>
              <a className={styles.downloadButton} href={downloadUrl} download>
                <HiDownload className={styles.buttonIcon} aria-hidden="true" />
                Präsentation als PDF herunterladen
              </a>
              <a
                className={styles.supportLink}
                href={supportUrl}
                target="_blank"
                rel="noreferrer"
              >
                <HiQuestionMarkCircle className={styles.buttonIcon} aria-hidden="true" />
                Support zum Grünerator
              </a>
            </div>
          </div>
        </section>

        <section className={styles.presentationSection} aria-labelledby="presentation-heading">
          <div className={styles.presentationContent}>
            <div className={styles.sectionHeading}>
              <h2 id="presentation-heading">Grünerator Advanced</h2>
              <p>Die Webinar-Folien direkt ansehen.</p>
            </div>
            <div className={styles.presentationFrame}>
              <iframe
                src={presentationUrl}
                title="Präsentation: Grünerator Advanced"
                loading="lazy"
                allowFullScreen
                allow="fullscreen"
              />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
