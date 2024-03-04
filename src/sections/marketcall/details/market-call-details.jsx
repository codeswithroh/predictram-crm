import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { LoadingButton } from '@mui/lab';
import { Card, Stack, Button, Typography } from '@mui/material';

import { fDate } from 'src/utils/format-time';
import { createChatData } from 'src/utils/createChartData';

import { ROLES } from 'src/enums';
import ResponseService from 'src/services/Response.service';
import MarketdataService from 'src/services/Marketdata.service';
import MarketcallService from 'src/services/Marketcall.service';

import Iconify from 'src/components/iconify';
import BaseTable from 'src/components/table/BaseTable';
import StockChart from 'src/components/chart/StockChart';
import AccessControl from 'src/components/Accesscontrol';
import FetchLoader from 'src/components/loader/fetch-loader';

const confirmObj = (title, description, confirmationText) => ({
  title: <h3 style={{ margin: 0 }}>{title}</h3>,
  description: <h4 style={{ margin: 0 }}>{description}</h4>,
  cancellationButtonProps: { variant: 'contained', color: 'error', autoFocus: false },
  confirmationButtonProps: { variant: 'contained', color: 'success' },
  confirmationText,
});

export default function MarketCallDetails() {
  const { id } = useParams();
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const { role } = useSelector((state) => state.user.details);

  const [stock, setStock] = useState('');

  const stockTableFormat = [
    {
      label: 'View in Chart',
      accessor: ({ symbol }) => (
        <Button
          onClick={() => {
            setStock(symbol);
            window.scrollTo(0, 0);
          }}
        >
          <Iconify icon="material-symbols:bar-chart" />
        </Button>
      ),
    },
    { label: 'Symbol', accessor: 'symbol' },
    { label: 'Call Type', accessor: 'type' },
    { label: 'Quantity', accessor: 'quantity' },
    { label: 'Open Price', accessor: 'open_price' },
    { label: 'Previos Close Price', accessor: 'prev_close_price' },
    { label: 'Last Price', accessor: 'lp' },
    { label: 'High Price', accessor: 'high_price' },
    { label: 'Low Price', accessor: 'low_price' },
  ];

  const { data: marketCall = {}, isLoading: marketCallLoading } = useQuery({
    queryKey: ['market-call', id],
    queryFn: async () => {
      const { data } = await MarketcallService.get({
        _id: id,
        populate: 'createdBy',
        showResponse: role === ROLES.CLIENT,
      });
      if (data?.marketCallData[0]?.stockData?.length > 0) {
        setStock(data?.marketCallData[0]?.stockData[0]?.symbol);
      }
      return data;
    },
    select: (res) => res?.marketCallData[0],
  });

  const { data: marketChartData = [], isLoading: chartLoading } = useQuery({
    queryKey: ['history-price', id, stock, marketCall?.isLive],
    queryFn: () =>
      MarketdataService.history(
        stock,
        '1',
        fDate(new Date(marketCall.isLive ? new Date() : marketCall?.createdAt), 'yyyy-MM-dd'),
        fDate(new Date(marketCall.isLive ? new Date() : marketCall?.createdAt), 'yyyy-MM-dd')
      ),
    select: (res) => res?.data?.candles || [],
    refetchInterval: marketCall?.isLive ? 1000 * 15 : 0,
    enabled: !!stock,
  });

  const { data: marketLivePrice = [], isLoading: livePriceLoading } = useQuery({
    queryKey: ['live-price', id, marketCall?.stockData],
    queryFn: async () => {
      const stocks = marketCall?.stockData?.map((stockInfo) => stockInfo?.symbol).join(',');
      const { data } = await MarketdataService.livePrice(stocks);
      const stockWithPrice = marketCall?.stockData?.map((stockData) => {
        const priceData = data?.d?.find((d) => d?.n === `NSE:${stockData?.symbol}-EQ`);
        return {
          ...stockData,
          high_price: priceData?.v?.high_price || '-',
          low_price: priceData?.v?.low_price || '-',
          lp: priceData?.v?.lp || '-',
          open_price: priceData?.v?.open_price || '-',
          prev_close_price: priceData?.v?.prev_close_price || '-',
        };
      });
      return stockWithPrice;
    },
    refetchInterval: marketCall?.isLive ? 1000 * 15 : 0,
    enabled: !!marketCall?.isLive && marketCall?.stockData?.length > 0,
  });

  const { mutate: stopCall, isPending: stopCallLoading } = useMutation({
    mutationFn: () => MarketcallService.put(id, { isLive: false }),
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      queryClient.invalidateQueries(['market-call', id]);
    },
  });

  const { mutate: submitResponse, isPending: responseLoading } = useMutation({
    mutationFn: ({ response }) => ResponseService.post({ marketCallId: id, response }),
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      queryClient.invalidateQueries(['market-call', id]);
    },
  });

  const handelStopCall = async () => {
    await confirm(
      confirmObj(
        'Are you sure you want to STOP this market call ?',
        'You can not revert back',
        'Yes, STOP'
      )
    );
    stopCall();
  };

  const handelResponseSubmit = async (response) => {
    await confirm(
      confirmObj(
        `Are you sure you want to ${response} this call ?`,
        'You can not revert back',
        `Yes, ${response}`
      )
    );

    submitResponse({ response });
  };

  if (marketCallLoading) return <FetchLoader />;
  return (
    <Card sx={{ p: 2, gap: 2, display: 'flex', flexDirection: 'column' }}>
      <StockChart
        data={createChatData(marketChartData)}
        height={window.screen.height / 2}
        tooltip={false}
        title={
          stock &&
          `Stock chart of ${stock} , date: ${fDate(
            marketCall.isLive ? new Date() : marketCall?.createdAt
          )}`
        }
        loading={chartLoading}
      />
      <Stack direction="row" justifyContent="space-between">
        <Typography
          variant="caption"
          component="div"
          sx={{
            mb: 2,
            color: 'text.disabled',
          }}
        >
          {`Publish Date : ${fDate(marketCall?.createdAt)}`}
        </Typography>

        <Typography
          variant="caption"
          component="div"
          sx={{
            mb: 2,
            color: 'text.disabled',
          }}
        >
          {`${marketCall?.createdBy?.firstName} ${marketCall?.createdBy?.lastName}`}
        </Typography>
      </Stack>
      <Typography fontWeight="bold">Stock Details In This Call</Typography>
      <BaseTable
        tableData={marketLivePrice.length > 0 ? marketLivePrice : marketCall?.stockData}
        tableDataFormat={marketCall?.isLive ? stockTableFormat : stockTableFormat.slice(0, 4)}
        showPagination={false}
        loading={livePriceLoading}
        cardStyle={{ boxShadow: 'none', borderRadius: 1, border: 1, borderColor: 'lightgray' }}
      />

      {marketCall?.isLive && (
        <>
          <AccessControl accepted_roles={[ROLES.CLIENT]}>
            {marketCall?.responses?.length > 0 ? (
              <Typography
                variant="h5"
                color={marketCall?.responses[0]?.response === 'ACCEPT' ? 'green' : 'red'}
                align="center"
              >
                This call is {marketCall?.responses[0]?.response}ED by you
              </Typography>
            ) : (
              <Stack mt={2} flexGrow={1} gap={2} direction={{ sx: 'column', md: 'row' }}>
                <LoadingButton
                  variant="contained"
                  color="success"
                  sx={{ width: '100%' }}
                  loading={responseLoading}
                  onClick={() => handelResponseSubmit('ACCEPT')}
                >
                  Accept
                </LoadingButton>
                <LoadingButton
                  variant="contained"
                  color="error"
                  sx={{ width: '100%' }}
                  loading={responseLoading}
                  onClick={() => handelResponseSubmit('REJECT')}
                >
                  Reject
                </LoadingButton>
              </Stack>
            )}
          </AccessControl>

          <AccessControl accepted_roles={ROLES.EMPLOYEE}>
            <LoadingButton
              loading={stopCallLoading}
              variant="contained"
              color="error"
              sx={{ width: '100%' }}
              onClick={handelStopCall}
            >
              Stop this market call
            </LoadingButton>
          </AccessControl>
        </>
      )}
    </Card>
  );
}
