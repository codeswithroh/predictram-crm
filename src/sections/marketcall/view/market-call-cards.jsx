import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Card, TablePagination } from '@mui/material';

import cleanObject from 'src/utils/cleanObject';

import MarketcallService from 'src/services/Marketcall.service';

import NotFound from 'src/components/Nofound';
import FetchLoader from 'src/components/loader/fetch-loader';

import MarketCallCard from '../market-call-card';

function MarketCallCards({ filter, setFilter }) {
  const [page, setPage] = useState(filter?.page);
  const [limit, setLimit] = useState(filter?.limit);

  const { data = [], isLoading } = useQuery({
    queryKey: ['market-call', cleanObject(filter)],
    queryFn: () => {
      setPage(filter?.page);
      setLimit(filter?.limit);
      return MarketcallService.get(
        cleanObject({
          ...filter,
          isLive: filter?.marketState === 'live',
          populate: 'createdBy',
        })
      );
    },
    refetchInterval: filter?.marketState === 'live' ? 1000 * 15 : 0,
    select: (res) => res?.data || [],
  });

  const handleChangePage = (event, newPage) => {
    setFilter({ ...filter, page: newPage, limit });
  };

  const handleChangeRowsPerPage = (event) => {
    const value = parseInt(event.target.value, 10);
    setLimit(value);
    setFilter({ ...filter, page: 0, limit: value });
  };

  if (isLoading) return <FetchLoader />;

  if ((data?.marketCallData || [])?.length === 0)
    return (
      <NotFound
        sx={{ mt: 10 }}
        title="Opps! no market call found"
        subtitle="You will get data once its avilable"
      />
    );

  return (
    <div>
      <Grid2 container spacing={3}>
        {(data?.marketCallData || [])?.map((marketCall) => (
          <MarketCallCard key={marketCall.id} marketCall={marketCall} buttonText="View Details" />
        ))}
      </Grid2>
      <Box sx={{ maxWidth: 'fit-content', margin: 'auto' }}>
        <Card sx={{ mt: 2 }}>
          <TablePagination
            page={page}
            component="div"
            count={data?.total}
            rowsPerPage={limit}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Box>
    </div>
  );
}

export default MarketCallCards;
