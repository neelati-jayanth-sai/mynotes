import React from 'react'
import NoteContext from './NoteContext'
const NoteState = (props) => {
    const notes=[
      {
        "_id": "64ff0cbb43efad6b8aaf1948",
        "User": "64facd5896006b46df64d999",
        "title": "My title",
        "description": "it is demo to test",
        "tag": "personal",
        "date": "2023-09-11T12:48:59.288Z",
        "__v": 0
      },
      {
        "_id": "64ff187043efad6b8aaf194a",
        "User": "64facd5896006b46df64d999",
        "title": "My title",
        "description": "it is demo to test",
        "tag": "personal",
        "date": "2023-09-11T13:38:56.126Z",
        "__v": 0
      },
      {
        "_id": "64ff187043efad6b8aaf194c",
        "User": "64facd5896006b46df64d999",
        "title": "My title",
        "description": "it is demo to test",
        "tag": "personal",
        "date": "2023-09-11T13:38:56.525Z",
        "__v": 0
      },
      {
        "_id": "64ff187143efad6b8aaf1950",
        "User": "64facd5896006b46df64d999",
        "title": "My title",
        "description": "it is demo to test",
        "tag": "personal",
        "date": "2023-09-11T13:38:57.246Z",
        "__v": 0
      },
      {
        "_id": "64ff187143efad6b8aaf1952",
        "User": "64facd5896006b46df64d999",
        "title": "My title",
        "description": "it is demo to test",
        "tag": "personal",
        "date": "2023-09-11T13:38:57.560Z",
        "__v": 0
      },
      {
        "_id": "650209adbbab15c1b231a84a",
        "User": "64facd5896006b46df64d999",
        "title": "My title to",
        "description": "it isdsga demo to test",
        "tag": "personal",
        "date": "2023-09-13T19:12:45.851Z",
        "__v": 0
      }
      
    ]
    const [Notes, SetNotes] = React.useState(notes)

    const AddNote=(title,description,tag)=>{
      console.log("ADD new note")
      const Note={
        "_id": "650209adbbab15gasdg1b231a84",
        "User": "64facd5896006b46df64d999",
        "title": title,
        "description":description ,
        "tag": tag,
        "date": "2023-09-13T19:12:45.851Z",
        "__v": 0
      }
      SetNotes(Notes.concat(Note))

    }
    const DeleteNote=()=>{
      
    }
    const EditNote=()=>{
      
    }
    
  return (
        <NoteContext.Provider value={{Notes,SetNotes,AddNote,DeleteNote,EditNote}}>
            {props.children}
        </NoteContext.Provider>
  )
}

export default NoteState