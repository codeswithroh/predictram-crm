import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

import { Box, Grid } from '@mui/material';

import cleanObject from 'src/utils/cleanObject';

import ResponseService from 'src/services/Response.service';
import { CLIENT_TYPE, RESPONSE_STATUS, CLIENT_TYPE_SERVER } from 'src/enums';

import Iconify from 'src/components/iconify';
import BaseTable from 'src/components/table/BaseTable';
import ResponseStatusModal from 'src/components/modal/response/response-status-modal';

import MarketCallResponseFilter from './market-call-response-filter';

function MarketCallResponse() {
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState({ page: 0, limit: 5 });
  const [responseId, setResponseId] = useState('');

  const handleModalClose = () => setModalOpen(false);

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
      label: 'Status',
      accessor: ({ status }) => status || 'N/A',
    },
    {
      label: 'Client Type',
      accessor: ({ submittedBy }) => CLIENT_TYPE[submittedBy?.client_type],
    },
    {
      label: 'Execute Trade',
      accessor: ({ submittedBy, status }) => {
        if (
          submittedBy.client_type === CLIENT_TYPE_SERVER.DISCRETIONARY &&
          status === RESPONSE_STATUS.INITIATED
        ) {
          return (
            <Link to="https://www.kotaksecurities.com/#login" target="blank">
              <Iconify icon="akar-icons:link-out" />
            </Link>
          );
        }
        return 'N/A';
      },
    },
    {
      label: 'Change Status',
      accessor: ({ submittedBy, status, _id: responseid }) => {
        if (
          submittedBy.client_type === CLIENT_TYPE_SERVER.DISCRETIONARY &&
          status === RESPONSE_STATUS.INITIATED
        ) {
          return (
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setResponseId(responseid);
                setModalOpen(true);
              }}
            >
              <Iconify icon="fluent-mdl2:sync-status-solid" />
            </Box>
          );
        }
        return 'N/A';
      },
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
      <ResponseStatusModal
        handleClose={handleModalClose}
        open={modalOpen}
        responseId={responseId}
        queryKey={['market-call-response', id, filter]}
      />

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
