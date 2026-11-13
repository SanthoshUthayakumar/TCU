export default function CaptionBox({ as: Tag = 'div', tone = 'yellow', className = '', children, ...rest }) {
  return (
    <Tag className={`caption caption--${tone} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
