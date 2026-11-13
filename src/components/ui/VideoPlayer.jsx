import { embedUrl } from '../../utils/media';

/* Film player: file video, YouTube/Vimeo embed, or a clearly marked placeholder. Never autoplays with sound. */
export default function VideoPlayer({ src, embed, poster, title }) {
  const e = embedUrl(embed);
  if (src) {
    return <video className="vplayer" src={src} poster={poster} controls playsInline preload="metadata" aria-label={title} />;
  }
  if (e) {
    return <iframe className="vplayer" src={e} title={title} loading="lazy" allow="fullscreen; picture-in-picture; encrypted-media" allowFullScreen />;
  }
  return (
    <div className="vplayer vplayer--empty">
      <p>Placeholder: no film attached. Set mainVideo or embed for this project in src/data/projects.js.</p>
    </div>
  );
}
