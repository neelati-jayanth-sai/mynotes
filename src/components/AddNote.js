import React from 'react'
import NoteContext from '../context/notes/NoteContext'
import { useState } from 'react'
const AddNote = () => {
    const Context = React.useContext(NoteContext)
    const { AddNote } = Context
    const [Note, setNote] = useState({ title: "", description: "", tag: "" })
    
    const HandleClick = (e) => {
        e.preventDefault()
        AddNote(Note.title,Note.description,Note.tag)
    }
    
    const onChange = (e) => {
        setNote({ ...Note, [e.target.name]: e.target.value })
    }
    
    return (
        <div className='noteForm my-3'>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" placeholder="title" onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" name="description" rows="3" placeholder='description' onChange={onChange}></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="tag" name='tag' placeholder="tag" onChange={onChange} />
            </div>
            <button type="button" className="btn btn-primary my-3" onClick={HandleClick}>Submit</button>
        </div>
    )
}

export default AddNote