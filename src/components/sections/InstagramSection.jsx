import { useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import RiseText from '../motion/RiseText';
import TiltCard from '../motion/TiltCard';
import Button from '../ui/Button';
import { extProps, instagramPermalink, instagramProfile } from '../../utils/links';
import site from '../../data/site';


const normalize = (p) => {
  const o = typeof p === 'string' ? { url: p } : p || {};
  const link = instagramPermalink(o.url);
  if (!link) return null;
  return { link, image: o.image || '', caption: o.caption || '', reel: link.includes('/reel/') };
};

function Card({ post, index }) {
  const [failed, setFailed] = useState(false);
  
  const src = post.image || `${post.link}media/?size=l`;
  return (
    <TiltCard className="igwrap">
      <a className="igcard" href={post.link} data-cursor="view" {...extProps(post.caption || 'Open this Instagram post')}>
        <span className="igcard__media">
          {!failed ? (
            <img className="igcard__img" src={src} alt={post.caption || 'Instagram post thumbnail'} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={() => setFailed(true)} />
          ) : (
            <span className="igcard__missing">Thumbnail unavailable. Tap to open the post.</span>
          )}
          <span className="igcard__tag">{post.reel ? <><Play size={12} strokeWidth={2} aria-hidden="true" /> Reel</> : 'Post'}</span>
        </span>
        <span className="igcard__foot">
          {post.caption && <span className="igcard__caption">{post.caption}</span>}
          <span className="igcard__open">Open on Instagram <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" /></span>
        </span>
      </a>
    </TiltCard>
  );
}


export default function InstagramSection({ limit = 6 }) {
  const posts = site.instagramPosts.map(normalize).filter(Boolean).slice(0, limit);
  if (!posts.length) return null;
  const profile = instagramProfile();
  return (
    <section className="sec sec--surface igsec" id="instagram" aria-label="Instagram posts"><div className="wrap">
      <div className="igsec__head">
        <div><p className="eyebrow">Social</p><RiseText text="On Instagram" className="h2" /></div>
        {profile && <Button href={profile} external label="Follow on Instagram" icon={ArrowUpRight} size="sm" variant="ghost">Follow on Instagram</Button>}
      </div>
      <ul className="igsec__grid">
        {posts.map((p, i) => <li key={p.link}><Card post={p} index={i} /></li>)}
      </ul>
    </div></section>
  );
}