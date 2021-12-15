import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyMce = ({note_id,data}) => {

    const editorRef = useRef(null);
    const log = () => {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
      }
    };

    const [allData, setAllData] = useState([]);
    const [currentData, setcurrentData] = useState({});

    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem("notes"));
      setAllData(storedData);

      const currentData = allData.find(note => note.id === note_id);
      setcurrentData(currentData)

    }, []);

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
           height: 500,
           menubar: true,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
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