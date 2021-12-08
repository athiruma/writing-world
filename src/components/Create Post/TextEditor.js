import React from 'react'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { config } from './editor.config'
const TextEditor = ({setBody}) => {

     ClassicEditor.defaultConfig = config;

     return(
        <div>
            <CKEditor
                editor={ClassicEditor}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    
                        setBody(data)

                }}

            />
        </div>
    )
}

export default TextEditor;
