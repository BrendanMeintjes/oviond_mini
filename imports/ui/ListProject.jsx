import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import DeleteProject from './DeleteProject'
import EditProject from './EditProject'

export const ListProject = ({ project }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const handleDeleteClick = (event) => {
    event.preventDefault()
    setShowDeleteModal(true)
  }

  const handleEditClick = (event) => {
    event.preventDefault()
    setShowEditModal(true)
  }

  const handleCloseModal = () => {
    setShowDeleteModal(false)
    setShowEditModal(false)
  }

  return (
    <div>
      <Link className='cardLink' to={`/client/${project.clientId}/projects/${project._id}`}>
        <div className='flex items-center justify-between p-4 border rounded-md hover:bg-gray-200 hover:bg-opacity-75 transition-colors'>
          <div>{project.projectName}</div>
          <div className='flex'>
            <button className='text-blue-500 mr-2' onClick={handleEditClick}>
              Edit
            </button>
            |
            <button className='text-red-500 ml-2' onClick={handleDeleteClick}>
              Delete
            </button>
          </div>
        </div>
      </Link>
      {showDeleteModal && <DeleteProject project={project} onClose={handleCloseModal} />}
      {showEditModal && <EditProject project={project} onClose={handleCloseModal} />}
    </div>
  )
}

export default ListProject
