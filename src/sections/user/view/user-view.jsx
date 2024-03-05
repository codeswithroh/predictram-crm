import { useState } from 'react';

import Button from '@mui/material/Button';
import { Grid, Link } from '@mui/material';
import Container from '@mui/material/Container';

import { RouterLink } from 'src/routes/components';

import { ROLES } from 'src/enums';

import Iconify from 'src/components/iconify';
import PageHeader from 'src/components/pageHeader';
import AccessControl from 'src/components/Accesscontrol';

import UserTable from './user-table';
import UserFilter from './user-filter';

export default function UserPage() {
  const [filterQuery, setFilterQuery] = useState({ page: 0, limit: 5 });

  return (
    <Container sx={{ mt: 3 }}>
      <PageHeader title="Users">
        <AccessControl accepted_roles={ROLES.ADMIN}>
          <Link component={RouterLink} href="/user/add">
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New User
            </Button>
          </Link>
        </AccessControl>
      </PageHeader>

      <Grid container>
        <Grid item md={3} xs={12} paddingRight={{ md: 2, xs: 0 }} paddingBottom={{ md: 0, xs: 2 }}>
          <UserFilter filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
        </Grid>
        <Grid item md={9} xs={12}>
          <UserTable filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
        </Grid>
      </Grid>
    </Container>
  );
}
