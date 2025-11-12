import type {ReactNode} from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components';
import styles from './webinare.module.css';
import { HiCog, HiSparkles } from 'react-icons/hi';

const webinars = [
  {
    title: "KI Basics",
    description: "Ehrenamtliche Arbeit ist ganz schön zeitaufwendig. Manchmal wünschen wir uns ein paar helfende Hände, die uns bei den ausführenden Tätigkeiten unterstützen. Dafür gibt es jetzt Künstliche Intelligenz. Sie kann uns die Arbeit im Ortsverband oder in der Fraktion erleichtern. Im Webinar zeige ich dir, wie ChatGPT und Co funktionieren und welche Tools dich am besten in der Arbeit vor Ort unterstützen.",
    duration: "90 Minuten",
    level: "Anfänger",
    additionalMetadata: "Keine Vorkenntnisse erforderlich",
    buttonText: "Zur Muster-Einladung",
    buttonHref: "/webinare/ki-basics",
    icon: (
      <HiSparkles className={`${styles.icon} ${styles.iconOrange}`} />
    )
  },
  {
    title: "Grünerator Basics",
    description: "Du möchtest Pressemitteilungen schneller erstellen oder Deine Social-Media-Präsenz stärken? Der Grünerator macht's möglich. Im Webinar zeige ich Dir, wie Du das KI-Tool optimal einsetzt, um Deine Arbeit vor Ort zu unterstützen. Der Grünerator ist ein speziell für die Grünen entwickeltes KI-Tool, das grüne Inhalte nach Wahl erstellen kann.",
    duration: "90 Minuten",
    level: "Anfänger",
    additionalMetadata: "Keine Vorkenntnisse erforderlich",
    buttonText: "Zur Muster-Einladung",
    buttonHref: "/webinare/gruenerator-basics",
    icon: (
      <HiCog className={`${styles.icon} ${styles.iconOrange}`} />
    )
  },
  {
    title: "Grünerator Advanced",
    description: "Du kennst den Grünerator schon? Dann lerne jetzt die fortgeschrittenen Funktionen kennen. Im Webinar zeige ich Dir, wie du einen Account erstellst und konfigurierst, wie du dir deinen ersten eigenen Grünerator erstellst und wie du unsere Grüne Nextcloud einbindest.",
    duration: "90 Minuten",
    level: "Fortgeschritten",
    additionalMetadata: "Grundkenntnisse erforderlich",
    buttonText: "Zur Muster-Einladung",
    buttonHref: "/webinare/gruenerator-advanced",
    icon: (
      <HiCog className={`${styles.icon} ${styles.iconOrange}`} />
    )
  }
];

export default function WebinarePage(): ReactNode {
  return (
    <Layout
      title="Webinare"
      description="Erweitere dein Wissen über Künstliche Intelligenz mit unseren interaktiven Online-Seminaren">
      <div className={styles.container}>
        {/* Unified Gradient Background */}
        <div className={styles.backgroundGradient} />

        {/* Webinars Section */}
        <WebinarLeftRightSection items={webinars} />

        {/* Contact Section */}
        <div className={styles.contactSection}>
          <div className={styles.contactContainer}>
            <h2 className={styles.contactTitle}>
              Interesse an einem Webinar?
            </h2>
            <p className={styles.contactDescription}>
              Kontaktiere mich für weitere Informationen oder um dich für ein Webinar anzumelden.
            </p>
            <a
              href="mailto:info@moritz-waechter.de"
              className={styles.contactButton}
            >
              Kontakt aufnehmen
              <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// WebinarLeftRightSection Component
function WebinarLeftRightSection({ items }: { items: any[] }) {
  return (
    <div className={styles.webinarsSection}>
      <div className={styles.webinarsContainer}>
        {items.map((item, index) => (
          <div key={index} className={index % 2 === 1 ? styles.webinarItemReverse : styles.webinarItem}>
            
            {/* Icon Side */}
            <div className={styles.iconContainer}>
              <div className={styles.iconWrapper}>
                {item.icon}
              </div>
            </div>

            {/* Content Side */}
            <div className={styles.contentContainer}>
              <h3 className={styles.webinarTitle}>
                {item.title}
              </h3>
              
              <div className={styles.badgeContainer}>
                <span className={styles.badge}>
                  {item.level}
                </span>
                <span className={styles.badge}>
                  {item.duration}
                </span>
                <span className={styles.badge}>
                  {item.additionalMetadata}
                </span>
              </div>
              
              <p className={styles.webinarDescription}>
                {item.description}
              </p>
              
              <Link
                to={item.buttonHref}
                className={styles.button}
              >
                {item.buttonText}
                <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}