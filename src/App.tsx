import React from 'react'

import { MDXEditor, MDXEditorMethods } from '@mdxeditor/editor'
import { listsPlugin, headingsPlugin } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

function write_clipboard(text: string) {
  navigator.clipboard.writeText(text);
}

function App() {
  // construct a ref to the editor
  const ref = React.useRef<MDXEditorMethods>(null)
  return (
    <>
      <button onClick={() => ref.current?.setMarkdown('new markdown')}>Set new markdown</button>
      <button onClick={() => console.log(ref.current?.getMarkdown())}>Get markdown</button>
      <MDXEditor ref={ref} markdown='*hello world*' plugins={[headingsPlugin(), listsPlugin()]} onChange={write_clipboard} />
    </>
  );
}

export default App;
