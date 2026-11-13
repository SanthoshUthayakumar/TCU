/* A row of panels with irregular gutters. pattern: 'a' (wide + narrow), 'b' (narrow + wide), 'c' (even). */
export default function PanelRow({ pattern = 'c', className = '', children }) {
  return <div className={`panel-row panel-row--${pattern} ${className}`.trim()}>{children}</div>;
}
