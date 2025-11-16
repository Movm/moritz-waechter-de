import { useEffect, type ReactNode } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import type { CalEmbedProps } from '@/types/booking';

const DEFAULT_CAL_ORIGIN = 'https://kalender.moritz-waechter.de';
const DEFAULT_EMBED_JS_URL = 'https://kalender.moritz-waechter.de/embed/embed.js';

export function CalEmbed({
  calLink,
  namespace,
  calOrigin = DEFAULT_CAL_ORIGIN,
  embedJsUrl = DEFAULT_EMBED_JS_URL,
  layout = 'month_view',
}: CalEmbedProps): ReactNode {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({
        namespace,
        embedJsUrl,
      });
      cal('ui', {
        hideEventTypeDetails: false,
        layout,
      });
    })();
  }, [namespace, embedJsUrl, layout]);

  return (
    <Cal
      namespace={namespace}
      calLink={calLink}
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      config={{ layout }}
      calOrigin={calOrigin}
      embedJsUrl={embedJsUrl}
    />
  );
}
