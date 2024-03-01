// import { useState } from 'react';

import { Link } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';
import PageHeader from 'src/components/pageHeader';

import UserTable from './organization-table';

export default function OrganizationPage() {
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
      <UserTable />
    </Container>
  );
}
