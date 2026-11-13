import { Link } from 'react-router-dom';
import { extProps } from '../../utils/links';

export default function Button({ to, href, external = false, label, variant = 'primary', size = 'md', icon: Icon, className = '', children, ...rest }) {
  const cls = `btn btn--${variant} btn--${size} ${className}`.trim();
  const inner = (
    <>
      <span className="btn__label">{children}</span>
      {Icon && <Icon size={size === 'lg' ? 22 : 18} strokeWidth={2.5} aria-hidden="true" />}
      <span className="btn__pop" aria-hidden="true" />
    </>
  );
  if (to) return <Link className={cls} to={to} {...rest}>{inner}</Link>;
  if (href) {
    const ext = external ? extProps(label || (typeof children === 'string' ? children : 'Link')) : {};
    return <a className={cls} href={href} {...ext} {...rest}>{inner}</a>;
  }
  return <button type="button" className={cls} {...rest}>{inner}</button>;
}
