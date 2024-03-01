// import { useState } from 'react';

import Stack from '@mui/material/Stack';
import { Avatar, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';

import { users } from 'src/_mock/user';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import BaseTable from 'src/components/table/BaseTable';

// ----------------------------------------------------------------------

export default function UserTable() {
  const tableFormat = [
    {
      label: 'lasjfdalsfdj',
      accessor: ({ name, avatarUrl }) => (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={name} src={avatarUrl} />
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Stack>
      ),
    },
    { label: 'Company', accessor: 'company' },
    { label: 'Role', accessor: 'role' },
    { label: 'Verified', accessor: ({ isVerified }) => (isVerified ? 'Yes' : 'No') },
    {
      label: 'status',
      accessor: ({ status }) => (
        <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
      ),
    },
  ];

  return (
    <BaseTable
      tableData={users}
      tableDataFormat={tableFormat}
      filterables={['name', 'company', 'role']}
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
