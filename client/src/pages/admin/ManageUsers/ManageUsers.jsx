import React from 'react'
import Sidebar from '../../../components/admin/sidebar/Sidebar'
import ViewUsers from '../../../components/admin/viewUsers/ViewUsers'

const ManageUsers = () => {
  return (
    <div>
       <Sidebar>
      <ViewUsers />
      </Sidebar>
    </div>
  )
}

export default ManageUsers