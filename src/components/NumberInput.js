import { h } from 'preact';

import style from './style.css';

export default function NumberInput({ id, label, value, callback }) {
  return (
    <div className={style.element}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="number" onInput={callback} value={value} />
    </div>
  );
}