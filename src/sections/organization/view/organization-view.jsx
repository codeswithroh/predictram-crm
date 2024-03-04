import { useState } from 'react';

import Button from '@mui/material/Button';
import { Link, Stack } from '@mui/material';
import Container from '@mui/material/Container';

import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';
import PageHeader from 'src/components/pageHeader';

import OrganizationTable from './organization-table';
import OrganizationFilter from './organization-filter';

export default function OrganizationPage() {
  const [filterQuery, setFilterQuery] = useState({});

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

      <Stack direction={{ xs: 'column', sm: 'row' }} gap={3}>
        <OrganizationFilter setFilterQuery={setFilterQuery} />
        <OrganizationTable filterQuery={filterQuery} />
      </Stack>
    </Container>
  );
}
