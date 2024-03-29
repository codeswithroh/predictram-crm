import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, Card, TablePagination } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import cleanObject from 'src/utils/cleanObject';

import { MARKET_CALL_TYPES, ROLES } from 'src/enums';
import MarketcallService from 'src/services/Marketcall.service';

import NotFound from 'src/components/Nofound';
import FetchLoader from 'src/components/loader/fetch-loader';

import MarketCallCard from '../market-call-card';

function MarketCallCards({ filter, setFilter }) {
  const { role } = useSelector((state) => state.user.details);
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
          showSubmitted: filter?.view === 'Submitted',
          showResponse: role === ROLES.CLIENT,
          populate: 'createdBy',
        })
      );
    },
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

  // useEffect(() => {
  //   SocketService.connect().catch((e) => toast.error(e.message));
  //   SocketService.addEventListener('market-call', (marketCall) => {
  //     console.log(marketCall); // TODO: update market call data
  //   });
  //   return () => {
  //     SocketService.disconnect();
  //   };
  // }, []);

  if (isLoading) return <FetchLoader />;

  if ((data?.marketCallData || [])?.length === 0)
    return (
      <NotFound
        sx={{ mt: 10 }}
        title={`Opps! no ${MARKET_CALL_TYPES[filter?.type]} market call found`}
        subtitle="Check other market call types"
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
