import { h } from 'preact';

export default function ActionButton({ text, disabled, callback }) {
  return (
    <button disabled={disabled} onClick={callback}>{text}</button>
  );
}