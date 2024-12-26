import React from 'react'

import { MDXEditor, MDXEditorMethods } from '@mdxeditor/editor'
import { listsPlugin, headingsPlugin, quotePlugin, linkPlugin, tablePlugin, toolbarPlugin, codeBlockPlugin, diffSourcePlugin, DiffSourceToggleWrapper, BoldItalicUnderlineToggles, UndoRedo } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

function write_clipboard(text: string) {
  navigator.clipboard.writeText(text);
}

function App() {
  // construct a ref to the editor
  const ref = React.useRef<MDXEditorMethods>(null)
  return (
    <>
      <button onClick={() => write_clipboard(ref.current!.getMarkdown())}>Copy</button>
      <MDXEditor ref={ref} markdown='' autoFocus placeholder='Write here' plugins={[
            listsPlugin(), headingsPlugin(), quotePlugin(), linkPlugin(), tablePlugin(), codeBlockPlugin(), diffSourcePlugin(),
            toolbarPlugin({
                  toolbarContents: () => (<> <DiffSourceToggleWrapper> <></> </DiffSourceToggleWrapper> </>)
            })
      ]} />
    </>
  );
}

export default App;

