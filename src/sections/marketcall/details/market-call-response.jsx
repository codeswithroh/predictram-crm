import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Grid } from '@mui/material';

import cleanObject from 'src/utils/cleanObject';

import ResponseService from 'src/services/Response.service';

import BaseTable from 'src/components/table/BaseTable';

import MarketCallResponseFilter from './market-call-response-filter';

function MarketCallResponse() {
  const { id } = useParams();
  const [filter, setFilter] = useState({ page: 0, limit: 5 });

  const responseTableFormat = [
    {
      label: 'Name',
      accessor: ({ submittedBy }) => `${submittedBy?.firstName} ${submittedBy?.lastName}` || '-',
    },
    {
      label: 'Email',
      accessor: ({ submittedBy }) => submittedBy?.email || '-',
    },
    {
      label: 'Phone',
      accessor: ({ submittedBy }) => submittedBy?.phone || '-',
    },
    {
      label: 'Response',
      accessor: ({ response }) => response || '-',
    },
    {
      label: 'Auto Execute',
      accessor: ({ autoExecute }) => (autoExecute ? 'Yes' : 'No'),
    },
  ];
  const { data, isLoading } = useQuery({
    queryKey: ['market-call-response', id, filter],
    queryFn: async () =>
      ResponseService.get(
        cleanObject({
          marketCallId: id,
          ...filter,
        })
      ),
    select: (res) => res?.data,
  });

  return (
    <Grid container>
      <Grid item md={3} xs={12} paddingRight={{ md: 2, xs: 0 }} paddingBottom={{ md: 0, xs: 2 }}>
        <MarketCallResponseFilter setFilter={setFilter} filter={filter} />
      </Grid>
      <Grid item md={9} xs={12}>
        <BaseTable
          tableData={data?.responses || []}
          tableDataFormat={responseTableFormat}
          loading={isLoading}
          filterables={['email', 'phone', 'name', 'response']}
          filter={filter}
          setFilter={setFilter}
          customPagination
          customDocCount={data?.total}
        />
      </Grid>
    </Grid>
  );
}

export default MarketCallResponse;
