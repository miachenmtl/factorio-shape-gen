import { h } from 'preact';

import style from './style.css';

export default function NumberInput({ id, label, defaultValue, callback }) {
  return (
    <div className={style.element}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="number" onInput={callback} defaultValue={defaultValue} />
    </div>
  );
}