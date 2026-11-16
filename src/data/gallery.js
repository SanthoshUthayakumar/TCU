import projects from './projects';


const gallery = projects.flatMap((p) => {
  const seen = new Set();
  const all = [{ src: p.cover, ratio: '4/3', alt: `${p.title} cover`, caption: '' }, ...p.panels];
  return all
    .filter((x) => (seen.has(x.src) ? false : seen.add(x.src)))
    .map((x, i) => ({ id: `${p.slug}-${i}`, src: x.src, ratio: x.ratio || '4/3', alt: x.alt, caption: x.caption, title: p.title, slug: p.slug, category: p.category }));
});

export default gallery;
