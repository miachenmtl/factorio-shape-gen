import { h } from 'preact';
import CollapsedText from '../components/CollapsedText';

export default function Footer() {
  const label = "About";
  const text = "A tool for generating blueprints of simple geometric shapes for the game Factorio.";

  return (
    <footer>
      <hr />
      <ul>
        <li>
          <a href="https://github.com/miachenmtl/factorio-shape-gen">
            Github
          </a>
        </li>
        <li>
          <CollapsedText label={label} text={text} />
        </li>
      </ul>

    </footer>
  );
}