import React, {  useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyMce = ({note_id,data}) => {

    const editorRef = useRef(null);
    const [allData, setAllData] = useState([]);


    function handleEditorChange(e){

      const editorvalue = e.target.getContent();
      const newArray = [];
      for (let index = 0; index < allData.length; index++) {

        if(allData[index].id === note_id){
          allData[index].data = editorvalue
        }

        const element = allData[index];
        newArray.push(element);
        setAllData(newArray);
        localStorage.setItem('notes',JSON.stringify(newArray));

        console.log(allData);
      }

    }



    return (
      <div>
        <Editor
        apiKey="67cbhn71y33yyvpc0uc6dlfh6vnkxlitml49fb6eifdjqt4y"
         onInit={(evt, editor) => editorRef.current = editor}
         initialValue={data}
         init={{
           height: '100vh',
           menubar: true,
            removed_menuitems: 'newdocument',
            forced_root_block : 'v-pills-content-all',

           plugins: [
             'autolink lists link image charmap print',
             'searchreplace visualblocks code fullscreen',
             'media  paste code  '
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}

         onChange={(e)=>handleEditorChange(e)}
       />

     
        </div>
    );
};

export default TinyMce;