import { useQuery } from '@tanstack/react-query';

import { Avatar } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import cleanObject from 'src/utils/cleanObject';

import { ROLES, CLIENT_TYPE } from 'src/enums';
import UserService from 'src/services/User.service';

// import Iconify from 'src/components/iconify';

import BaseTable from 'src/components/table/BaseTable';

// ----------------------------------------------------------------------

export default function UserTable({ filterQuery, setFilterQuery }) {
  const tableFormat = [
    {
      label: 'Name',
      accessor: ({ firstName, avatar, lastName }) => (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            alt={firstName}
            src={avatar || `https://ui-avatars.com/api/?name=${firstName}+${lastName}`}
          />
          <Typography variant="subtitle2" noWrap>
            {`${firstName} ${lastName}`}
          </Typography>
        </Stack>
      ),
    },

    { label: 'Phone', accessor: 'phone' },
    { label: 'Email', accessor: 'email' },
    { label: 'Role', accessor: 'role' },
    {
      label: 'Client Type',
      accessor: ({ client_type, role }) => {
        if (role === ROLES.CLIENT) {
          return CLIENT_TYPE[client_type];
        }
        return '-';
      },
    },
  ];

  const { data = [], isLoading } = useQuery({
    queryKey: ['users', filterQuery],
    queryFn: () => UserService.get(cleanObject(filterQuery)),
    select: (res) => res?.data || [],
  });

  return (
    <BaseTable
      filter={filterQuery}
      tableData={data?.user || []}
      loading={isLoading}
      tableDataFormat={tableFormat}
      setFilter={setFilterQuery}
      filterables={['firstName', 'lastName', 'email']}
      customDocCount={data?.total}
      customPagination
      // actions={
      //   <div>
      //     <MenuItem>
      //       <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
      //       Edit
      //     </MenuItem>

      //     <MenuItem sx={{ color: 'error.main' }}>
      //       <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
      //       Delete
      //     </MenuItem>
      //   </div>
      // }
    />
  );
}
