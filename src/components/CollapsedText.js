import { Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import style from './style.css';

// See https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html
// https://dev.to/stereobooster/accessible-react-accordion-component-4p99

export default function CollapsedText({ label, text }) {
  const [expanded, setExpanded] = useState(false);
  const idPrefix = label.toLowerCase(); // TODO: remove whitespace, or truncate after first word
  const expanderId = `${idPrefix}-expander`;
  const textId = `${idPrefix}-text`;

  const className = `${style.expander} ${expanded ? style.expanded : ''}`;
  const pStyle = {
    opacity: expanded ? 1 : 0,
    transition: 'opacity 0.3s ease-in'
  };

  return (
    <>
      <div
        id={expanderId}
        className={className}
        role="button"
        aria-expanded={expanded}
        aria-controls={textId}
        onClick={() => { setExpanded(!expanded); }}
      >
        {label}
      </div>
      <p
        id={textId}
        aria-labelledby="about-expander"
        foo="bar"
        style={pStyle}
      >
        {text}
      </p>
    </>
  );
}