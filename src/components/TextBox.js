import { h } from 'preact';

export default function TextBox({ placeholder, text }) {
  return (
    <textarea rows={10} cols={40} readonly placeholder={placeholder}>
      {text}
    </textarea>
  )
}