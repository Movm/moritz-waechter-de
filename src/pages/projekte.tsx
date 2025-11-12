import type {ReactNode} from 'react';
import { Layout } from '@/components';
import styles from './projekte.module.css';

export default function ProjektePage(): ReactNode {
  return (
    <Layout
      title="Grünerator"
      description="Entdecke unsere KI-Projekte, die echten Mehrwert schaffen">
      <div className={styles.container}>
        {/* Unified Gradient Background */}
        <div className={styles.backgroundGradient} />

        {/* Projects Section */}
        <div className={styles.projectsSection}>
          <div className={styles.projectsContainer}>
            {/* Grünerator Project */}
            <div className={styles.projectCard}>
              <div className={styles.projectHeader}>
                <div className={styles.projectIconContainer}>
                  <svg className={styles.projectIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              
              <h2 className={styles.projectTitle}>
                Grünerator - die Grüne KI
              </h2>

              <div className={styles.projectLongDescription}>
                <p>
                  Der Grünerator ist ein speziell für Bündnis 90/Die Grünen entwickeltes KI-Tool. Er erstellt Texte wie Pressemitteilungen, Social-Media-Beiträge, Anträge für kommunale Parlamente und viele weitere. Außerdem kann er Sharepics "grünerieren" und beim Erstellen von Untertiteln helfen.
                </p>
              </div>

              <div className={styles.projectScreenshot}>
                <img
                  src="/img/screenshot_gruenerator.png"
                  alt="Grünerator Screenshot"
                  className={styles.screenshotImage}
                />
              </div>

              <div className={styles.projectFeatures}>
                <h3>Denkt und spricht Grün</h3>
                <p>
                  Der Grünerator wurde anhand grüner Sprache antrainiert. Wenn er einen Beitrag für Instagram oder eine Pressemitteilung erstellt, klingt dieser grün und fühlt sich grün an.
                </p>

                <h3>Einfache UI & modernste Technik</h3>
                <p>
                  Der Grünerator verwendet eine stark vereinfachte Benutzeroberfläche, die fast jede:r auf Anhieb versteht. Er wurde so designt, dass er von allen Ehrenamtlichen aller Altersklassen verwendet werden kann. Die UI orientiert sich stark an Seiten, die die Nutzer:innen kennen und lieben.
                </p>
                <p>
                  Er nutzt modernste KI-Modelle – im Standard-Modus das europäische Mistral AI und im Pro-Modus Claude Sonnet von Anthropic, das als eines der besten Sprachmodelle für kreatives Schreiben gilt und Ergebnisse liefert, die in der Regel die von ChatGPT überbieten.
                </p>

                <h3>Datenschutz per Design</h3>
                <p>
                  Anders als andere Seiten trackt der Grünerator nicht und kann völlig anonym verwendet werden. Er verwendet ausschließlich EU-Server zur Verarbeitung der KI-Eingaben und bietet mit dem Privacy-Mode die Möglichkeit, deutsche Server zu verwenden. Der Grünerator setzt dabei bewusst auf europäische Technologieanbieter wie Mistral AI (Frankreich) und Black Forest Labs (Deutschland), um die digitale Souveränität Europas zu stärken.
                </p>

                <h3>Plus für Barrierefreiheit</h3>
                <p>
                  Der Grünerator hilft beim Erstellen von Untertiteln für Instagram Reels & TikToks und kreiert Alt-Texte für Sharepics. Beides ist essenziell für mehr Barrierefreiheit im Netz, aber auch viel Aufwand, den viele Ehrenamtliche kaum schaffen. Mit dem Reel-Grünerator und dem Grünerator für Alt-Texte nimmt der Grünerator diese Aufgaben fast vollständig ab.
                </p>

                <h3>Mit Herz für Open-Source</h3>
                <p>
                  Der Grünerator wurde auf Basis von Open-Source-Software entwickelt und liegt auf den Servern der Netzbegrünung. Die netzbegrünung ist ein Verein für grüne Netzkultur e.V., der sich seit 2006 für die Förderung der Demokratie im digitalen Raum und eine nachhaltige digitale Infrastruktur einsetzt. Mit über 500 Mitgliedern aus Deutschland und Österreich entwickelt die netzbegrünung innovative digitale Lösungen und vermittelt Fachwissen zu digitalpolitischen Inhalten.
                </p>
              </div>

              <div className={styles.projectLinks}>
                <a 
                  href="https://gruenerator.de/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.projectLink}
                >
                  Projekt besuchen
                  <svg className={styles.linkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              
              <div className={styles.divider} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}