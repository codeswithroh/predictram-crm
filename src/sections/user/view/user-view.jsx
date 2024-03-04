import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Button from '@mui/material/Button';
import { Link, Stack } from '@mui/material';
import Container from '@mui/material/Container';

import { RouterLink } from 'src/routes/components';

import UserService from 'src/services/User.service';

import Iconify from 'src/components/iconify';
import PageHeader from 'src/components/pageHeader';

import UserTable from './user-table';
import UserFilter from './user-filter';

export default function UserPage() {
  const [filterQuery, setFilterQuery] = useState('');
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => {
      const response = UserService.getUsers();
      return response;
    },
  });

  const queryData = (d) => {
    setFilterQuery(d);
  };

  return (
    <Container sx={{ mt: 3 }}>
      <PageHeader
        title="Users"
        items={
          <Link component={RouterLink} href="/user/add">
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New User
            </Button>
          </Link>
        }
      />
      {!isLoading && data && (
        <Stack direction={{ xs: 'column', sm: 'row' }} gap={3}>
          <UserFilter queryData={queryData} />
          <UserTable filterQuery={filterQuery} users={data?.data} />
        </Stack>
      )}
    </Container>
  );
}
