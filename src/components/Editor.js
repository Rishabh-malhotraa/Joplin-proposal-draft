/* eslint-disable no-useless-constructor */
import React from 'react';
import './Editor.scss'
import $ from 'jquery';
import showdown from 'showdown';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';


class Editor extends React.Component {
  constructor(props) {
    super(props);
   }

  componentDidMount() {
    const converter = new showdown.Converter();
    const turndownService = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-' });
    turndownService.use(gfm);

    let selectedBlock;
    $('#Joplin-mockup').on('keydown keyup mousedown mouseup', (e) => {
      let oldSelectedBlock;
      if(selectedBlock) {
        oldSelectedBlock = selectedBlock;
      }
      selectedBlock = $(window.getSelection().anchorNode).closest('#Joplin-mockup > *');
      
      // make sure selected block is in edit mode
      console.log(selectedBlock.data('editMode'));
      if(selectedBlock && selectedBlock[0] && !selectedBlock.data('editMode')) {
        selectedBlock.html(turndownService.turndown(selectedBlock[0].outerHTML) || '<br />');
        selectedBlock.data('editMode', true);
        selectedBlock.css('white-space', 'pre');
      }

      // reset the old node upon exit
      if(oldSelectedBlock && oldSelectedBlock[0] && selectedBlock && selectedBlock[0] && !oldSelectedBlock[0].isSameNode(selectedBlock[0])) {
        oldSelectedBlock.replaceWith(converter.makeHtml(oldSelectedBlock[0].innerHTML).replace(/\\/g, ''));
      }

    });
  }

  render() {
    return <div id="Joplin-mockup" className="Joplin-mockup content" contentEditable="true">
        <p><b>Joplin-Inline Markdown editor DRAFT 1  </b></p> 
          <p> <i>This was made in 2 days and does not represent the what the final project would be</i></p>
            <p>The content would not move from it place in the final project</p>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <p>This is <strong>Bold Text</strong> </p>
            <p>This is <em>emphasis Text</em></p>
            <p>This is <code>code</code></p>
            <p><strike>strike</strike></p>
            <p><blockquote>
            Blockquote
            </blockquote></p>
            <ul>
            <li>list items</li>
            <li>list items</li>
            </ul>
            <ol>
            <li>number list</li>
            <li>numbered list</li>
            </ol>

            <p><strong>Lorem ipsum</strong> <em>dolor sit amet,</em> consectetur adipiscing <strong><em>elit, sed do eiusmod</em></strong> tempor incididunt 
            </p>
            <br/>

            </div>
  }
}

export default Editor;



