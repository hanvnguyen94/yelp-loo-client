import React from 'react'
const BathroomForm = ({ bathroom, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label>Name</label>
    <input
      required
      placeholder='Bathroom name'
      // This name should line up with the state we want to change
      name='name'
      value={bathroom.name}
      onChange={handleChange}
    />
    <label>Photo URL</label>
    <input
      required
      placeholder='Bathroom photo url'
      // This name should line up with the state we want to change
      name='photoUrl'
      value={bathroom.photoUrl}
      onChange={handleChange}
    />
    <label>Location</label>
    <input
      required
      placeholder='Bathroom location'
      // This name should line up with the state we want to change
      name='location'
      value={bathroom.location}
      onChange={handleChange}
    />
    <label>Description</label>
    <input
      required
      placeholder='Bathroom decription'
      // This name should line up with the state we want to change
      name='description'
      value={bathroom.description}
      onChange={handleChange}
    />
    <button type='submit'>Submit</button>
  </form>
)
export default BathroomForm
