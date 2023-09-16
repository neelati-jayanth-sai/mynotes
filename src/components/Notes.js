import {React,useContext} from 'react'
import NoteItem from './NoteItem'
import NoteContext from '../context/notes/NoteContext'
import AddNote from './AddNote'
const Notes = () => {
  const Context=useContext(NoteContext)
  const {Notes}=Context
  return (
    <>
    <AddNote/>
    <div  className="row my-3 ">
      {Notes.map((Note)=>{
        return <NoteItem key={Note._id} Note={Note}/>
      })}
    </div>
    </>
  )
}

export default Notes