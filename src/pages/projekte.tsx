import type {ReactNode} from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiExternalLink } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { Layout, Hero } from '@/components';
import styles from './projekte.module.css';

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

export default function ProjektePage(): ReactNode {
  return (
    <Layout
      title="Projekte"
      description="Entdecke meine KI- und Open-Source-Projekte, die politischen Alltag verständlicher und wirksamer machen">
      <div className={styles.container}>
        <Hero
          title="Projekte"
          markedWord="Projekte"
          subtitle="KI, Open Source und politische Kommunikation: Werkzeuge, die konkrete Arbeit leichter machen und demokratische Daten zugänglicher."
        />

        <Section className={styles.contentSection}>
          <div className={styles.projectStack}>
            <article className={styles.projectArticle}>
              <div className={styles.projectIntro}>
                <div>
                  <p className={styles.projectEyebrow}>KI-Tool für politische Kommunikation</p>
                  <h2>Grünerator</h2>
                </div>
                <div className={styles.projectLinks}>
                  <a
                    href="https://gruenerator.de/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconProjectLink}
                    aria-label="Grünerator-Website öffnen"
                    title="Website öffnen"
                  >
                    <HiExternalLink className={styles.linkIcon} aria-hidden="true" />
                  </a>
                  <a
                    href="https://github.com/netzbegruenung/Gruenerator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconProjectLink}
                    aria-label="Grünerator auf GitHub öffnen"
                    title="GitHub öffnen"
                  >
                    <FaGithub className={styles.linkIcon} aria-hidden="true" />
                  </a>
                </div>
              </div>

              <img
                src="/img/screenshot_gruenerator.png"
                alt="Screenshot des Grünerators"
                className={styles.sectionImage}
              />

              <div className={styles.contentText}>
                <p>
                  Der Grünerator ist ein speziell für Bündnis 90/Die Grünen entwickeltes KI-Tool. Er erstellt Texte wie Pressemitteilungen, Social-Media-Beiträge, Anträge für kommunale Parlamente und viele weitere Textsorten. Außerdem kann er Sharepics „grünerieren“ und beim Erstellen von Untertiteln helfen.
                </p>

                <h3>Denkt und spricht grün</h3>
                <p>
                  Der Grünerator wurde anhand grüner Sprache antrainiert. Wenn er einen Beitrag für Instagram oder eine Pressemitteilung erstellt, klingt dieser grün und fühlt sich grün an.
                </p>

                <h3>Einfache UI & modernste Technik</h3>
                <p>
                  Der Grünerator verwendet eine stark vereinfachte Benutzeroberfläche, die fast jede:r auf Anhieb versteht. Er wurde so designt, dass er von allen Ehrenamtlichen aller Altersklassen verwendet werden kann. Die UI orientiert sich stark an Seiten, die die Nutzer:innen kennen und lieben.
                </p>
                <p>
                  Er nutzt modernste KI-Modelle – im Standardmodus ein Modell des europäischen Anbieters Mistral AI und im Pro-Modus Claude Sonnet von Anthropic. Letzteres gilt als eines der besten Sprachmodelle für kreatives Schreiben und liefert Ergebnisse, die in der Regel die von ChatGPT überbieten.
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
                  Der Grünerator wurde auf Basis von Open-Source-Software entwickelt und liegt auf den Servern der Netzbegrünung. Die netzbegrünung ist ein Verein für grüne Netzkultur e. V., der sich seit 2006 für die Förderung der Demokratie im digitalen Raum und eine nachhaltige digitale Infrastruktur einsetzt. Mit über 500 Mitgliedern aus Deutschland und Österreich entwickelt die netzbegrünung innovative digitale Lösungen und vermittelt Fachwissen zu digitalpolitischen Inhalten.
                </p>
              </div>
            </article>

            <article className={styles.projectArticle}>
              <div className={styles.projectIntro}>
                <div>
                  <p className={styles.projectEyebrow}>Open Data, Analyse & Storytelling</p>
                  <h2>Bundestag Wrapped</h2>
                </div>
                <div className={styles.projectLinks}>
                  <a
                    href="https://bundestag-wrapped.de/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconProjectLink}
                    aria-label="Bundestag-Wrapped-Website öffnen"
                    title="Website öffnen"
                  >
                    <HiExternalLink className={styles.linkIcon} aria-hidden="true" />
                  </a>
                  <a
                    href="https://github.com/Movm/Bundestag_Wrapped"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.iconProjectLink}
                    aria-label="Bundestag Wrapped auf GitHub öffnen"
                    title="GitHub öffnen"
                  >
                    <FaGithub className={styles.linkIcon} aria-hidden="true" />
                  </a>
                </div>
              </div>

              <img
                src="/img/bundestag-wrapped-preview.png"
                alt="Vorschau von Bundestag Wrapped"
                className={styles.sectionImage}
              />

              <div className={styles.contentText}>
                <p>
                  Bundestag Wrapped macht aus offiziellen offenen Parlamentsdaten eine teilbare, animierte Jahresrückschau: Wer hat gesprochen, welche Themen dominierten die Debatten und welche Begriffe prägen einzelne Abgeordnete, Parteien oder parlamentarische Situationen?
                </p>

                <h3>Politische Daten als Erlebnis</h3>
                <p>
                  Das Projekt übersetzt Plenarreden, Themen, Tonalität und Rankings in Story-Karten, Sharepics, Statistiken und eine Suche. Dadurch werden Daten sichtbar, die sonst in Protokollen und Drucksachen verborgen bleiben.
                </p>

                <h3>Offen, nachvollziehbar, erweiterbar</h3>
                <p>
                  Bundestag Wrapped basiert auf der offiziellen DIP-Schnittstelle des Bundestags, analysiert Reden mit reproduzierbaren NLP-Verfahren und stellt die Ergebnisse als Open-Source-Projekt bereit. Zusätzlich enthält das Repo einen MCP-Server, über den KI-Assistenten parlamentarische Informationen abfragen können.
                </p>
              </div>
            </article>
          </div>
        </Section>
      </div>
    </Layout>
  );
}
