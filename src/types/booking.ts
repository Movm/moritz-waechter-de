export interface CalEmbedProps {
  calLink: string;
  namespace: string;
  calOrigin?: string;
  embedJsUrl?: string;
  layout?: 'month_view' | 'week_view' | 'column_view';
}
