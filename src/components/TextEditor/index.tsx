import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';

export default function TextEditor({ onEditorChange }: { onEditorChange: (value: string) => void }) {
  const [value, setValue] = useState('');
  useEffect(() => {
    onEditorChange(value);
  }, [value]);
  return <ReactQuill style={{ borderRadius: '8px',   }} 
  theme="snow" onChange={(value: string) => setValue(value)} />;
}
