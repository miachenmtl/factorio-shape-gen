import { h } from 'preact';
import style from './style.css';

export default function ActionButton({ text, message, disabled, callback }) {
  return (
    <button
      disabled={disabled}
      onClick={callback}
      data-message={message}
      className={message?.length > 0 ? style.withMessage : ''}
    >
      {text}
    </button>
  );
}