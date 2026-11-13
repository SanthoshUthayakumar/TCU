export const pad = (n) => String(n).padStart(2, '0');
export const pg = (n, total) => `PG ${pad(n)} / ${pad(total)}`;
export const currentYear = () => new Date().getFullYear();
export const formatDate = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' });
};
