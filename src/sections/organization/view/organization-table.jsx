import Stack from '@mui/material/Stack';
import { Avatar, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import BaseTable from 'src/components/table/BaseTable';

// ----------------------------------------------------------------------

export default function OrganizationTable({ organizations, filterQuery }) {
  const tableFormat = [
    {
      label: 'Name',
      accessor: ({ name, avatarUrl }) => (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={name} src={avatarUrl} />
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Stack>
      ),
    },
    { label: 'Contact', accessor: 'contact' },
    { label: 'Email', accessor: 'email' },
  ];

  return (
    <BaseTable
      filterQuery={filterQuery}
      tableData={organizations}
      tableDataFormat={tableFormat}
      filterables={['name', 'contact', 'email']}
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
