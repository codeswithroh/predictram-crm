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
  const { data, isLoading } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => {
      const response = OrganizationService.getOrgs();
      return response;
    },
    onError: (err) => toast.error(err.message),
  });
  if (!isLoading) {
    console.log(data.data);
  }

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
      {data && (
        <Stack direction={{ xs: 'column', sm: 'row' }} gap={3}>
          <UserFilter />
          <OrganizationTable organizations={data?.data} />
        </Stack>
      )}
    </Container>
  );
}
