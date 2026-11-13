import { Volume2, VolumeX } from 'lucide-react';
import useLocalStorage from '../../hooks/useLocalStorage';

/* Sound effects are off by default. TapSfx reads the same key. */
export default function SoundToggle() {
  const [on, setOn] = useLocalStorage('tcu-sound', false);
  return (
    <button type="button" className="soundtoggle" aria-pressed={on} onClick={() => setOn(!on)} aria-label={on ? 'Sound effects on. Turn off' : 'Sound effects off. Turn on'}>
      {on ? <Volume2 size={20} aria-hidden="true" /> : <VolumeX size={20} aria-hidden="true" />}
    </button>
  );
}
