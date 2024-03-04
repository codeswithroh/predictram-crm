import { useState } from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { useRouter } from 'src/routes/hooks';

import { ROLES } from 'src/enums';

import Iconify from 'src/components/iconify';
import PageHeader from 'src/components/pageHeader';
import AccessControl from 'src/components/Accesscontrol';

import MarketCallCards from './market-call-cards';
import MarketCallFilter from './market-call-filter';

// ----------------------------------------------------------------------

export default function BlogView() {
  const router = useRouter();
  const [filter, setFilter] = useState({ marketState: 'live', page: 0, limit: 5 });

  return (
    <Container sx={{ mt: 3 }}>
      <PageHeader title="Market Call">
        <AccessControl accepted_roles={[ROLES.EMPLOYEE]}>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => router.push('/market-call/add')}
          >
            Add New Market Call
          </Button>
        </AccessControl>
      </PageHeader>
      <MarketCallFilter setFilter={setFilter} filter={filter} />
      <MarketCallCards filter={filter} setFilter={setFilter} />
    </Container>
  );
}
