import React from 'react'
import Button from 'react-bootstrap/Button'

const BathroomForm = ({ bathroom, handleSubmit, handleChange }) => (
  <div className='row display-section'>
    <div className='col-6 offset-3'>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='form-label'>Nick Name</label>
          <input className='form-control'
            required
            placeholder="Give it a nickname"
            // This name should line up with the state we want to change
            name='name'
            value={bathroom.name}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Photo URL</label>
          <input className='form-control'
            required
            placeholder="Photo's URL"
            // This name should line up with the state we want to change
            name='photoUrl'
            value={bathroom.photoUrl}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Location</label>
          <input className='form-control'
            required
            placeholder="Where is it located?"
            // This name should line up with the state we want to change
            name='location'
            value={bathroom.location}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Comment</label>
          <textarea className='form-control'
            required
            placeholder="What do you think?"
            // This name should line up with the state we want to change
            name='description'
            value={bathroom.description}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <Button variant="outline-info" type='submit'>Submit</Button>
        </div>
      </form>
    </div>
  </div>
)
export default BathroomForm
