import React from 'react'

import { MDXEditor, MDXEditorMethods } from '@mdxeditor/editor'
import { listsPlugin, headingsPlugin, quotePlugin, linkPlugin, tablePlugin, toolbarPlugin, codeBlockPlugin, diffSourcePlugin, DiffSourceToggleWrapper, BoldItalicUnderlineToggles, UndoRedo } from '@mdxeditor/editor'
import { Options } from 'mdast-util-to-markdown'
import '@mdxeditor/editor/style.css'

function write_clipboard(text: string) {
  // replace list bullets like "[space*4N]-[space*M]" into "[\t*N]- "
  text = text.replace(/^( *)(-\s+)/gm, (_, spaces) => '\t'.repeat(Math.floor(spaces.length / 4)) + '- ')
  // replace unecessary underlines for links "[<u>...</u>](http://...)" => "[...](http://...)"
  text = text.replace(/\[<u>/g, '[')
  text = text.replace(/<\/u>\]/g, ']')
  navigator.clipboard.writeText(text);
}

function App() {
  // construct a ref to the editor
  const ref = React.useRef<MDXEditorMethods>(null)
  const options: Options = { bullet: '-', listItemIndent: 'tab' }
  return (
    <>
      <button onClick={() => write_clipboard(ref.current!.getMarkdown())}>Copy</button>
      <MDXEditor ref={ref} markdown='' autoFocus placeholder='Write here' toMarkdownOptions={options} plugins={[
            listsPlugin(), headingsPlugin(), quotePlugin(), linkPlugin(), tablePlugin(), codeBlockPlugin(), diffSourcePlugin(),
            toolbarPlugin({
                  toolbarContents: () => (<> <DiffSourceToggleWrapper> <></> </DiffSourceToggleWrapper> </>)
            })
      ]} />
    </>
  );
}

export default App;

