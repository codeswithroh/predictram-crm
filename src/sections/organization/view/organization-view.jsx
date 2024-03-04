import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

import Button from '@mui/material/Button';
import { Link, Stack } from '@mui/material';
import Container from '@mui/material/Container';

import { RouterLink } from 'src/routes/components';

import OrganizationService from 'src/services/Organization.service';

import Iconify from 'src/components/iconify';
import PageHeader from 'src/components/pageHeader';

import UserFilter from 'src/sections/user/view/user-filter';

import OrganizationTable from './organization-table';

export default function OrganizationPage() {
  const [filterQuery, setFilterQuery] = useState('');
  const { data, isLoading } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => {
      const response = OrganizationService.getOrgs();
      return response;
    },
    onError: (err) => toast.error(err.message),
  });

  const queryData = (d) => {
    setFilterQuery(d);
  };

  return (
    <Container sx={{ mt: 3 }}>
      <PageHeader
        title="Organization"
        items={
          <Link component={RouterLink} href="/organization/add">
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Organization
            </Button>
          </Link>
        }
      />
      {!isLoading && data && (
        <Stack direction={{ xs: 'column', sm: 'row' }} gap={3}>
          <UserFilter
            queryData={queryData}
            filterQuery={filterQuery}
            setFilterQuery={setFilterQuery}
          />
          <OrganizationTable filterQuery={filterQuery} organizations={data?.data} />
        </Stack>
      )}
    </Container>
  );
}
