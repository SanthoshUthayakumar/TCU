/* Credits list. Empty credits render nothing. */
export default function CreditsSection({ credits = [], title = 'Credits', bare = false }) {
  if (!credits.length) return null;
  const list = (
    <dl className="credits__list">
      {credits.map((c, i) => (
        <div className="credits__row" key={`${c.role}-${i}`}>
          <dt>{c.role}</dt>
          <dd>{c.name}</dd>
        </div>
      ))}
    </dl>
  );
  if (bare) return <div className="credits credits--bare"><h3 className="credits__title">{title}</h3>{list}</div>;
  return (
    <section className="sec credits" aria-label={title}><div className="wrap">
      <h2 className="credits__title">{title}</h2>
      {list}
    </div></section>
  );
}
