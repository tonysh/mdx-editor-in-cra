import React from 'react'
import { useEffect } from 'react'

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
  // replace dumb links into simple text
  // - "[http://abc.com](http://abc.com)" => "http://abc.com"
  // - "[abc.com](http://abc.com)" => "abc.com"
  // TODO: handle "[http://a\_b.com](http://a_b.com)"
  text = text.replace(/\[(.*?)\]\((?:http:\/\/)?\1\)/g, '$1')
  navigator.clipboard.writeText(text);
}

function App() {
  // construct a ref to the editor
  const ref = React.useRef<MDXEditorMethods>(null)
  const options: Options = { bullet: '-', listItemIndent: 'tab' }

  // set meta+shift+c shortcut to copy
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.metaKey && event.shiftKey && event.key === 'c') {
        event.preventDefault();
        write_clipboard(ref.current!.getMarkdown());
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <>
      <MDXEditor ref={ref} markdown='' autoFocus placeholder='Press meta+shift+c to copy' toMarkdownOptions={options} plugins={[
            listsPlugin(), headingsPlugin(), quotePlugin(), linkPlugin(), tablePlugin(), codeBlockPlugin(), diffSourcePlugin(),
            toolbarPlugin({
                  toolbarContents: () => (<> <DiffSourceToggleWrapper> <></> </DiffSourceToggleWrapper> </>)
            })
      ]} />
    </>
  );
}

export default App;

