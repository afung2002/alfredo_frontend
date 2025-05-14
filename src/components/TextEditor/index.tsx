import RswEditor from 'react-simple-wysiwyg';
import { useState } from 'react';

export default function App() {
  const [html, setHtml] = useState();

  function onChange(e) {
    setHtml(e.target.value);
  }

  return (
    <>
      <RswEditor
        autoFocus
        containerProps={{ style: { resize: 'vertical' } }}
        placeholder="Write your message here..."
        value={html}
        onChange={onChange}
        title="ed1"
      />
    </>
  );
}