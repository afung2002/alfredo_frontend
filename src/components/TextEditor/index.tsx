import RswEditor from 'react-simple-wysiwyg';
import { useEffect, useState } from 'react';
import './style.css';
export default function TextEditor({ onEditorChange }: { onEditorChange: (html: string) => void }) {
  const [html, setHtml] = useState();

  function onChange(e: any) {
    setHtml(e.target.value);
  }
  useEffect(() => {
    onEditorChange(html);
  }, [html]);
  return (
    <>
    <RswEditor
        autoFocus
        containerProps={{ style: { resize: 'vertical' } }}
        placeholder="Write your message here..."
        value={html}
        onChange={onChange}
        title="ed1"
        className="reset-all"
      />
    </>
  );
}
