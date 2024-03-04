import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import ResponseService from 'src/services/Response.service';

import BaseTable from 'src/components/table/BaseTable';

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
  ];
  const { data, isLoading } = useQuery({
    queryKey: ['market-call-response', id, filter],
    queryFn: async () =>
      ResponseService.get({
        marketCallId: id,
        ...filter,
      }),
    select: (res) => res?.data,
  });

  return (
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
  );
}

export default MarketCallResponse;
