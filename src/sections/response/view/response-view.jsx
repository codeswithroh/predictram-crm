import { useState } from 'react';

import { Container } from '@mui/material';

import PageHeader from 'src/components/pageHeader';

import { ResponseCards } from 'src/sections/response/view/response-cards';

import ResponseFilter from './response-filter';

const ResponsePage = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 5,
    fromDate: null,
    toDate: null,
  });

  return (
    <Container sx={{ mt: 3 }}>
      <PageHeader title="Responses" />
      <ResponseFilter filter={filter} setFilter={setFilter} />
      <ResponseCards filter={filter} setFilter={setFilter} />
    </Container>
  );
};

export default ResponsePage;
