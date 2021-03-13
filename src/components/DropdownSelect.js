import { h } from 'preact';

import style from './style.css';

// See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select

export default function DropdownSelect({ labelName, labelText, options, disabled, callback }) {
  return (
    <div className={style.element}>
      <label htmlFor={`${labelName}-select`}>
        {labelText}
      </label>
      <select name={labelName} id={`${labelName}-select`} disabled={disabled} onChange={callback}>
        {options.map(
          (option, i) => <option value={option} key={i}>
              {option}
            </option>
        )}
      </select>
    </div>
  );
}