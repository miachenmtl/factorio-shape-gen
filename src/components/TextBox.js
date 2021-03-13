import { h } from 'preact';

export default function TextBox({ placeholder, text }) {
  return (
    <textarea readonly placeholder={placeholder}>
      {text}
    </textarea>
  )
}