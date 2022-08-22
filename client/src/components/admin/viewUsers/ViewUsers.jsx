// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';

// const columns = [
//   { field: 'id', headerName: 'ID', width: 90 },
//   {
//     field: 'firstName',
//     headerName: 'First name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'lastName',
//     headerName: 'Last name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 110,
//     editable: true,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
// ];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

// export default function ViewUsers() {
//   return (
//     <Box sx={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={5}
//         rowsPerPageOptions={[5]}
//         checkboxSelection
//         disableSelectionOnClick
//         experimentalFeatures={{ newEditingApi: true }}
//       />
//     </Box>
//   );
// }
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { serverURL } from '../../../serverURL';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import { display } from '@mui/system';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { PartyMode } from '@mui/icons-material';



const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
export default function ViewUsers() {
  const [users, setUsers] = useState();
  const[refresh,setRefresh]=useState(true)

  const columns = [
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'firstname', headerName: 'FirstName', width: 230 },
    { field: 'lastname', headerName: 'LastName', width: 230 },
    { field: 'email', headerName: 'Email', width: 230 },
    { field: 'phonenumber', headerName: 'Phone', width: 230 },
    {
      field: 'action',
      width: 330,
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        const onClick = async (e) => {
          e.stopPropagation(); // don't select this row after clicking
          try {
              console.log(params.row.isBlocked);
            if (params.row.isBlocked) {
           let response = await axios.patch(`${serverURL}/admin/unBlockUser?id=${params.row._id}`)
                toast(`${params.row.firstname} is unblocked`, { autoClose: 800 });
                // toast.success('Authentication Successful')
                console.log(response,'unblock')
                setRefresh(!refresh)
                
            } else {
            let response = await axios.patch(`${serverURL}/admin/blockUser?id=${params.row._id}`)
                toast(`${params.row.firstname} is blocked`, { autoClose: 800 });
                console.log(response,'block')
                setRefresh(!refresh)
            }
          } catch (err) {
            console.log(err);
            toast("Some Error Occured",{autoClose:800})
          }
        };
  
        if (params.row.isBlocked) {
          return (
            <Button
              style={{ zIndex: '0' }}
              variant='outlined'
              color='error'
              onClick={onClick}
            >
              UnBlock{' '}
            </Button>
          );
        } else {
          return (
            <Button
              style={{ zIndex: '0' }}
              variant='outlined'
              color='error'
              onClick={onClick}
            >
              Block{' '}
            </Button>
          );
        }
      },
    },
  
  //   {
  //     field: 'age',
  //     headerName: 'Age',
  //     type: 'number',
  //     width: 90,
  //   },
  //   {
  //     field: 'fullName',
  //     headerName: 'Full name',
  //     description: 'This column has a value getter and is not sortable.',
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  //   },
  ];

  useEffect(() => {

(async function fetchUsers(){
    try {
    const {data} = await axios.get(`${serverURL}/admin/fetchUsers`, { withCredentials: true })
        setUsers(data.users);
    } catch (error) {
        console.log(error);
    }
    
})()

   
  }, [refresh]);

 
  return (
      <div >
          {/* <div className=""> */}
           <p className='fs-1 fw-bolder  text-center mb-0 pb-0'>Manage users</p>
          {/* </div> */}
    <div
      style={{
        height: 400,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop:'5%'
      }}
    >
      {users && (
        <DataGrid
        sx={{mt:0 }}
          rows={users}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      )}
      <ToastContainer/>
    </div>
    </div>
  );
}