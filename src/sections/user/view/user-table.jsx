import Stack from '@mui/material/Stack';
import { Avatar, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import BaseTable from 'src/components/table/BaseTable';

// ----------------------------------------------------------------------

export default function UserTable({ users, filterQuery }) {
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
    {
      label: 'Last Name',
      accessor: ({ lastName }) => (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="subtitle2" noWrap>
            {lastName}
          </Typography>
        </Stack>
      ),
    },
    { label: 'Phone', accessor: 'phone' },
    { label: 'Email', accessor: 'email' },
    { label: 'Role', accessor: 'role' },
    { label: 'Organization', accessor: 'organization' },
    {
      label: 'Verified',
      accessor: ({ isPhoneVerified, isEmailVerified }) =>
        isPhoneVerified && isEmailVerified ? 'Yes' : 'No',
    },
    {
      label: 'IsEnabled',
      accessor: ({ isEnabled }) => (
        <Label color={isEnabled ? 'success' : 'error'}>{isEnabled ? 'True' : 'False'}</Label>
      ),
    },
  ];

  return (
    <BaseTable
      filterQuery={filterQuery}
      tableData={users}
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
