import { h } from 'preact';

import DropdownSelect from '../components/DropdownSelect';
import NumberInput from '../components/NumberInput';
import Button from '../components/Button';
import TextBox from '../components/TextBox';
import style from '../components/style.css'

export default function Main() {
  return (
    <main>
      <div className={style.upper}>
        <DropdownSelect
          labelName="shape"
          labelText="Shape:"
          options={['Circle', 'Regular Polygon']}
        />
        <DropdownSelect
          disabled
          labelName="sides"
          labelText="Number of sides:"
          options={['3', '4', '5', '6', '7', '8', '9', '10']}
        />
        <DropdownSelect
          labelName="tile"
          labelText="Tile:"
          options={['Stone Path', 'Concrete', 'Refined Concrete', 'Hazard Concrete (L)', 'Hazard Concrete (R)', 'Hazard Refined Concrete (L)', 'Hazard Refined Concrete (R)']}
        />
        <NumberInput
          id="radius"
          label="Radius:"
          defaultValue={20}
        />
      </div>
      <div className={style.lower}>
        <Button
          text="Generate Blueprint"
          disabled={false}
        />
        <Button
          text="Copy"
          disabled={true}
        />
      </div>
      <TextBox
        placeholder="Blueprint string"
        text=""
      />
    </main> 
  );
}