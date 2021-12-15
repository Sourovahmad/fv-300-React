import React, { useEffect, useState  } from 'react';
import menuIcon from '../../ImgAndIcons/menu.svg';
import SearchSection from './SearchSection';
import plusIcon from './../../ImgAndIcons/plus.svg';
import TinyMce from '../../TinyMce/TinyMce';

const Home = () => {


    const [inputData, setinputData] = useState('');
    const [allData, setallData] = useState([]);


    useEffect(() => {
        var theBar = document.querySelector('.toggle-bar');
        var pages = document.querySelector('.pages');
        var sidebar = document.querySelector('aside.sidebar');
        var tabBar = document.querySelector('aside.note-list');
        var htmlEditor = document.querySelector('aside.html-editor');
        
        
        theBar.addEventListener('click', function(){
            pages.classList.toggle('d-none');
            sidebar.classList.toggle('sidebar-width');
            tabBar.classList.toggle('tab-width');
            htmlEditor.classList.toggle('editor-width');
        });

    }, []);



    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("notes"));
        setallData(storedData)

       
    }, []);


    function dataSaveButton(){

        const storedData = JSON.parse(localStorage.getItem("notes"));

        if(inputData === ''){
            alert("please Add A Title")
        }else{

            if(storedData !== null){
                const newArray = [];
                const newId = storedData.length + 1;
                const newData = {
                    id:newId,
                    title:inputData,
                    data:inputData
                }
                newArray.push(newData);
                const doubleArray = [...storedData, ...newArray];
                localStorage.setItem('notes',JSON.stringify(doubleArray));
                setallData(doubleArray);
                setinputData('');
                document.getElementById('buttonModalClose').click();

            }else{
                const newArra = [];
               const newData = {
                   id:1,
                   title:inputData,
                   data:inputData
               }
               newArra.push(newData);
               localStorage.setItem('notes',JSON.stringify(newArra));
               console.log("data added successfully");
               setallData(newArra);
               setinputData('');
               document.getElementById('buttonModalClose').click();
            }
        }
    }

    return (
        <div>
            <section>
        <aside class="sidebar sidebar-width">
            <div class="toggle-bar">
                <div class="icon" style={{ color:"#fff" }}>
                    <img src={menuIcon} alt="" />
                </div>
            </div>
            <div class="pages d-none">
                <ul>
                    <li class="active-nav"><a href="">Personal Notes</a></li>
                    <li><a href="">Work</a></li>
                    <li><a href="">Misc.</a></li>
                </ul>
            </div>
        </aside>


        <aside class="note-list tab-width">

        <SearchSection></SearchSection>

            <div class="nav items nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">

        {
            allData !== null ?
            allData.map(note => {
                return <>
                        <div class="nav-link item" id="v-pills-tab1" data-bs-toggle="pill" data-bs-target={`#v-pills-content${note.id}`} type="button" role="tab" aria-controls="v-pills-content1" aria-selected="true">
                            <div class="overlay"></div>
                            <div class="title">
                                <h4>{note.title}</h4>
                            </div>

                            <div class="desc">
                                <p> {note.title} </p>
                            </div>
                    </div>

                </>
            }) :

            <h2 className='m-auto'> No Notes Here</h2>
        }

              </div>

              <button class="add-note" data-bs-toggle="modal" data-bs-target="#addModal" ><img src={plusIcon} alt="" /></button>
        </aside>

    
                    <aside class="html-editor editor-width">
                        <div class="tab-content" id="v-pills-tabContent">
                            {
                                allData !== null ?
                                
                                allData.map(note => {
                                    return <>
                                    <div class="tab-pane fade show active" id={`v-pills-content${note.id}`} role="tabpanel" aria-labelledby="v-pills-tab1">
                                         <TinyMce></TinyMce>

                                        <div className="buttonSection">
                                            <button className='btn btn-sm btn-success'>Update</button>
                                        </div>
                                        
                                    </div>
                                    </>

                                })

                                :
                                ''
                            }
                            </div>
                    </aside>
          
     
     



    </section>



        <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add Note</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" id='buttonModalClose' aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <label htmlFor="noteName">Note Title </label>
                <input type="text" className='form-control' id='noteName' value={inputData} onChange={(e)=> setinputData(e.target.value)}  />
            </div> 
            <div class="modal-footer">
                <button type="button" class="btn btn-success" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary"onClick={()=> dataSaveButton()} >Save</button>
            </div>
            </div>
        </div>
        </div>




        </div>
    );
};

export default Home;