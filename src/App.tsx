import React from 'react'

import { MDXEditor, MDXEditorMethods } from '@mdxeditor/editor'
import { listsPlugin, headingsPlugin, quotePlugin, linkPlugin, tablePlugin, toolbarPlugin, codeBlockPlugin } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

function write_clipboard(text: string) {
  navigator.clipboard.writeText(text);
}

async function load_clipboard() {
  return await navigator.clipboard.readText();
}

function App() {
  // construct a ref to the editor
  const ref = React.useRef<MDXEditorMethods>(null)
  return (
    <>
      <button onClick={() => load_clipboard().then((c) => { ref.current?.setMarkdown(c) })}>Load</button>
      <button onClick={() => write_clipboard(ref.current!.getMarkdown())}>Copy</button>
      <MDXEditor ref={ref} markdown='*hello world*' plugins={[
            listsPlugin(), headingsPlugin(), quotePlugin(), linkPlugin(), tablePlugin(), toolbarPlugin(), codeBlockPlugin()
      ]} />
    </>
  );
}

export default App;
