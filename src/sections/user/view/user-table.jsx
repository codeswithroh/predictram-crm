// import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import Stack from '@mui/material/Stack';
import { Avatar, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';

// import { users } from 'src/_mock/user';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import BaseTable from 'src/components/table/BaseTable';

import UserService from "../../../services/User.service"
// import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function UserTable() {

  // const router = useRouter();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => {
        const response = UserService.getUsers(); 
        return response;
  }});

  if (isLoading) {
    console.log("Loading",data)
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  console.log('User data:', data.data);

  const tableFormat = [
    {
      label: 'First Name',
      accessor: ({ firstName, avatar }) => (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={firstName} src={avatar} />
          <Typography variant="subtitle2" noWrap>
            {firstName}
          </Typography>
        </Stack>
      ),
    },
    { label: 'Last Name', accessor: 'lastName' },
    { label: 'Phone', accessor: 'phone' },
    { label: 'Email', accessor: 'email' },
    { label: 'Role', accessor: 'role' },
    { label: 'Organization', accessor: 'organization' },
    {label: 'Verified', accessor: ({ isPhoneVerified, isEmailVerified }) =>
      isPhoneVerified && isEmailVerified ? 'Yes' : 'No',
    },
    // { label: 'Verified', accessor: ({ isVerified }) => (isVerified ? 'Yes' : 'No') },
    {
      label: 'IsEnabled',
      accessor: ({ isEnabled }) => (
        <Label color={isEnabled ? 'success' : 'error'}>
          {isEnabled ? 'True' : 'False'}
        </Label>
      ),
    },
  ];

  return (
    <BaseTable
      tableData={data.data}
      tableDataFormat={tableFormat}
      filterables={['lastName', 'email', 'organisation']}
      actions={
        <div>
          <MenuItem>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Edit
          </MenuItem>

          <MenuItem sx={{ color: 'error.main' }}>
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Delete
          </MenuItem>
        </div>
      }
    />
  );
}
