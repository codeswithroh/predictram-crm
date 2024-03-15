import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Card, TablePagination } from '@mui/material';

import cleanObject from 'src/utils/cleanObject';

import ResponseService from 'src/services/Response.service';

import FetchLoader from 'src/components/loader/fetch-loader';

import ResponseCard from 'src/sections/response/view/response-card';

export function ResponseCards({ filter, setFilter }) {
  const [page, setPage] = useState(filter?.page);
  const [limit, setLimit] = useState(filter?.limit);

  const { data = [], isLoading } = useQuery({
    queryKey: ['user-response', cleanObject(filter)],
    queryFn: () => {
      setPage(filter?.page);
      setLimit(filter?.limit);
      return ResponseService.get(filter);
    },
    select: (res) => res?.data?.responses || [],
    staleTime: 60000 * 10,
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

  return (
    <div>
      <Grid2 container spacing={3}>
        {data.map((d, index) => (
          <ResponseCard data={d} key={index} />
        ))}
      </Grid2>
      <Box sx={{ maxWidth: 'fit-content', margin: 'auto' }}>
        <Card sx={{ mt: 2 }}>
          <TablePagination
            page={page}
            component="div"
            count={data?.length}
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
