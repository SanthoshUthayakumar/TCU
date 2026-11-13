import { useState } from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import SplitText from '../comic/SplitText';
import SpeechBubble from '../comic/SpeechBubble';
import Button from '../ui/Button';
import { DirectButtons } from './SocialLinks';
import { CATEGORIES } from '../../data/projects';
import { mail, phone, whatsapp } from '../../utils/links';
import site from '../../data/site';

const EMPTY = { name: '', email: '', type: '', message: '' };

function Field({ id, label, error, filled, children }) {
  return (
    <div className={`field ${filled ? 'is-filled' : ''} ${error ? 'has-error' : ''}`}>
      {children}
      <label className="field__label" htmlFor={id}>{label}</label>
      {error && <p className="field__error" id={`${id}-err`} role="alert">{error}</p>}
    </div>
  );
}

export default function ContactSection({ compact = false }) {
  const [v, setV] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });

  const wa = Boolean(whatsapp());
  const em = Boolean(mail());
  const tel = phone();
  const done = [v.name, v.email, v.type, v.message].filter(Boolean).length;

  const brief = () => {
    const lines = [site.whatsappMessage, '', `Name: ${v.name.trim()}`];
    if (v.type) lines.push(`Project type: ${v.type}`);
    if (v.email) lines.push(`Email: ${v.email.trim()}`);
    lines.push('', 'Details:', v.message.trim());
    return lines.join('\n');
  };

  const validate = () => {
    const e = {};
    if (!v.name.trim()) e.name = 'Add your name.';
    if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Check the email address.';
    if (!v.message.trim()) e.message = 'Tell us a little about the project.';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const sendWhatsApp = () => {
    if (!validate()) return;
    window.open(whatsapp(brief()), '_blank', 'noopener,noreferrer');
    setStatus('Opening WhatsApp. Press send there.');
  };
  const sendEmail = () => {
    if (!validate()) return;
    window.location.href = mail(`Project brief from ${v.name}`, brief());
    setStatus('Opening your email app. Press send there.');
  };

  return (
    <section className={`contact ${compact ? 'contact--compact' : ''}`} data-pg aria-label="Contact">
      <p className="contact__kicker">HAVE A STORY TO TELL?</p>
      <SplitText text="LET'S CREATE SOMETHING CINEMATIC." className="contact__title" />
      <DirectButtons className="contact__direct" />
      {tel && <p className="contact__tel"><a href={tel}>Call {site.phone}</a></p>}

      <div className="contact__formwrap">
        <SpeechBubble tipId="contact" tail="bl" className="contact__tip">Fill in the brief. Nothing is sent until you press send in WhatsApp or your email app.</SpeechBubble>
        <div className="pages" aria-label={`Brief progress: ${done} of 4 fields filled`}>
          {[0, 1, 2, 3].map((n) => <span key={n} className={`pages__sheet ${n < done ? 'is-done' : ''}`} aria-hidden="true" />)}
          <span className="pages__text">Page {Math.min(done + 1, 4)} of 4</span>
        </div>
        <form className="form" noValidate onSubmit={(e) => e.preventDefault()}>
          <Field id="c-name" label="Your name" error={errors.name} filled={v.name}>
            <input id="c-name" className="field__input" value={v.name} onChange={set('name')} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'c-name-err' : undefined} placeholder=" " />
          </Field>
          <Field id="c-email" label="Email (optional)" error={errors.email} filled={v.email}>
            <input id="c-email" type="email" className="field__input" value={v.email} onChange={set('email')} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'c-email-err' : undefined} placeholder=" " />
          </Field>
          <Field id="c-type" label="Project type" filled={v.type}>
            <select id="c-type" className="field__input" value={v.type} onChange={set('type')}>
              <option value=""></option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              <option value="Something else">Something else</option>
            </select>
          </Field>
          <Field id="c-msg" label="About the project" error={errors.message} filled={v.message}>
            <textarea id="c-msg" rows={5} className="field__input" value={v.message} onChange={set('message')} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'c-msg-err' : undefined} placeholder=" " />
          </Field>
          <div className="form__actions">
            {wa && <Button icon={MessageCircle} size="lg" onClick={sendWhatsApp}>Send on WhatsApp</Button>}
            {em && <Button icon={Mail} size="lg" variant="ink" onClick={sendEmail}>Send by email</Button>}
          </div>
          {!wa && !em && <p className="form__note">Placeholder: set whatsappNumber or email in src/data/site.js to enable sending.</p>}
          <p className="form__status" role="status" aria-live="polite">{status}</p>
        </form>
      </div>
    </section>
  );
}
