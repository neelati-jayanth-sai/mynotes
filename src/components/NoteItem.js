import React from 'react'

const NoteItem = (props) => {
  const { Note } = props
  return (
    <div className='col-md-3'>
      <div className="card my-3">
          <div className="card-body">
            <div className="d-flex align-items-center">
          <h5 className="card-title">{Note.title}</h5>
          <i className="fa-solid fa-trash mx-2"></i>
          <i className="fa-regular fa-pen-to-square"></i>
          </div>
          <p className="card-text">{Note.description}</p>
        </div>
      </div>
    </div>
  )
}

export default NoteItem