import type { ReactNode } from 'react';
import { CalEmbed } from './CalEmbed';
import styles from './webinarBooking.module.css';

export function WebinarCalendars(): ReactNode {
  return (
    <div className={styles.bookingSection}>
      <div className={styles.bookingContainer}>
        <h2 className={styles.bookingTitle}>Webinar buchen</h2>
        <p className={styles.bookingDescription}>
          Wähle einen Termin und das gewünschte Webinar aus.
        </p>

        {/* Calendar Embed */}
        <div className={styles.calendarContainer}>
          <CalEmbed
            calLink="moritzwae/webinar"
            namespace="webinar"
            layout="month_view"
          />
        </div>
      </div>
    </div>
  );
}
