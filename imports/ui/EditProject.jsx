import React, { useState } from 'react'
import { Meteor } from 'meteor/meteor'

const EditProject = ({ project, onClose }) => {
  const [projectName, setProjectName] = useState(project.projectName)

  const handleSubmit = (event) => {
    event.preventDefault()

    Meteor.call('projects.update', project._id, projectName, (error) => {
      if (error) {
        console.log(error)
      } else {
        console.log('Project name updated successfully.')
      }
    })

    onClose()
  }

  const handleInputChange = (event) => {
    setProjectName(event.target.value)
  }

  const handleCancelClick = () => {
    onClose()
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center'>
      <div className='fixed inset-0 bg-gray-900 opacity-75'></div>
      <div className='bg-white rounded-lg p-6 z-10'>
        <h2 className='text-lg font-bold mb-4'>Edit project</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='projectName' className='block font-bold mb-2'>
              Project name
            </label>
            <input type='text' id='projectName' className='w-full border rounded py-2 px-3' value={projectName} onChange={handleInputChange} />
          </div>
          <div className='flex justify-end'>
            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'>
              Save changes
            </button>
            <button type='button' className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProject
