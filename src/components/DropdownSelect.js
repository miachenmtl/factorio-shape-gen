import { h } from 'preact';

import style from './style.css';

export default function DropdownSelect({
  labelName,
  labelText,
  options,
  values,
  selectedValue,
  disabled,
  callback
}) {
  return (
    <div className={style.element}>
      <label htmlFor={`${labelName}-select`} className={disabled && style.disabled}>
        {labelText}
      </label>
      <select name={labelName} id={`${labelName}-select`} disabled={disabled} onChange={callback} value={selectedValue}>
        {options.map(
          (option, i) => <option value={values[i]} key={i}>
              {option}
            </option>
        )}
      </select>
    </div>
  );
}