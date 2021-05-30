import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import DropdownSelect from '../components/DropdownSelect';
import NumberInput from '../components/NumberInput';
import Button from '../components/Button';
import TextBox from '../components/TextBox';
import style from '../components/style.css';

import tileData from './tileData';
import calculateEverything from '../utils/calculateEverything';

function callbackify(fn) {
  return ({ target: { value }}) => fn(value);
}

async function copyToClipboard(string, setMessage) {
  let timeoutId = null;
  try {
    await navigator.clipboard.writeText(string);
    setMessage('Blueprint copied');
    timeoutId = window.setTimeout(() => setMessage(''), 3000);
    return () => window.clearTimeout(timeoutId);
  } catch (error) {
    window.alert(`Error writing to clipboard: ${error}`);
  }
}

const tileOptions = tileData.map(({ userText }) => userText);
const tileValues = tileData.map(({ value }) => value);

export default function Main() {
  const [shape, setShape] = useState('CIRCLE');
  const [numberOfSides, setNumberOfSides] = useState(8);
  const [radius, setRadius] = useState(20);
  const [tile, setTile] = useState('refined-concrete');
  const [bpString, setBpString] = useState('');
  const [genMessage, setGenMessage] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  useEffect(() => {
    if (bpString.length > 0) copyToClipboard(bpString, setGenMessage);
  }, [bpString]);

  return (
    <main>
      <div className={style.upper}>
        <DropdownSelect
          labelName="shape"
          labelText="Shape:"
          options={['Circle', 'Regular Polygon']}
          values={['CIRCLE', 'POLYGON']}
          selectedValue={shape}
          callback={callbackify(setShape)}
        />
        <DropdownSelect
          disabled={shape === 'CIRCLE'}
          labelName="sides"
          labelText="Number of sides:"
          options={['3', '4', '5', '6', '7', '8', '9', '10']}
          values={[3, 4, 5, 6, 7, 8, 9, 10]}
          selectedValue={numberOfSides}
          callback={callbackify(setNumberOfSides)}
        />
        <NumberInput
          id="radius"
          label="Radius:"
          value={radius}
          callback={callbackify(setRadius)}
        />
        <DropdownSelect
          labelName="tile"
          labelText="Tile:"
          options={tileOptions}
          values={tileValues}
          selectedValue={tile}
          callback={callbackify(setTile)}
        />

      </div>
      <div className={style.lower}>
        <Button
          text="Generate Blueprint"
          message={genMessage}
          disabled={false}
          callback={() => {
            setBpString(calculateEverything(shape, numberOfSides, radius, tile));
          }}
        />
        <Button
          text="Copy"
          message={copyMessage}
          disabled={bpString.length === 0}
          callback={() => { copyToClipboard(bpString, setCopyMessage); }}
        />
        <TextBox
          placeholder="Blueprint string"
          text={bpString}
        />
      </div>
    </main> 
  );
}