import React, { useEffect, useState  } from 'react';
import menuIcon from '../../ImgAndIcons/menu.svg';
import plusIcon from './../../ImgAndIcons/plus.svg';
import TinyMce from '../../TinyMce/TinyMce';
import glassIcon from '../../ImgAndIcons/magnifying-glass.png';

const Home = () => {
    const [inputData, setinputData] = useState('');
    const [directoryData, setdirectoryData] = useState('');
    const [allData, setallData] = useState([]);
    const [allStoredData, setallStoredData] = useState([]);
    const [allDirectories, setallDirectories] = useState([]);
    const [currentSelectedNote, setcurrentSelectedNote] = useState({});
    const [queryValue ,setQueryvalaue] = useState("")


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
        const allDirectories = JSON.parse(localStorage.getItem("directories"));
        setallDirectories(allDirectories);
        setallData(storedData);
        setallStoredData(storedData)
       
    }, []);


    function dataSaveButton(){

        document.addEventListener("DOMContentLoaded", function(event) { 
          const box =  document.getElementsByClassName('tox-statusbar')
            console.log(box);
          });

        if(inputData === ''){
            alert("please Add A Title")
        }else{

            const storedData = JSON.parse(localStorage.getItem("notes"));

            if(storedData !== null){
                const newArray = [];
                const newId = storedData.length + 1;

                const directoryId = parseInt(document.getElementById('directorySelector').value);
                if(directoryId === ''){
                    alert("Create A Directory First");
                }else{
                    const newData = {
                        id:newId,
                        title:inputData,
                        data:inputData,
                        directoryId:directoryId
                    }
                    newArray.push(newData);
                    const doubleArray = [...storedData, ...newArray];
                    localStorage.setItem('notes',JSON.stringify(doubleArray));
                    setallData(doubleArray);
                    setinputData('');
                    document.getElementById('buttonModalClose').click();
                }


            }else{
                const newArra = [];
                const directoryId =parseInt(document.getElementById('directorySelector').value);
                if(directoryId === ''){
                    alert("Create A Directory First");
                }else{
                    const newData = {
                        id:1,
                        title:inputData,
                        data:inputData,
                        directoryId:directoryId
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
    }


    function DirectorySaveButton(){

        if(directoryData === ''){
            alert("Please Add Directory Title")
        }else {
            const storedDirectories = JSON.parse(localStorage.getItem("directories"));

            if(storedDirectories !== null){
                const newArray = [];
                const newId = storedDirectories.length + 1;
                const newData = {
                    id:newId,
                    title:directoryData,
                }

                newArray.push(newData);
                const doubleArray = [...storedDirectories, ...newArray];
                localStorage.setItem('directories',JSON.stringify(doubleArray));
                setallDirectories(doubleArray);
                setdirectoryData('');
                document.getElementById('directoryModalClose').click();

            }else{

                const newArra = [];
                const newData = {
                    id:1,
                    title:directoryData,
                }
                newArra.push(newData);
                localStorage.setItem('directories',JSON.stringify(newArra));
                setallDirectories(newArra);
                setdirectoryData('');
                document.getElementById('directoryModalClose').click();
            }
        }
    }


    function directoryChanger(directory_id){
        const filterdNotes = allStoredData.filter(note => note.directoryId === directory_id);
        // document.getElementById(`li-${directory_id}`).classList.add('active-nav');
        setallData(filterdNotes);

    }

    function noteChangeHadler(note_id){
        const note = allStoredData.find(note => note.id === note_id);
        setcurrentSelectedNote(note);
    }

    // function searchHandle(value){

    //     allStoredData.filter(note => {
    //         if (value === "") {
    //           setallData(allStoredData);
    //         } else if (note.title.toLowerCase().includes(value.toLowerCase())) {
    //             console.log(note);
    //         }
    //       });
    // }



    

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
                    {
                      allDirectories !== null ?  allDirectories.map(d => <li id={`li-${d.id}`} onClick={()=> directoryChanger(d.id)}>{d.title} </li>  ) : ''
                    }
                    <li><div className="plusIcon">
                    <span style={{ fontSize:'55px', color:'#fff', cursor:'pointer' }} data-bs-toggle="modal" data-bs-target="#addDirectory"> + </span>
                </div> </li>
                </ul>
            </div>
        </aside>


        <aside class="note-list tab-width">

                <div class="top-part">
                    <div class="search-box">
                    <div class="icon">
                        <img src={glassIcon} alt="" />
                    </div>
                    <div class="input">
                        <input type="text" onChange={(e)=>setQueryvalaue(e.target.value)} placeholder="Search Notes" />
                    </div>
                    </div>
                </div>

            <div class="nav items nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">

        {
            allData !== null ?
            allData.filter(note => {
                if (queryValue === '') {
                  return note;
                } else if (note.title.toLowerCase().includes(queryValue.toLowerCase())) {
                  return note;
                }
              }).map(note => {
                return <>
                        <div class="nav-link item"  onClick={()=>noteChangeHadler(note.id)} id={`v-pills-tab${note.id}`} data-bs-toggle="pill"  type="button" role="tab"  aria-selected="true">
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

              <button class="add-note" onClick={()=> allDirectories !== null ?  allDirectories.length <=0 ? alert("Add Directory First") : '' : ''} data-bs-toggle="modal" data-bs-target="#addModal" ><img src={plusIcon} alt="" /></button>
        </aside>

    
                    <aside class="html-editor editor-width">
                        <div class="tab-content" id="v-pills-tabContent">
                            
                            <div class="tab-pane fade show active" id="v-pills-content-all" role="tabpanel" aria-labelledby="v-pills-tab-1">
                                   {
                                       currentSelectedNote !== '' ? 
                                       <TinyMce note_id={currentSelectedNote.id} data={currentSelectedNote.data}/>
                                       : ""
                                   }
                                 </div>
                            </div>
                    </aside>
          
     
     



    </section>



    <div class="modal fade" id="addModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add Note</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" id='buttonModalClose' aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div className="mb-3">
                    <label htmlFor="noteName">Note Title </label>
                    <input type="text" className='form-control' id='noteName' value={inputData} onChange={(e)=> setinputData(e.target.value)}  />
                </div>

                <div className="mb-3">
                     <label htmlFor="directory">Chose Directory</label>
                     <select id="directorySelector" className='form-control'>
                         {
                              allDirectories !== null ? allDirectories.map(d => <option value={d.id}>{d.title}</option>) : ''
                         }
                     </select>
                </div>

            </div> 

            <div class="modal-footer">
                <button type="button" class="btn btn-success" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary"onClick={()=> dataSaveButton()} >Save</button>
            </div>
            </div>
        </div>
    </div>



    {/* Directory modal  */}
    <div class="modal fade" id="addDirectory" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add Directory</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" id='directoryModalClose' aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <label htmlFor="directoryName">Directory Title </label>
                <input type="text" className='form-control' id='directoryName' value={directoryData} onChange={(e)=> setdirectoryData(e.target.value)}  />
            </div> 
            <div class="modal-footer">
                <button type="button" class="btn btn-success" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onClick={()=> DirectorySaveButton()} >Save</button>
            </div>
            </div>
        </div>
    </div>




        </div>
    );
};

export default Home;